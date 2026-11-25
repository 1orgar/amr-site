/* ==========================================================================
   AMR Multi-Device Interactive Simulator (iPhone, 4K TV + WLED, Console, Mac)
   ========================================================================== */

(function () {
  const DATA = window.AMR_DATA;
  if (!DATA) return;

  const state = {
    trackIndex: 0,
    isPlaying: true,
    isFavorited: true,
    elapsedSec: DATA.demoTracks[0].elapsedSec,
    deviceFocus: "all",       // all | iphone | tv | console | macos
    iphoneSubmode: "player",  // player | signal | qr | lock
    tvOverlay: "rta",         // rta | aicloud | library
    wledMode: "spectral",     // spectral | palette | pulse | sine
    consoleTab: "signal",     // signal | booklet | bridge
    bookletPage: 0,           // 0 | 1 | 2
    bridgeIdx: 0,
    macTab: "general",        // general | dsp | amp | menubar
    macToggles: {
      lock100: true,
      mutingGuard: true,
      aneAi: true,
      hogInteger: true,
      soundCheck: true,
      crestComp: true
    }
  };

  function fmtTime(sec) {
    const s = Math.max(0, Math.floor(sec));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${r < 10 ? "0" : ""}${r}`;
  }

  function currentTrack() {
    return DATA.demoTracks[state.trackIndex] || DATA.demoTracks[0];
  }

  function applyAmbientPalette(track) {
    const root = document.documentElement;
    root.style.setProperty("--vision-blob-1", track.visionBlobs[0]);
    root.style.setProperty("--vision-blob-2", track.visionBlobs[1]);
    root.style.setProperty("--vision-blob-3", track.visionBlobs[2]);

    const halo = document.getElementById("tv-wled-halo");
    const tvScreen = document.getElementById("tv-screen-surface");
    if (halo) {
      halo.style.setProperty("--wled-c1", track.wledColors[0]);
      halo.style.setProperty("--wled-c2", track.wledColors[1]);
      halo.style.setProperty("--wled-c3", track.wledColors[2]);
    }
    if (tvScreen) {
      tvScreen.style.setProperty("--tv-glow", track.tvGlow);
    }
  }

  function renderTrackSelector() {
    const strip = document.getElementById("demo-track-strip");
    if (!strip) return;
    strip.innerHTML = DATA.demoTracks.map((t, idx) => `
      <button type="button" class="demo-track-chip ${idx === state.trackIndex ? "active" : ""}" data-track-idx="${idx}">
        <img class="demo-track-thumb" src="${t.cover}" alt="${t.title} cover" width="38" height="38">
        <div class="demo-track-meta">
          <div class="demo-track-title">${t.title}</div>
          <div class="demo-track-spec">${t.formatShort} • ${t.drBadge}</div>
        </div>
      </button>
    `).join("");

    strip.querySelectorAll(".demo-track-chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.getAttribute("data-track-idx")) || 0;
        state.trackIndex = idx;
        state.elapsedSec = DATA.demoTracks[idx].elapsedSec;
        state.isPlaying = true;
        syncAllDevices();
      });
    });
  }

  function syncIPhone(t) {
    const setTxt = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    const setSrc = (id, v) => { const el = document.getElementById(id); if (el) el.src = v; };

    setSrc("di-mini-art", t.cover);
    setSrc("iphone-cover-img", t.cover);
    setSrc("ios-lock-art", t.cover);

    setTxt("iphone-dr-badge", t.drBadge);
    const dacPill = document.getElementById("iphone-dac-pill");
    if (dacPill) {
      dacPill.textContent = t.dacRate;
      dacPill.classList.toggle("warn", t.isFakeHiRes);
    }

    setTxt("iphone-track-title", t.title);
    setTxt("iphone-track-artist", `${t.artist} — ${t.album}`);
    setTxt("iphone-amp-strip-text", t.ampInfo.split("•").slice(0, 2).join("•"));

    setTxt("ios-lock-title", t.title);
    setTxt("ios-lock-artist", `${t.artist} • ${t.formatShort}`);

    // Signal subscreen on iPhone
    setTxt("ip-sp-verdict", t.verdict);
    const ipVerdict = document.getElementById("ip-sp-verdict");
    if (ipVerdict) {
      ipVerdict.className = `status-pill ${t.verdictClass}`;
    }
    setTxt("ip-sp-source", `${t.codec} (${t.formatShort})`);
    setTxt("ip-sp-cutoff", `Cutoff: ${t.cutoffKhz} • Ultrasonic: ${t.ultrasonicDb}`);
    setTxt("ip-sp-dac", `Hardware Clock Locked: ${t.dacRate} • 0.0 dBFS`);
    setTxt("ip-sp-amp", t.ampInfo);

    // Scrubber & Play button
    updateScrubberUI();
    const playIcon = state.isPlaying ? "❚❚" : "▶";
    setTxt("iphone-btn-play", playIcon);
    setTxt("ios-lock-play", playIcon);

    const di = document.getElementById("iphone-dynamic-island");
    if (di) {
      di.classList.toggle("expanded", state.iphoneSubmode === "lock" || state.isPlaying);
    }

    const favBtn = document.getElementById("iphone-btn-fav");
    if (favBtn) {
      favBtn.classList.toggle("favorited", state.isFavorited);
    }

    // Submodes
    ["player", "signal", "qr", "lock"].forEach((m) => {
      const pane = document.getElementById(`iphone-pane-${m}`);
      if (pane) pane.hidden = state.iphoneSubmode !== m;
    });
    document.querySelectorAll("[data-iphone-mode]").forEach((b) => {
      b.classList.toggle("active", b.getAttribute("data-iphone-mode") === state.iphoneSubmode);
    });
  }

  function updateScrubberUI() {
    const t = currentTrack();
    const pct = Math.min(100, Math.max(0, (state.elapsedSec / t.durationSec) * 100));
    const scrub = document.getElementById("iphone-scrubber");
    if (scrub) scrub.value = pct.toFixed(1);
    const elEl = document.getElementById("iphone-time-elapsed");
    const remEl = document.getElementById("iphone-time-rem");
    if (elEl) elEl.textContent = fmtTime(state.elapsedSec);
    if (remEl) remEl.textContent = `-${fmtTime(t.durationSec - state.elapsedSec)}`;
  }

  function syncTV(t) {
    const cover = document.getElementById("tv-cover-img");
    if (cover) cover.src = t.cover;
    const title = document.getElementById("tv-track-title");
    if (title) title.textContent = t.title;
    const sub = document.getElementById("tv-track-sub");
    if (sub) sub.textContent = `${t.artist}  •  ${t.album}`;
    const badge = document.getElementById("tv-verdict-pill");
    if (badge) {
      badge.textContent = `${t.verdict} • ${t.dacRate}`;
      badge.className = `status-pill ${t.verdictClass}`;
    }

    ["rta", "aicloud", "library"].forEach((mode) => {
      const el = document.getElementById(`tv-view-${mode}`);
      if (el) el.hidden = state.tvOverlay !== mode;
    });
    document.querySelectorAll("[data-tv-view]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-tv-view") === state.tvOverlay);
    });
  }

  function syncStudioConsole(t) {
    ["signal", "booklet", "bridge"].forEach((tab) => {
      const p = document.getElementById(`console-pane-${tab}`);
      if (p) p.hidden = state.consoleTab !== tab;
    });
    document.querySelectorAll("[data-console-tab]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-console-tab") === state.consoleTab);
    });

    // Signal Path controls inside Console
    const presetSel = document.getElementById("console-dsp-select");
    const declipSel = document.getElementById("console-declip-select");
    const deesserSel = document.getElementById("console-deesser-select");
    const drcSel = document.getElementById("console-drc-select");
    if (presetSel) presetSel.value = t.dspPreset;
    if (declipSel) declipSel.value = t.declipMode;
    if (deesserSel) deesserSel.value = t.deesserMode;
    if (drcSel) drcSel.value = t.drcMode;

    const spSource = document.getElementById("console-sp-source");
    if (spSource) spSource.textContent = `${t.codec} • ${t.drBadge} • ${t.lsbBits}`;
    const spVerdict = document.getElementById("console-sp-verdict");
    if (spVerdict) {
      spVerdict.textContent = t.verdict;
      spVerdict.className = `status-pill ${t.verdictClass}`;
    }
    const spAmp = document.getElementById("console-sp-amp");
    if (spAmp) spAmp.textContent = t.ampInfo;

    renderBookletPage(t);
    renderSonicBridge();
  }

  function renderBookletPage(t) {
    const container = document.getElementById("booklet-dynamic-body");
    const pageIndicator = document.getElementById("booklet-page-indicator");
    if (!container || !t.booklet) return;

    const b = t.booklet;
    if (pageIndicator) {
      pageIndicator.textContent = `Page ${state.bookletPage + 1} of 3 • PDFKit + Editorial`;
    }

    if (state.bookletPage === 0) {
      container.innerHTML = `
        <div class="status-pill neutral">CHAPTER 1 • RECORDING HISTORY &amp; MASTERING NOTES</div>
        <h4 style="margin-top:8px;">${b.essayTitle}</h4>
        <p>${b.essayBody}</p>
      `;
    } else if (state.bookletPage === 1) {
      container.innerHTML = `
        <div class="status-pill cyan">CHAPTER 2 • TRACK-BY-TRACK TECHNICAL GUIDE</div>
        <div style="margin-top:10px;display:grid;gap:7px;">
          ${b.tracks.map((tr) => `
            <div class="booklet-credit-cell mono">${tr}</div>
          `).join("")}
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="status-pill green">CHAPTER 3 • STUDIO MUSICIANS &amp; ENGINEERING CREDITS</div>
        <div class="booklet-credits-grid">
          ${b.credits.map((c) => `
            <div class="booklet-credit-cell">
              <div class="mono" style="font-size:10px;color:var(--text-muted);text-transform:uppercase;">${c.role}</div>
              <div style="margin-top:3px;font-weight:700;">${c.name}</div>
            </div>
          `).join("")}
        </div>
      `;
    }
  }

  function renderSonicBridge() {
    const presetsEl = document.getElementById("sb-preset-chips");
    const listEl = document.getElementById("sb-steps-grid");
    if (!presetsEl || !listEl) return;

    presetsEl.innerHTML = DATA.sonicBridges.map((br, i) => `
      <button type="button" class="sb-chip ${i === state.bridgeIdx ? "active" : ""}" data-sb-idx="${i}">${br.label}</button>
    `).join("");

    presetsEl.querySelectorAll(".sb-chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.bridgeIdx = Number(btn.getAttribute("data-sb-idx")) || 0;
        renderSonicBridge();
      });
    });

    const active = DATA.sonicBridges[state.bridgeIdx];
    listEl.innerHTML = active.steps.map((s) => `
      <div class="sb-step-card">
        <div class="sb-step-idx">${s.step} • ${s.sim}</div>
        <div style="margin-top:4px;font-weight:680;">${s.track}</div>
      </div>
    `).join("");
  }

  function renderMacSettings() {
    const body = document.getElementById("macos-settings-body");
    if (!body) return;

    document.querySelectorAll("[data-mac-tab]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-mac-tab") === state.macTab);
    });

    const rowHtml = (key, title, desc, rightBadge) => {
      const isOn = Boolean(state.macToggles[key]);
      return `
        <div class="macos-row">
          <div>
            <h4>${title}</h4>
            <p>${desc}</p>
          </div>
          ${rightBadge ? `<span class="status-pill ${rightBadge.cls}">${rightBadge.txt}</span>` : `
            <button type="button" class="mac-switch ${isOn ? "on" : ""}" data-mac-toggle="${key}" aria-pressed="${isOn}" aria-label="${title}"></button>
          `}
        </div>
      `;
    };

    if (state.macTab === "general") {
      body.innerHTML =
        rowHtml("lock100", "100% Bit-Perfect Digital Volume Lock", "Pegs Music.app & CoreAudio digital gain at 0.0 dBFS to prevent 24-bit truncation.") +
        rowHtml("mutingGuard", "DAC Muting Guard (Click-Free Relay Switcher)", "3-stage Pre-Mute → PLL Clock Lock → Unmute transition during 44.1 ↔ 192 kHz jumps.") +
        rowHtml("aneAi", "Native AI Functions (Apple Neural Engine)", "Enables 512-D NLEmbedding Sonic Bridge, AI Prompt Curator & Vision Saliency (auto-hidden on Intel).") +
        rowHtml(null, "Authorized Client: Kirill's iPhone 16 Pro", "Online • UID 9F4A • Permissions: DAC ✓  DSP ✓  Room Mic ✓  Lock Screen MediaSession ✓", { cls: "green", txt: "AUTHORIZED" });
    } else if (state.macTab === "dsp") {
      body.innerHTML =
        rowHtml("hogInteger", "Exclusive Hog Mode + Direct Integer (0x4c)", "Locks USB DAC exclusively so system alerts never interrupt DoP markers or mix float32.") +
        rowHtml(null, "Active Oversampler & Modulator", "Metal GPU Overlap-Save df64 (262,144 Kaiser taps) • 7EC-Super • Viterbi Trellis M=16 • ISI Guard", { cls: "crimson", txt: "DSD256 DoP" }) +
        rowHtml(null, "64-Bit Room Acoustic Auto-PEQ (iCloud Sync)", "Profile: Living Room Harman Target • 5 Asymmetric RBJ Biquads • -3.6 dB Preamp Headroom", { cls: "cyan", txt: "64-BIT FP64" });
    } else if (state.macTab === "amp") {
      body.innerHTML =
        rowHtml(null, "External Amplifier TCP Socket Bridge", "Connected to Rotel Integrated (:9590) • Hardware Cap: 80% • Zero-Jump Guard Armed", { cls: "green", txt: "TCP ONLINE" }) +
        rowHtml("soundCheck", "Hardware Track Normalization (Apple SoundCheck)", "Reads local/HTTP-Range iTunNORM & live BS.1770 LUFS; adjusts amp attenuator at 0.0 dBFS Mac output.") +
        rowHtml("crestComp", "Dynamic Compression Compensation (Crest + SC Guard)", "Restores up to +3.5 dB punch on DR4–DR7 Loudness War masters & blocks double Music.app SoundCheck.");
    } else {
      const t = currentTrack();
      body.innerHTML =
        rowHtml(null, `Menu Bar Status: ${t.title}`, `${t.codec} → Hardware Output Locked at ${t.dacRate}`, { cls: "green", txt: "BIT-PERFECT" }) +
        rowHtml(null, "Network Services & Multi-Room Relay", "WebSocket/PWA :8080 • UPnP MediaRenderer :8090 • BluOS 24/192 WAV Relay • WLED DDP :4048", { cls: "neutral", txt: "4 ACTIVE" });
    }

    body.querySelectorAll("[data-mac-toggle]").forEach((sw) => {
      sw.addEventListener("click", () => {
        const k = sw.getAttribute("data-mac-toggle");
        state.macToggles[k] = !state.macToggles[k];
        renderMacSettings();
      });
    });
  }

  function applyDeviceFocus() {
    const stage = document.getElementById("devices-stage-grid");
    const panels = {
      iphone: document.getElementById("panel-device-iphone"),
      tv: document.getElementById("panel-device-tv"),
      console: document.getElementById("panel-device-console"),
      macos: document.getElementById("panel-device-macos")
    };
    if (!stage) return;

    const isAll = state.deviceFocus === "all";
    stage.classList.toggle("single-focus", !isAll);

    Object.entries(panels).forEach(([key, el]) => {
      if (!el) return;
      el.hidden = !isAll && state.deviceFocus !== key;
    });

    document.querySelectorAll("[data-device-focus]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-device-focus") === state.deviceFocus);
    });
  }

  function syncAllDevices() {
    const t = currentTrack();
    applyAmbientPalette(t);
    renderTrackSelector();
    syncIPhone(t);
    syncTV(t);
    syncStudioConsole(t);
    renderMacSettings();
    applyDeviceFocus();
  }

  /* 60fps Live 32-Band RTA Canvas + WLED Halo Animator */
  function startLiveRTALoop() {
    const canvas = document.getElementById("tv-rta-canvas");
    const halo = document.getElementById("tv-wled-halo");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const bands = new Float32Array(32);
    let phase = 0;

    function frame() {
      const t = currentTrack();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 10 && (canvas.width !== Math.floor(rect.width * dpr) || canvas.height !== Math.floor(rect.height * dpr))) {
        canvas.width = Math.floor(rect.width * dpr);
        canvas.height = Math.floor(rect.height * dpr);
      }

      const w = canvas.width;
      const h = canvas.height;
      if (w > 0 && h > 0) {
        ctx.clearRect(0, 0, w, h);
        if (state.isPlaying) phase += 0.065;

        const gap = Math.max(2, Math.floor(w * 0.008));
        const barW = (w - gap * 31) / 32;
        const nyquistIdx = 22; // 22.05 kHz boundary among 32 log bands (20 Hz - 96 kHz)

        for (let i = 0; i < 32; i++) {
          let target = 0.06;
          if (state.isPlaying) {
            const wave = Math.sin(phase * 1.4 + i * 0.42) * 0.18 + Math.cos(phase * 2.3 - i * 0.27) * 0.12;
            const slope = 0.82 - (i / 32) * 0.56;
            target = Math.max(0.06, Math.min(0.96, slope + wave));

            // Authentic Fake Hi-Res / CD 22.05 kHz brickwall drop-off!
            if ((t.isFakeHiRes || t.verdict === "CD LOSSLESS") && i >= nyquistIdx) {
              target = 0.03 + Math.abs(Math.sin(phase + i)) * 0.015;
            }
          }
          bands[i] += (target - bands[i]) * 0.22;

          const bh = Math.max(3 * dpr, bands[i] * (h - 8 * dpr));
          const x = i * (barW + gap);
          const y = h - bh;

          if (i >= nyquistIdx) {
            ctx.fillStyle = (t.isFakeHiRes || t.verdict === "CD LOSSLESS") ? "rgba(255,159,10,0.28)" : "#70d7ff";
          } else {
            ctx.fillStyle = "#30d158";
          }
          ctx.beginPath();
          ctx.roundRect(x, y, Math.max(2, barW), bh, 2 * dpr);
          ctx.fill();
        }

        // Draw 22.05 kHz Nyquist reference line
        const nx = nyquistIdx * (barW + gap) - gap * 0.5;
        ctx.save();
        ctx.strokeStyle = "rgba(255, 159, 10, 0.78)";
        ctx.lineWidth = 1.2 * dpr;
        ctx.setLineDash([3 * dpr, 3 * dpr]);
        ctx.beginPath();
        ctx.moveTo(nx, 2 * dpr);
        ctx.lineTo(nx, h);
        ctx.stroke();
        ctx.restore();
      }

      // WLED DDP 40fps Ambilight modulation
      if (halo) {
        if (!state.isPlaying) {
          halo.style.opacity = "0.22";
        } else if (state.wledMode === "palette") {
          halo.style.opacity = "0.52";
          halo.style.transform = "scale(1)";
        } else {
          const bass = bands[2] || 0.5;
          const op = state.wledMode === "pulse" ? 0.35 + bass * 0.5 : 0.48 + bass * 0.32;
          const sc = state.wledMode === "pulse" ? 0.99 + bass * 0.025 : 1.0;
          halo.style.opacity = op.toFixed(2);
          halo.style.transform = `scale(${sc.toFixed(3)})`;
        }
      }

      requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  function bindEvents() {
    // Device Focus Tabs
    document.querySelectorAll("[data-device-focus]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.deviceFocus = btn.getAttribute("data-device-focus") || "all";
        applyDeviceFocus();
      });
    });

    // Transport buttons
    const togglePlay = () => {
      state.isPlaying = !state.isPlaying;
      syncAllDevices();
    };
    const prevTrack = () => {
      state.trackIndex = (state.trackIndex - 1 + DATA.demoTracks.length) % DATA.demoTracks.length;
      state.elapsedSec = DATA.demoTracks[state.trackIndex].elapsedSec;
      state.isPlaying = true;
      syncAllDevices();
    };
    const nextTrack = () => {
      state.trackIndex = (state.trackIndex + 1) % DATA.demoTracks.length;
      state.elapsedSec = DATA.demoTracks[state.trackIndex].elapsedSec;
      state.isPlaying = true;
      syncAllDevices();
    };

    ["iphone-btn-play", "ios-lock-play"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("click", togglePlay);
    });
    ["iphone-btn-prev", "ios-lock-prev"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("click", prevTrack);
    });
    ["iphone-btn-next", "ios-lock-next"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("click", nextTrack);
    });

    const fav = document.getElementById("iphone-btn-fav");
    if (fav) {
      fav.addEventListener("click", () => {
        state.isFavorited = !state.isFavorited;
        syncIPhone(currentTrack());
      });
    }

    const dacPill = document.getElementById("iphone-dac-pill");
    if (dacPill) {
      dacPill.addEventListener("click", () => {
        state.iphoneSubmode = state.iphoneSubmode === "signal" ? "player" : "signal";
        syncIPhone(currentTrack());
      });
    }

    const scrub = document.getElementById("iphone-scrubber");
    if (scrub) {
      scrub.addEventListener("input", () => {
        const pct = Number(scrub.value) / 100;
        state.elapsedSec = Math.round(currentTrack().durationSec * pct);
        updateScrubberUI();
      });
    }

    document.querySelectorAll("[data-iphone-mode]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.iphoneSubmode = btn.getAttribute("data-iphone-mode") || "player";
        syncIPhone(currentTrack());
      });
    });

    // TV Mode Overlays & WLED selector
    document.querySelectorAll("[data-tv-view]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.tvOverlay = btn.getAttribute("data-tv-view") || "rta";
        syncTV(currentTrack());
      });
    });

    const wledSel = document.getElementById("tv-wled-select");
    if (wledSel) {
      wledSel.addEventListener("change", () => {
        state.wledMode = wledSel.value;
      });
    }

    document.querySelectorAll(".tv-ai-tag").forEach((tag) => {
      tag.addEventListener("click", () => {
        state.trackIndex = (state.trackIndex + 1) % DATA.demoTracks.length;
        state.tvOverlay = "rta";
        state.isPlaying = true;
        syncAllDevices();
      });
    });

    // Studio Console Tabs & Booklet Pager
    document.querySelectorAll("[data-console-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.consoleTab = btn.getAttribute("data-console-tab") || "signal";
        syncStudioConsole(currentTrack());
      });
    });

    const bkPrev = document.getElementById("booklet-prev-btn");
    const bkNext = document.getElementById("booklet-next-btn");
    if (bkPrev) {
      bkPrev.addEventListener("click", () => {
        state.bookletPage = (state.bookletPage + 2) % 3;
        renderBookletPage(currentTrack());
      });
    }
    if (bkNext) {
      bkNext.addEventListener("click", () => {
        state.bookletPage = (state.bookletPage + 1) % 3;
        renderBookletPage(currentTrack());
      });
    }

    // macOS Native Settings Tabs
    document.querySelectorAll("[data-mac-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.macTab = btn.getAttribute("data-mac-tab") || "general";
        renderMacSettings();
      });
    });

    // 1-second optimistic timecode progression
    setInterval(() => {
      if (!state.isPlaying) return;
      const t = currentTrack();
      state.elapsedSec = (state.elapsedSec + 1) % t.durationSec;
      updateScrubberUI();
    }, 1000);
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindEvents();
    syncAllDevices();
    startLiveRTALoop();
  });
})();
