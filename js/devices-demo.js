/* ==========================================================================
   AMR Real Smartphone & Tablet Screenshot Switcher + Retina Lightbox
   ========================================================================== */

(function () {
  const SCENES = [
    {
      key: "player_library",
      badge: "SCENARIO 01 • BIT-PERFECT PLAYER & HI-RES LIBRARY",
      phoneSrc: "./assets/screens/phone-now-playing.png",
      phoneAlt: "AMR iPhone Now Playing — Daft Punk Giorgio by Moroder 24-bit 192 kHz DR16",
      phoneTitle: "iPhone — OLED Now Playing",
      phoneSpec: "24-bit / 192 kHz • DR16",
      tabletSrc: "./assets/screens/tablet-library.png",
      tabletAlt: "AMR iPad Split-View Now Playing and 6-Album Hi-Res Library Grid",
      tabletTitle: "iPad — Split-View Player & Hi-Res Library",
      tabletSpec: "96 kHz Bit-Perfect • 6 Showcase Albums"
    },
    {
      key: "signal_path",
      badge: "SCENARIO 02 • ROON-STYLE SIGNAL PATH & LIVE vDSP FFT",
      phoneSrc: "./assets/screens/phone-signal-path.png",
      phoneAlt: "AMR iPhone Signal Path Inspector — Bit-Perfect Verified 96 kHz 0.0 dB FS",
      phoneTitle: "iPhone — Signal Path Inspector",
      phoneSpec: "0.0 dBFS • Hardware Clock Locked",
      tabletSrc: "./assets/screens/tablet-signal-path.png",
      tabletAlt: "AMR iPad Two-Column Signal Path with Room Auto-PEQ and Verified True Hi-Res vDSP FFT",
      tabletTitle: "iPad — Two-Column Signal Path, Auto-PEQ & FFT",
      tabletSpec: "TRUE HI-RES • 40 kHz • 24-Bit True LSB"
    },
    {
      key: "ai_booklet",
      badge: "SCENARIO 03 • 512-D SONIC BRIDGE & PDFKIT DIGITAL BOOKLET",
      phoneSrc: "./assets/screens/phone-sonic-bridge.png",
      phoneAlt: "AMR iPhone 512-D SLERP Geodesic Sonic Bridge on Apple Neural Engine",
      phoneTitle: "iPhone — 512-D SLERP Sonic Bridge",
      phoneSpec: "Apple Neural Engine • On-Device AI",
      tabletSrc: "./assets/screens/tablet-booklet.png",
      tabletAlt: "AMR iPad Split-View Digital Master Booklet rendered via PDFKit",
      tabletTitle: "iPad — Native PDFKit Digital Album Booklet",
      tabletSpec: "Multi-Page Master Liner Notes"
    },
    {
      key: "library_standby",
      badge: "SCENARIO 04 • MOBILE LIBRARY & 4K STANDBY LIVE RTA",
      phoneSrc: "./assets/screens/phone-library.png",
      phoneAlt: "AMR iPhone Library Albums Grid with Floating Mini Player",
      phoneTitle: "iPhone — Library & Floating Mini-Player",
      phoneSpec: "Instant Disk Artwork Cache",
      tabletSrc: "./assets/screens/tablet-standby-rta.png",
      tabletAlt: "AMR iPad and 4K TV Fullscreen StandBy Mode with Live 60fps RTA",
      tabletTitle: "iPad / 4K TV — Fullscreen StandBy + Live RTA",
      tabletSpec: "60 FPS Spectrum • TRUE HI-RES • DR16"
    }
  ];

  let activeIdx = 0;

  function renderScene(idx) {
    activeIdx = idx;
    const s = SCENES[idx] || SCENES[0];
    const setTxt = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    const pImg = document.getElementById("real-phone-img");
    const tImg = document.getElementById("real-tablet-img");

    if (pImg) { pImg.src = s.phoneSrc; pImg.alt = s.phoneAlt; }
    if (tImg) { tImg.src = s.tabletSrc; tImg.alt = s.tabletAlt; }

    setTxt("real-scene-badge", s.badge);
    setTxt("real-phone-title", s.phoneTitle);
    setTxt("real-phone-spec", s.phoneSpec);
    setTxt("real-tablet-title", s.tabletTitle);
    setTxt("real-tablet-spec", s.tabletSpec);

    document.querySelectorAll("[data-scene-idx]").forEach((btn) => {
      btn.classList.toggle("active", Number(btn.getAttribute("data-scene-idx")) === idx);
    });
  }

  function initLightbox() {
    const modal = document.getElementById("screen-lightbox");
    const modalImg = document.getElementById("lightbox-img");
    const modalCap = document.getElementById("lightbox-caption");
    const closeBtn = document.getElementById("lightbox-close");
    if (!modal || !modalImg) return;

    const open = (src, alt) => {
      modalImg.src = src;
      modalImg.alt = alt || "";
      if (modalCap) modalCap.textContent = alt || "";
      modal.hidden = false;
    };
    const close = () => { modal.hidden = true; };

    ["frame-phone-trigger", "frame-tablet-trigger"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener("click", () => {
        const img = el.querySelector("img");
        if (img) open(img.src, img.alt);
      });
    });

    if (closeBtn) closeBtn.addEventListener("click", close);
    modal.addEventListener("click", (ev) => {
      if (ev.target === modal) close();
    });
    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape" && !modal.hidden) close();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-scene-idx]").forEach((btn) => {
      btn.addEventListener("click", () => {
        renderScene(Number(btn.getAttribute("data-scene-idx")) || 0);
      });
    });
    initLightbox();
    renderScene(0);
  });
})();
