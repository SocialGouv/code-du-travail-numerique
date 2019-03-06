import React from "react";

const routeBysource = {
  "fiche-service-public": "fiches_service_public",
  "fiche-ministere-travail": "fiches_ministere_travail",
  "code-du-travail": "code_du_travail",
  "modeles-de-courriers": "modeles_de_courriers",
  question: "faq",
  themes: "themes",
  outils: "outils",
  idcc: "idcc",
  kali: "kali"
};
function translateSource(path) {
  return path.replace(
    /\/([^/]+)(\/.*)$/,
    (_, p1, p2) => `/${routeBysource[p1] || p1}${p2}`
  );
}

export function withClipboard(
  Component,
  saveToClipboard = savePathnameToClipBoard
) {
  return function withClipboardComponent(props) {
    return <Component onClick={saveToClipboard} {...props} />;
  };
}

function savePathnameToClipBoard() {
  const el = document.createElement("textarea");
  el.value = translateSource(document.location.pathname);

  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  // If there is any content selected previously
  // then save it
  const selected =
    document.getSelection().rangeCount > 0 // Check if there is any content selected previously
      ? document.getSelection().getRangeAt(0)
      : false;

  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  // If a selection existed before copying, then reselect it
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
}
