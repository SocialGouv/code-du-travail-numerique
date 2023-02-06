function linkToNewTab(iframe) {
  const links = iframe.contentWindow.document.getElementsByTagName("a");
  if (!links.length) return;
  for (let i = 0; i < links.length; i++) {
    links[i].target = "_blank";
  }
}

function addWidget(info) {
  const target = document.querySelector("#cdtn-" + info.name);
  if (!target) {
    return;
  }
  const targetIframe = document.querySelector("#cdtn-iframe-" + info.name);
  if (targetIframe) {
    return;
  }
  const iframe = document.createElement("iframe");
  target.insertAdjacentElement("afterbegin", iframe);
  const isIE = /MSIE/.test(window.navigator.userAgent);
  iframe.id = "cdtn-iframe-" + info.name;
  iframe.width = "100%";
  iframe.style = "border:none;";
  iframe.onload = function () {
    const cssLink = document.createElement("link");
    cssLink.href = "/widget.css";
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";
    iframe.contentWindow.document.body.appendChild(cssLink);
    const height = iframe.contentWindow.document.body.scrollHeight || 800;
    iframe.style.height = height + "px";
    iframe.contentWindow.document.addEventListener(
      "DOMNodeInserted",
      function () {
        linkToNewTab(iframe);
      }
    );
  };

  iframe.src = isIE
    ? `javascript:
  <script>
    window.onload = function() { document.domain = "domain.io"}
  </script>`
    : "about:blank";

  iframe.src = info.url;
  return iframe;
}

function loadWidgets() {
  const cdtnHost = "http://localhost:3000"; //"https://code.travail.gouv.fr";
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
