function addWidget() {
  const target = document.querySelector("#cdtn-widget-preavis-retraite");
  let iframe = document.getElementById("iframe");
  if (!iframe) {
    iframe = document.createElement("iframe");
    target.insertAdjacentElement("afterbegin", iframe);
  }
  iframe.id = "cdtn-iframe";
  iframe.width = "100%";
  iframe.height = "650px";
  iframe.style = "border:none";
  iframe.src = "http://localhost:3000/widgets/preavis-de-retraite";

  setTimeout(init, 300);

  function init() {
    const link = document.querySelector("#cdtn-widget-preavis-retraite a");
    if (link) {
      target.removeChild(link);
    }
  }
}

window.addEventListener("DOMContentLoaded", addWidget);
