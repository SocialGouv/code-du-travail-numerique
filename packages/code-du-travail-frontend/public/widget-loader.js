// Stable embed loader.
//
// This file is intentionally kept small and (as much as possible) immutable.
// It loads the actual embed runtime (`/widget.js`) from the same origin.
(function () {
  let origin = "https://code.travail.gouv.fr";

  function normalizeHttpOrigin(value) {
    if (!value) return null;
    try {
      const url = new URL(value);
      // Only allow http(s) origins to prevent `javascript:`, `data:`, etc.
      if (url.protocol !== "https:" && url.protocol !== "http:") {
        return null;
      }
      // Keep only the origin (drop any path/query/hash).
      return url.origin;
    } catch (e) {
      return null;
    }
  }

  function getLoaderScript() {
    // Most reliable: the currently executing script.
    const current = document.currentScript;
    if (current && current.src) return current;

    // Fallback: try to find the loader script by scanning <script> tags.
    // This helps when the loader is injected dynamically (where currentScript
    // can be null in some browsers).
    const scripts = document.getElementsByTagName("script");
    for (let i = scripts.length - 1; i >= 0; i--) {
      const s = scripts[i];
      if (s && s.src && /\/widget-loader\.js(?:[?#].*)?$/.test(s.src)) {
        return s;
      }
    }
    return null;
  }

  const loaderScript = getLoaderScript();
  if (loaderScript) {
    // Optional override (useful for debugging):
    // <script src=".../widget-loader.js" data-cdtn-widget-origin="https://..." />
    const overrideOrigin =
      loaderScript.getAttribute &&
      loaderScript.getAttribute("data-cdtn-widget-origin");
    if (overrideOrigin) {
      const normalized = normalizeHttpOrigin(overrideOrigin);
      if (normalized) {
        origin = normalized;
      }
    } else if (loaderScript.src) {
      try {
        const normalized = normalizeHttpOrigin(loaderScript.src);
        if (normalized) {
          origin = normalized;
        }
      } catch (e) {
        // Ignore URL parsing errors and keep the default origin.
      }
    }
  }

  function injectRuntime() {
    // Prevent double-injection if the loader is included more than once.
    if (document.querySelector('script[data-cdtn-widget-runtime="1"]')) {
      return;
    }

    const script = document.createElement("script");
    script.setAttribute("data-cdtn-widget-runtime", "1");
    script.src = new URL("/widget.js", origin).toString();
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
