/* ==========================================================================
   AMR Engineering Laboratory — Interactive FFT, Room Auto-PEQ, LNS15 & De-Clip
   ========================================================================== */

(function () {
  const DATA = window.AMR_DATA;
  if (!DATA) return;

  let activeSpectral = "true_hires";
  let activeRoom = "living_room";
  let activeNoise = "lns15";
  let activeDeclip = "studio";

  function pointsToSmoothPath(pts, width, height, padTop = 14, padBottom = 14, padLeft = 0) {
    const usableH = height - padTop - padBottom;
    const usableW = width - padLeft;
    const stepX = usableW / Math.max(1, pts.length - 1);
    const coords = pts.map((val, idx) => ({
      x: +(padLeft + idx * stepX).toFixed(1),
      y: +(padTop + (1 - val / 100) * usableH).toFixed(1)
    }));
    if (!coords.length) return { line: "", area: "" };

    let d = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 1; i < coords.length; i++) {
      const prev = coords[i - 1];
      const cur = coords[i];
      const cx = +((prev.x + cur.x) / 2).toFixed(1);
      d += ` C ${cx} ${prev.y}, ${cx} ${cur.y}, ${cur.x} ${cur.y}`;
    }
    const area = `${d} L ${width} ${height - padBottom} L ${padLeft} ${height - padBottom} Z`;
    return { line: d, area };
  }

  /* 1. Spectral Integrity Analyzer (4096-pt FFT + 24-Bit LSB Matrix) */
  function renderSpectralLab() {
    const prof = DATA.spectralProfiles[activeSpectral];
    if (!prof) return;

    const svg = document.getElementById("lab-spectral-svg");
    if (svg) {
      const W = 520;
      const H = 188;
      const { line, area } = pointsToSmoothPath(prof.curve, W, H, 16, 16);
      const strokeColor = prof.badgeClass === "green" ? "#30d158" : (prof.badgeClass === "amber" ? "#ff9f0a" : "#70d7ff");
      const nyquist22X = Math.round((11.5 / 21) * W);
      const nyquist24X = Math.round((12.8 / 21) * W);

      svg.innerHTML = `
        <defs>
          <linearGradient id="specAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="${strokeColor}" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="${strokeColor}" stop-opacity="0.02"/>
          </linearGradient>
        </defs>
        <g stroke="rgba(255,255,255,0.06)" stroke-width="1">
          <line x1="0" y1="36" x2="${W}" y2="36"/>
          <line x1="0" y1="88" x2="${W}" y2="88"/>
          <line x1="0" y1="140" x2="${W}" y2="140"/>
        </g>
        <rect x="${nyquist22X}" y="10" width="${W - nyquist22X}" height="${H - 22}" fill="rgba(112,215,255,0.035)"/>
        <path d="${area}" fill="url(#specAreaGrad)"/>
        <path d="${line}" fill="none" stroke="${strokeColor}" stroke-width="2.6" stroke-linecap="round"/>
        <line x1="${nyquist22X}" y1="10" x2="${nyquist22X}" y2="${H - 12}" stroke="#ff9f0a" stroke-width="1.4" stroke-dasharray="4 3"/>
        <text x="${nyquist22X + 5}" y="23" fill="#ff9f0a" font-family="ui-monospace, monospace" font-size="10" font-weight="700">22.05 kHz CD</text>
        <line x1="${nyquist24X}" y1="32" x2="${nyquist24X}" y2="${H - 12}" stroke="rgba(255,255,255,0.22)" stroke-width="1" stroke-dasharray="2 3"/>
      `;
    }

    const setTxt = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    const badge = document.getElementById("lab-spectral-badge");
    if (badge) {
      badge.textContent = prof.badge;
      badge.className = `status-pill ${prof.badgeClass}`;
    }
    setTxt("lab-spec-container", prof.container);
    setTxt("lab-spec-cutoff", prof.cutoff);
    setTxt("lab-spec-ultra", prof.ultrasonic);
    setTxt("lab-spec-note", prof.note);
    setTxt("lab-lsb-summary", prof.activeBits === 24 ? "Bits 1–24 Active (True 24-Bit Entropy)" : "Bits 17–24 Zero-Padded (0x00)");

    const lsbGrid = document.getElementById("lab-lsb-grid");
    if (lsbGrid) {
      let cells = "";
      for (let b = 1; b <= 24; b++) {
        const isZero = b > prof.activeBits;
        cells += `<div class="lsb-bit-cell ${isZero ? "zeroed" : ""}" title="Bit ${b} (${isZero ? "Zeroed 0" : "Active 1/0"})">${isZero ? "0" : b}</div>`;
      }
      lsbGrid.innerHTML = cells;
    }

    document.querySelectorAll("[data-spec-mode]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-spec-mode") === activeSpectral);
    });
  }

  /* 2. 64-Bit Room Acoustic Auto-PEQ Graph */
  function renderRoomLab() {
    const prof = DATA.roomProfiles[activeRoom];
    if (!prof) return;

    const svg = document.getElementById("lab-room-svg");
    if (svg) {
      const W = 520;
      const H = 188;
      // Here higher y value in array means lower on screen if inverted, let's map 0..100 cleanly:
      const mapCurve = (arr) => pointsToSmoothPath(arr.map((v) => 100 - v), W, H, 18, 18, 46).line;
      const measLine = mapCurve(prof.measured);
      const targLine = mapCurve(prof.target);
      const corrLine = mapCurve(prof.corrected);

      svg.innerHTML = `
        <g stroke="rgba(255,255,255,0.06)" stroke-width="1">
          <line x1="46" y1="38" x2="${W}" y2="38"/>
          <line x1="46" y1="94" x2="${W}" y2="94" stroke="rgba(255,255,255,0.14)"/>
          <line x1="46" y1="150" x2="${W}" y2="150"/>
          <line x1="150" y1="10" x2="150" y2="176"/>
          <line x1="290" y1="10" x2="290" y2="176"/>
          <line x1="425" y1="10" x2="425" y2="176"/>
        </g>
        <text x="40" y="41" text-anchor="end" fill="#686873" font-family="ui-monospace, monospace" font-size="9.5">+9 dB</text>
        <text x="40" y="97" text-anchor="end" fill="#a1a1aa" font-family="ui-monospace, monospace" font-size="9.5">0 dB</text>
        <text x="40" y="153" text-anchor="end" fill="#686873" font-family="ui-monospace, monospace" font-size="9.5">-9 dB</text>
        <path d="${targLine}" fill="none" stroke="rgba(255,255,255,0.48)" stroke-width="1.8" stroke-dasharray="5 4"/>
        <path d="${measLine}" fill="none" stroke="#ff9f0a" stroke-width="2.2" stroke-linecap="round"/>
        <path d="${corrLine}" fill="none" stroke="#30d158" stroke-width="2.8" stroke-linecap="round"/>
      `;
    }

    const pillsEl = document.getElementById("lab-room-pills");
    if (pillsEl) {
      pillsEl.innerHTML = prof.pills.map((p) => `<span class="peq-pill">${p}</span>`).join("");
    }
    const badge = document.getElementById("lab-room-preamp");
    if (badge) badge.textContent = prof.preamp;

    document.querySelectorAll("[data-room-mode]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-room-mode") === activeRoom);
    });
  }

  /* 3. Hybrid DSP Quantization Noise Floor (LNS15 vs DSD256 vs TPDF24 vs PCM16) */
  function renderNoiseLab() {
    const active = DATA.noiseProfiles[activeNoise];
    if (!active) return;

    const svg = document.getElementById("lab-noise-svg");
    if (svg) {
      const W = 520;
      const H = 188;
      // Convert positive dB depth (36..172) where larger depth = lower on plot (better noise floor!)
      const depthToLine = (pts) => {
        const normalized = pts.map((db) => Math.max(4, Math.min(98, 100 - ((db - 30) / 145) * 92)));
        return pointsToSmoothPath(normalized, W, H, 14, 14, 58).line;
      };

      const earX1 = Math.round(58 + (W - 58) * 0.24);
      const earX2 = Math.round(58 + (W - 58) * 0.5);

      const bgCurves = Object.entries(DATA.noiseProfiles)
        .filter(([k]) => k !== activeNoise)
        .map(([, p]) => `<path d="${depthToLine(p.points)}" fill="none" stroke="${p.color}" stroke-opacity="0.24" stroke-width="1.5" stroke-dasharray="3 3"/>`)
        .join("");

      const mainLine = depthToLine(active.points);

      svg.innerHTML = `
        <g stroke="rgba(255,255,255,0.06)" stroke-width="1">
          <line x1="58" y1="44" x2="${W}" y2="44"/>
          <line x1="58" y1="98" x2="${W}" y2="98"/>
          <line x1="58" y1="152" x2="${W}" y2="152"/>
        </g>
        <rect x="${earX1}" y="10" width="${earX2 - earX1}" height="${H - 22}" fill="rgba(48,209,88,0.05)"/>
        <text x="${(earX1 + earX2) / 2}" y="24" text-anchor="middle" fill="#30d158" font-family="ui-monospace, monospace" font-size="9.5" font-weight="700">1–6 kHz EAR PEAK</text>
        <text x="52" y="47" text-anchor="end" fill="#686873" font-family="ui-monospace, monospace" font-size="9.5">-96 dBFS</text>
        <text x="52" y="101" text-anchor="end" fill="#686873" font-family="ui-monospace, monospace" font-size="9.5">-144 dBFS</text>
        <text x="52" y="155" text-anchor="end" fill="#70d7ff" font-family="ui-monospace, monospace" font-size="9.5">-168 dBFS</text>
        ${bgCurves}
        <path d="${mainLine}" fill="none" stroke="${active.color}" stroke-width="3" stroke-linecap="round"/>
      `;
    }

    const setTxt = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    setTxt("lab-noise-badge", active.badge);
    setTxt("lab-noise-floor", active.floor2k);
    setTxt("lab-noise-carrier", active.carrier);
    setTxt("lab-noise-shaper", active.shaper);
    setTxt("lab-noise-desc", active.desc);

    document.querySelectorAll("[data-noise-mode]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-noise-mode") === activeNoise);
    });
  }

  /* 4. 64-Bit Mastering De-Clipper Waveform Oscilloscope */
  function renderDeclipLab() {
    const svg = document.getElementById("lab-declip-svg");
    if (!svg) return;

    const W = 520;
    const H = 188;
    const midY = 112;
    const clipY = 58; // 0.0 dBFS ceiling

    let peakLift = 0;
    let badgeText = "CLIPPED 0.0 dBFS PLATEAU";
    let badgeCls = "amber";
    let crestGain = "+0.0 dB (Unrestored)";
    if (activeDeclip === "gentle") {
      peakLift = 24;
      badgeText = "GENTLE C1 HERMITE • +2.8 dB";
      badgeCls = "cyan";
      crestGain = "+2.8 dB Peak Restored";
    } else if (activeDeclip === "studio") {
      peakLift = 38;
      badgeText = "STUDIO C1 HERMITE • +4.2 dB";
      badgeCls = "green";
      crestGain = "+4.2 dB Peak Restored";
    }

    // Build clipped wave vs C1 cubic Hermite restored dome
    const clippedPath = `M 0 ${midY} Q 55 ${midY - 24}, 95 ${midY + 28} Q 135 ${midY + 62}, 172 ${clipY} L 268 ${clipY} Q 308 ${midY + 58}, 352 ${midY - 26} Q 405 ${midY + 34}, 455 ${midY - 14} L ${W} ${midY}`;
    const restoredPath = `M 0 ${midY} Q 55 ${midY - 24}, 95 ${midY + 28} Q 135 ${midY + 62}, 172 ${clipY} C 196 ${clipY - peakLift}, 244 ${clipY - peakLift}, 268 ${clipY} Q 308 ${midY + 58}, 352 ${midY - 26} Q 405 ${midY + 34}, 455 ${midY - 14} L ${W} ${midY}`;

    svg.innerHTML = `
      <rect x="0" y="10" width="${W}" height="${clipY - 10}" fill="rgba(48,209,88,0.05)"/>
      <line x1="0" y1="${clipY}" x2="${W}" y2="${clipY}" stroke="#ff453a" stroke-width="1.3" stroke-dasharray="5 4"/>
      <text x="8" y="${clipY - 6}" fill="#ff6961" font-family="ui-monospace, monospace" font-size="9.5" font-weight="700">0.0 dBFS BRICKWALL LIMITER CEILING (64-BIT FP64 HEADROOM ABOVE)</text>
      <line x1="0" y1="${midY}" x2="${W}" y2="${midY}" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
      <path d="${clippedPath}" fill="none" stroke="#ff9f0a" stroke-opacity="${peakLift > 0 ? "0.45" : "1"}" stroke-width="2.2" stroke-dasharray="${peakLift > 0 ? "4 3" : "none"}"/>
      ${peakLift > 0 ? `<path d="${restoredPath}" fill="none" stroke="#30d158" stroke-width="2.8" stroke-linecap="round"/>` : ""}
    `;

    const badge = document.getElementById("lab-declip-badge");
    if (badge) {
      badge.textContent = badgeText;
      badge.className = `status-pill ${badgeCls}`;
    }
    const gEl = document.getElementById("lab-declip-gain");
    if (gEl) gEl.textContent = crestGain;

    document.querySelectorAll("[data-declip-mode]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-declip-mode") === activeDeclip);
    });
  }

  function bindLabControls() {
    document.querySelectorAll("[data-spec-mode]").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeSpectral = btn.getAttribute("data-spec-mode");
        renderSpectralLab();
      });
    });

    document.querySelectorAll("[data-room-mode]").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeRoom = btn.getAttribute("data-room-mode");
        renderRoomLab();
      });
    });

    const sweepBtn = document.getElementById("btn-simulate-sweep");
    if (sweepBtn) {
      sweepBtn.addEventListener("click", () => {
        const orig = sweepBtn.textContent;
        sweepBtn.disabled = true;
        sweepBtn.textContent = "Calibrating Paul Kellet Pink Noise (85% M / 15% S)…";
        const order = ["living_room", "desk_studio", "open_loft"];
        activeRoom = order[(order.indexOf(activeRoom) + 1) % order.length];
        setTimeout(() => {
          renderRoomLab();
          sweepBtn.textContent = "✓ Synthesized 64-Bit Harman Auto-PEQ";
          setTimeout(() => {
            sweepBtn.disabled = false;
            sweepBtn.textContent = orig;
          }, 1300);
        }, 550);
      });
    }

    document.querySelectorAll("[data-noise-mode]").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeNoise = btn.getAttribute("data-noise-mode");
        renderNoiseLab();
      });
    });

    document.querySelectorAll("[data-declip-mode]").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeDeclip = btn.getAttribute("data-declip-mode");
        renderDeclipLab();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    bindLabControls();
    renderSpectralLab();
    renderRoomLab();
    renderNoiseLab();
    renderDeclipLab();
  });
})();
