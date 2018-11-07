const fs = require("fs");
const select = require("xpath.js");
const dom = require("xmldom").DOMParser;

const xmlToHtml = require("./xmlToHtml");

/*

extrait les données avec les fichiers XML de :

 - dans ./vosdroits-professionnels : https://www.data.gouv.fr/fr/datasets/service-public-fr-guide-vos-droits-et-demarches-professionnels-entreprises/
 - dans ./vosdroits-particuliers : https://www.data.gouv.fr/fr/datasets/service-public-fr-guide-vos-droits-et-demarches-particuliers/

*/

const read = path => fs.readFileSync(path).toString();

const parseFicheFromPath = path => parseFiche(read(path));

const parseFiche = text => {
  const doc = new dom().parseFromString(text);
  const nodes = select(doc, "//Theme[@ID='N19806']");
  const audience = select(doc, "/Publication/Audience/text()")
    .map(d => d.data)
    .map(x => x.trim())
    .filter(Boolean);
  let audienceSlug = "particuliers";
  if (
    audience.indexOf("Professionnels") !== -1 &&
    audience.indexOf("Particuliers") === -1
  ) {
    audienceSlug = "professionnels-entreprises";
  }
  const id = select(doc, "/Publication/@ID")[0].value;
  if (nodes.length) {
    const url = `https://www.service-public.fr/${audienceSlug}/vosdroits/${id}`;
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
    const situationsHtml =
      select(doc, "/Publication/ListeSituations") &&
      select(doc, "/Publication/ListeSituations")[0] &&
      xmlToHtml(select(doc, "/Publication/ListeSituations")[0].toString());

    return {
      theme: "travail",
      intro,
      situations,
      situationsHtml,
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

const getFiches = path =>
  fs
    .readdirSync(path)
    .filter(f => f.substring(0, 1) === "F")
    .map(f => parseFicheFromPath(`${path}/${f}`))
    .filter(Boolean);

if (module === require.main) {
  console.log(
    JSON.stringify(
      [
        ...getFiches("./vosdroits-particuliers"),
        ...getFiches("./vosdroits-professionnels")
      ],
      null,
      2
    )
  );
}

