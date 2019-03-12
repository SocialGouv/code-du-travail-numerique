const getChildren = (element, name) => element.$.find(el => el.name === name);

// Beware, this one is recursive
function getText(element = { text: "" }) {
  if (element.type === "text") {
    return element.$.trim();
  }
  if (element.$) {
    return element.$
      .map((child) => getText(child))
      .join(" ");
  }
  return "";
}

function  getTags(element = { text: ""}) {
  if (element.type === "text") {
    return [element.$.trim()];
  }
  if (element.$) {
    return element.$
      .map((child) => getTags(child))
      .reduce((acc, val) => acc.concat(val), []); // flatten the array
  }
  return [];
}


const format = fiche => {

  if (!fiche.$[0].name === "Publication") return null;

  const publication = fiche.$[0];
  const { ID: id } = publication._;

  const title = getText(getChildren(publication, "dc:title"));

  const dateRaw = getText(getChildren(publication, "dc:date"));
  const [year, month, day] = dateRaw.split(" ")[1].split("-");
  const date = `${day}/${month}/${year}`;

  const audience = getText(getChildren(publication, "Audience"));
  const urlSlug = audience === "Particuliers" ? "particuliers" : "professionnels-entreprises";
  const url = `https://www.service-public.fr/${urlSlug}/vosdroits/${id}`;

  const meaninglessCrumbs = ["Accueil particuliers", "Travail"];
  const ariane = getTags(getChildren(publication, "FilDAriane"))
    .filter(crumb => !meaninglessCrumbs.includes(crumb));
  const sousThemePere =  getTags(getChildren(publication, "SousThemePere"));
  const dossierPere = getTags(getChildren(publication, "DossierPere"));
  const tags = Array.from(new Set(ariane.concat(sousThemePere, dossierPere)));

  const intro = getText(getChildren(publication, "Introduction"));
  const texte = getText(getChildren(publication, "Texte"));
  const ListeSituations = getText(getChildren(publication, "ListeSituations"));
  const text = intro + " " + texte + " " + ListeSituations;

  return {
    date,
    id,
    raw: JSON.stringify(publication),
    tags,
    text,
    title,
    url
  }
}

module.exports = format;
