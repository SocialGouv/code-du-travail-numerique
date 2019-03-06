const fs = require("fs");
const select = require("xpath.js");
const dom = require("xmldom").DOMParser;
const xmlToHtml = require("./xmlToHtml");
const uniqBy = require("lodash.uniqby");
const ficheFilter = require("./ficheFilter");

/*
extrait les données avec les fichiers XML de :
 - dans ./vosdroits-professionnels : https://www.data.gouv.fr/fr/datasets/service-public-fr-guide-vos-droits-et-demarches-professionnels-entreprises/
 - dans ./vosdroits-particuliers : https://www.data.gouv.fr/fr/datasets/service-public-fr-guide-vos-droits-et-demarches-particuliers/
*/

const read = path => fs.readFileSync(path).toString();

const getFicheText = path => read(path);

const parseXml = text => new dom().parseFromString(text);

const toJson = doc => {
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

  const [, dateRaw] = select(doc, "dc:date/text()")[0].data.match(
    /modified ([0-9\-]+)$/
  );
  const [year, month, day] = dateRaw.split("-");
  const date = `${day}/${month}/${year}`;

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
    select(doc, "/Publication") &&
    select(doc, "/Publication")[0] &&
    xmlToHtml(select(doc, "/Publication")[0].toString());
  const situations =
    select(doc, "/Publication/ListeSituations") &&
    select(doc, "/Publication/ListeSituations")[0] &&
    select(doc, "/Publication/ListeSituations")[0].textContent.trim();
  const intro =
    select(doc, "Introduction/Texte")[0] &&
    select(doc, "Introduction/Texte")[0].textContent.trim();

  return {
    theme: "travail",
    intro,
    date,
    sousTheme,
    ariane,
    fiches,
    html,
    text: text || situations,
    sousDossiers,
    url,
    title,
    tags,
    refs
  };
};

const getFiches = path =>
  fs
    .readdirSync(path)
    .filter(f => f.startsWith("F"))
    .map(f => getFicheText(`${path}/${f}`))
    .map(parseXml)
    .filter(ficheFilter)
    .map(toJson);

const fiches = [
  ...getFiches("./data/vosdroits-particuliers"),
  ...getFiches("./data/vosdroits-professionnels")
];

if (module === require.main) {
  console.log(JSON.stringify(uniqBy(fiches, "url"), null, 2));
}
