function addWidget({ target, id, url }) {
  const iframe = document.createElement("iframe");
  target.parentNode.insertBefore(iframe, target);
  target.remove();

  iframe.id = id;
  iframe.width = "100%";
  iframe.style = "border:none;";

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
      const marginTop = (bodyPosition.height * 5) / 100;
      window.scrollTo(0, iframePosition.top - bodyPosition.top - marginTop);
    }
  });

  iframe.src = url;
  return iframe;
}

function loadWidgets() {
  let widgets = [];
  const oldWidget = document.querySelector("#cdtn-widget");
  if (oldWidget) {
    const id = "cdtn-iframe-widget";
    const url = "__HOST__/widgets/search";
    widgets.push({ target: oldWidget, id, url });
  }
  const targetLinks = document.querySelectorAll("a[href*='__HOST__/widgets/']");
  if (targetLinks.length) {
    mappedTargetLinks = Object.values(targetLinks).map((target) => {
      const url = target.attributes.href.nodeValue;
      const id =
        "cdtn-iframe-" +
        url.replace("__HOST__/widgets/", "").replace(/\//, "-");
      return { url, id, target };
    });
    widgets = widgets.concat(mappedTargetLinks);
  }
  widgets.forEach((widget) => {
    addWidget(widget);
  });
}

loadWidgets();
