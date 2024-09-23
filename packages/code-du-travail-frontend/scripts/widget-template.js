function addWidget({ target, id, url }) {
  const iframe = document.createElement("iframe");
  target.parentNode.insertBefore(iframe, target);
  target.remove();

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
  const widgets = [];
  const oldWidget = document.querySelector("#cdtn-widget");
  if (oldWidget) {
    const id = "cdtn-iframe-widget";
    const url = "__HOST__/widgets/search";
    widgets.push({ target: oldWidget, id, url });
  }
  const targetLinks = document.querySelectorAll('a[href*="__HOST__/widgets/"]');
  if (targetLinks.length) {
    targetLinks.forEach((target) => {
      const url = target.attributes.href.nodeValue;
      const id =
        "cdtn-iframe-" +
        url.replace("__HOST__/widgets/", "").replace(/\//, "-");
      if (!widgets.find(({ url: oldUrl }) => oldUrl === url)) {
        widgets.push({ url, id, target });
      }
    });
  }
  widgets.forEach((widget) => {
    addWidget(widget);
  });
}

loadWidgets();
