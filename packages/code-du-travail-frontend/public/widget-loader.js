// Stable embed loader.
//
// This file is intentionally kept small and (as much as possible) immutable.
// It loads the actual embed runtime (`/widget.js`) from the same origin.
(function () {
  let origin = "https://code.travail.gouv.fr";
  const current = document.currentScript;
  if (current && current.src) {
    try {
      origin = new URL(current.src).origin;
    } catch (e) {
      // Ignore URL parsing errors and keep the default origin.
    }
  }

  function injectRuntime() {
    // Prevent double-injection if the loader is included more than once.
    if (document.querySelector('script[data-cdtn-widget-runtime="1"]')) {
      return;
    }

    const script = document.createElement("script");
    script.setAttribute("data-cdtn-widget-runtime", "1");
    script.src = origin.replace(/\/$/, "") + "/widget.js";
    // Dynamic scripts are async by default.
    script.async = true;

    const target = document.head || document.body || document.documentElement;
    target.appendChild(script);
  }

  // Bad integrators sometimes put the script tag early in the <head>.
  // Waiting for DOM parsing makes the runtime more reliable.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectRuntime);
  } else {
    injectRuntime();
  }
})();
