function linkToNewTab(iframe) {
  const links = iframe.contentWindow.document.getElementsByTagName("a");
  if (!links.length) return;
  for (let i = 0; i < links.length; i++) {
    links[i].target = "_blank";
  }
}

function setHeight(iframe) {
  const height = iframe.contentWindow.document.body.scrollHeight || 800;
  iframe.style.height = height + "px";
}

function addWidget(info) {
  const iframePrefix = "cdtn-iframe-";
  const target = document.querySelector("#cdtn-" + info.name);
  if (!target) {
    return;
  }
  const targetIframe = document.querySelector("#" + iframePrefix + info.name);
  if (targetIframe) {
    return;
  }
  const iframe = document.createElement("iframe");
  target.insertAdjacentElement("afterbegin", iframe);

  iframe.id = iframePrefix + info.name;
  iframe.width = "100%";
  iframe.style = "border:none;";
  iframe.onload = function () {
    setHeight(iframe);
    linkToNewTab(iframe);
    iframe.contentWindow.document.addEventListener(
      "DOMNodeInserted",
      function () {
        linkToNewTab(iframe);
      }
    );
  };

  iframe.src = info.url;
  return iframe;
}

function loadWidgets() {
  const cdtnHost = "__HOST__";
  [
    {
      name: "widget",
      url: cdtnHost + "/widget.html",
    },
    {
      name: "preavis-licenciement",
      url: cdtnHost + "/widgets/preavis-licenciement",
    },
    {
      name: "preavis-retraite",
      url: cdtnHost + "/widgets/preavis-retraite",
    },
    {
      name: "procedure-licenciement",
      url: cdtnHost + "/widgets/procedure-licenciement",
    },
  ].forEach((widget) => {
    addWidget(widget);
  });
}

loadWidgets();
