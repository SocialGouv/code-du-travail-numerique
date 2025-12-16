(function () {
  function getHostFromScriptSrc() {
    const scriptEl =
      document.currentScript ||
      document.querySelector('script[src*="/widget.js"]');
    if (!scriptEl || !scriptEl.src) {
      return null;
    }
    try {
      return new URL(scriptEl.src).origin;
    } catch (e) {
      console.warn("Could not parse script URL:", scriptEl.src);
      return null;
    }
  }

  function addWidget(params) {
    const target = params.target;
    const id = params.id;
    const url = params.url;

    const existing = document.getElementById(id);
    if (existing && existing.tagName === "IFRAME") {
      existing.src = url;
      target.style.display = "none";
      return existing;
    }

    const iframe = document.createElement("iframe");
    target.parentNode.insertBefore(iframe, target.nextSibling);
    target.style.display = "none";

    iframe.id = id;
    iframe.width = "100%";
    iframe.style = "border:none;min-height:200px;";

    const HEADER_MENU_HEIGHT = 50;
    window.addEventListener("message", function (evt) {
      if (
        evt.source === iframe.contentWindow &&
        evt.data.kind === "resize-height"
      ) {
        iframe.style.height = evt.data.value + 16 + "px";
      }
      if (
        evt.source === iframe.contentWindow &&
        evt.data.kind === "scroll-to-top"
      ) {
        const bodyPosition = document.body.getBoundingClientRect();
        const iframePosition = iframe.getBoundingClientRect();
        window.scrollTo(
          0,
          iframePosition.top - bodyPosition.top - HEADER_MENU_HEIGHT
        );
      }
    });

    iframe.src = url;
    return iframe;
  }

  function loadWidgets() {
    const host = getHostFromScriptSrc() || "";
    const widgets = [];

    const oldWidget = document.querySelector("#cdtn-widget");
    if (oldWidget) {
      const id = "cdtn-iframe-widget";
      const url = host + "/widgets/search";
      widgets.push({ target: oldWidget, id: id, url: url });
    }

    const selector =
      'a[href*="' +
      host +
      '/widgets/"],a[href^="/widgets/"],a[href*="/widgets/"]';
    const targetLinks = document.querySelectorAll(selector);

    if (targetLinks.length) {
      targetLinks.forEach(function (target) {
        const hrefAttr = target.getAttribute("href");
        if (!hrefAttr) return;

        let widgetUrl = hrefAttr;

        try {
          widgetUrl = new URL(
            hrefAttr,
            host || window.location.origin
          ).toString();
        } catch (e) {
          console.warn("Could not parse widget URL:", hrefAttr);
          return;
        }

        if (host && widgetUrl.indexOf(host + "/widgets/") === -1) {
          return;
        }

        const id =
          "cdtn-iframe-" +
          widgetUrl.replace(host + "/widgets/", "").replace(/\//, "-");
        if (
          !widgets.find(function (w) {
            return w.url === widgetUrl;
          })
        ) {
          widgets.push({ url: widgetUrl, id: id, target: target });
        }
      });
    }

    widgets.forEach(function (widget) {
      addWidget(widget);
    });
  }

  window.cdtnLoadWidgets = loadWidgets;

  loadWidgets();
})();
