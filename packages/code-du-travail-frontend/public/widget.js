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
  [
    {
      name: "widget",
      url: "http://localhost:3000/widget.html",
    },
    {
      name: "preavis-licenciement",
      url: "http://localhost:3000/widgets/preavis-licenciement",
    },
    {
      name: "preavis-retraite",
      url: "http://localhost:3000/widgets/preavis-retraite",
    },
    {
      name: "procedure-licenciement",
      url: "http://localhost:3000/widgets/procedure-licenciement",
    },
  ].forEach((widget) => {
    addWidget(widget);
  });
}

loadWidgets();
