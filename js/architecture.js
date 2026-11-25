/* ==========================================================================
   AMR System Architecture Schematic & API Protocol Explorer
   ========================================================================== */

(function () {
  const DATA = window.AMR_DATA;
  if (!DATA) return;

  let activeNodeKey = "tap";
  let activeApiKey = "status";

  function renderArchInspector() {
    const node = DATA.archNodes[activeNodeKey];
    if (!node) return;

    const setTxt = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    setTxt("arch-insp-title", node.title);
    setTxt("arch-insp-summary", node.summary);
    setTxt("arch-spec-fw", node.framework);
    setTxt("arch-spec-thread", node.threading);
    setTxt("arch-spec-lat", node.latency);
    setTxt("arch-spec-proto", node.protocol);

    document.querySelectorAll("[data-arch-node]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-arch-node") === activeNodeKey);
    });
  }

  function renderApiPreview() {
    const pre = document.getElementById("api-code-output");
    if (pre) {
      pre.textContent = DATA.apiExamples[activeApiKey] || "";
    }
    document.querySelectorAll("[data-api-tab]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-api-tab") === activeApiKey);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-arch-node]").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeNodeKey = btn.getAttribute("data-arch-node") || "tap";
        renderArchInspector();
      });
    });

    document.querySelectorAll("[data-api-tab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeApiKey = btn.getAttribute("data-api-tab") || "status";
        renderApiPreview();
      });
    });

    renderArchInspector();
    renderApiPreview();
  });
})();
