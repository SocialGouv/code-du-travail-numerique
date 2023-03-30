function addWidget(info) {
  const iframePrefix = "cdtn-iframe-";
  const targetIframe = document.querySelector("#" + iframePrefix + info.name);
  if (targetIframe) {
    return;
  }
  let target;
  if (info.name === "widget") {
    target = document.querySelector("#cdtn-" + info.name);
  }
  if (!target) {
    const links = document.querySelectorAll("a[href='" + info.url + "']");
    if (links.length) {
      target = links[0];
    } else {
      return;
    }
  }

  const iframe = document.createElement("iframe");
  target.parentNode.insertBefore(iframe, target);
  target.remove();

  iframe.id = iframePrefix + info.name;
  iframe.width = "100%";
  iframe.style = "border:none;";

  window.addEventListener("message", function (evt) {
    if (
      evt.source === iframe.contentWindow &&
      evt.data.kind === "resize-height"
    ) {
      iframe.style.height = evt.data.value + "px";
    }
    if (
      evt.source === iframe.contentWindow &&
      evt.data.kind === "scroll-to-top"
    ) {
      const bodyPosition = document.body.getBoundingClientRect();
      const iframePosition = iframe.getBoundingClientRect();
      window.scrollTo(0, iframePosition.top - bodyPosition.top);
    }
  });

  iframe.src = info.url;
  return iframe;
}

function loadWidgets() {
  __WIDGETS__.forEach((widget) => {
    addWidget(widget);
  });
}

loadWidgets();
