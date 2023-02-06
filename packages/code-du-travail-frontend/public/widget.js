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
  iframe.style = "border:none;box-shadow:none; body {overflow: hidden;}";
  iframe.onload = function () {
    iframe.contentWindow.document.body.style = "overflow: hidden;";
    const height = iframe.contentWindow.document.body.scrollHeight || 800;
    iframe.style.height = height + "px";
  };

  iframe.src = isIE
    ? `javascript:
<script>
  window.onload = function() { document.domain = "domain.io"}
</script>`
    : "about:blank";

  const host = window.location.host;
  iframe.src = info.url + "?url_from=" + host;
  return iframe;
}

function loadWidgets() {
  const cdtnHost = "http://localhost:3000"; //"https://code.travail.gouv.fr";
  const widgets = [
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
  ].map((widget) => {
    const iframe = addWidget(widget);
    return { ...widget, iframe };
  });
  window.addEventListener("message", function (evt) {
    if (evt.data.kind === "onChange") {
      widgets.forEach(({ iframe }) => {
        if (!iframe) {
          return;
        }
        const height = iframe.contentWindow.document.body.scrollHeight || 800;
        iframe.style.height = height + "px";
      });
    }
  });
}

loadWidgets();
