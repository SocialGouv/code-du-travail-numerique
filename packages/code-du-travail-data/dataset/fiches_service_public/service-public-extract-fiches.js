const fs = require("fs");
const select = require("xpath.js");
const dom = require("xmldom").DOMParser;

const xmlToHtml = require("./xmlToHtml");
/*

extrait les données avec les fichiers XML de :

https://www.data.gouv.fr/fr/datasets/service-public-fr-guide-vos-droits-et-demarches-professionnels-entreprises/#_

*/

const XMLS_PATH = "./data";

const read = path => fs.readFileSync(path).toString();

const parseFiche = path => {
  const doc = new dom().parseFromString(read(path));
  const nodes = select(doc, "//Theme[@ID='N19806']");
  const id = select(doc, "/Publication/@ID")[0].value;
  if (nodes.length) {
    const url = `https://www.service-public.fr/particuliers/vosdroits/${id}`;
    const title = select(
      doc,
      `/Publication/FilDAriane/Niveau[@ID='${id}']/text()`
    )[0].data;
    const tags = select(doc, "/Publication/DossierPere/*/text()")
      .map(d => d.data)
      .map(x => x.trim())
      .filter(Boolean);
    const refs = select(doc, "/Publication/Reference").map(node => {
      const url = select(node, "@URL")[0].value;
      const source =
        select(node, "Titre/text()")[0] &&
        select(node, "Titre/text()")[0].textContent;
      const sujet =
        select(node, "Complement/text()")[0] &&
        select(node, "Complement/text()")[0].data;
      return {
        url,
        source,
        sujet
      };
    });
    const sousTheme =
      select(doc, "SousThemePere/text()")[0] &&
      select(doc, "SousThemePere/text()")[0].data;
    const sousDossiers = select(
      doc,
      "/Publication/DossierPere/SousDossier/Titre/text()"
    )
      .map(d => d.data)
      .map(x => x.trim())
      .filter(Boolean);
    const fiches = select(
      doc,
      "/Publication/DossierPere/SousDossier/Fiche/text()"
    )
      .map(d => d.data)
      .map(x => x.trim())
      .filter(Boolean);
    const ariane = select(doc, "/Publication/FilDAriane/Niveau/text()")
      .map(d => d.data)
      .map(x => x.trim())
      .filter(Boolean);
    const text =
      select(doc, "/Publication/Texte") &&
      select(doc, "/Publication/Texte")[0] &&
      select(doc, "/Publication/Texte")[0].textContent.trim();
    const html =
      select(doc, "/Publication/Texte") &&
      select(doc, "/Publication/Texte")[0] &&
      xmlToHtml(select(doc, "/Publication/Texte")[0].toString());
    const intro =
      select(doc, "Introduction/Texte")[0] &&
      select(doc, "Introduction/Texte")[0].textContent.trim();
    const situations =
      select(doc, "/Publication/ListeSituations") &&
      select(doc, "/Publication/ListeSituations")[0] &&
      select(doc, "/Publication/ListeSituations")[0].textContent.trim();
    return {
      theme: "travail",
      intro,
      situations,
      sousTheme,
      ariane,
      fiches,
      html,
      text,
      sousDossiers,
      url,
      title,
      tags,
      refs
    };
  }
};

const files = fs.readdirSync(XMLS_PATH);

const fiches = files
  .filter(f => f.substring(0, 1) === "F")
  .map(f => parseFiche(`${XMLS_PATH}/${f}`))
  .filter(Boolean);

console.log(JSON.stringify(fiches, null, 2));
