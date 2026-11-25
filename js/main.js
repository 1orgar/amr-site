/* ==========================================================================
   AMR Site Interactions — QR Modal, QR Hub Tabs, Copy Helpers & Scroll Spy
   ========================================================================== */

(function () {
  function initQRModal() {
    const modal = document.getElementById("qr-modal");
    const openBtns = document.querySelectorAll("[data-open-qr-modal]");
    const closeBtn = document.getElementById("qr-modal-close");
    if (!modal) return;

    const open = () => { modal.hidden = false; };
    const close = () => { modal.hidden = true; };

    openBtns.forEach((b) => b.addEventListener("click", open));
    if (closeBtn) closeBtn.addEventListener("click", close);
    modal.addEventListener("click", (ev) => {
      if (ev.target === modal) close();
    });
    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape" && !modal.hidden) close();
    });
  }

  function initQRHubTabs() {
    const img = document.getElementById("qr-hub-img");
    const caption = document.getElementById("qr-hub-caption");
    const urlLabel = document.getElementById("qr-hub-url");
    const tabs = document.querySelectorAll("[data-qr-target]");
    if (!img || !tabs.length) return;

    const configs = {
      release: {
        src: "./assets/qr-download.svg",
        caption: "Scan with iPhone or iPad camera to open the latest Universal macOS DMG release on GitHub.",
        url: "github.com/1orgar/amr/releases/latest"
      },
      repo: {
        src: "./assets/qr-github.svg",
        caption: "Scan to inspect the pure Swift source code, star 1orgar/amr, or read DSP documentation.",
        url: "github.com/1orgar/amr"
      }
    };

    tabs.forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-qr-target") || "release";
        const cfg = configs[key] || configs.release;
        img.src = cfg.src;
        if (caption) caption.textContent = cfg.caption;
        if (urlLabel) urlLabel.textContent = cfg.url;
        tabs.forEach((t) => t.classList.toggle("active", t === btn));
      });
    });
  }

  function initCopyButtons() {
    document.querySelectorAll("[data-copy-text]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const text = btn.getAttribute("data-copy-text") || "";
        const prev = btn.textContent;
        try {
          await navigator.clipboard.writeText(text);
          btn.textContent = "Copied ✓";
        } catch (_) {
          btn.textContent = "Copied";
        }
        setTimeout(() => {
          btn.textContent = prev;
        }, 1600);
      });
    });
  }

  function initScrollSpy() {
    const links = Array.from(document.querySelectorAll(".nav-links a[href^='#']"));
    if (!links.length || !("IntersectionObserver" in window)) return;

    const map = new Map();
    links.forEach((a) => {
      const id = a.getAttribute("href").slice(1);
      const sec = document.getElementById(id);
      if (sec) map.set(sec, a);
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const activeLink = map.get(entry.target);
          links.forEach((l) => l.classList.toggle("active", l === activeLink));
        }
      });
    }, { rootMargin: "-25% 0px -60% 0px" });

    map.forEach((_, sec) => io.observe(sec));
  }

  document.addEventListener("DOMContentLoaded", () => {
    initQRModal();
    initQRHubTabs();
    initCopyButtons();
    initScrollSpy();
  });
})();
