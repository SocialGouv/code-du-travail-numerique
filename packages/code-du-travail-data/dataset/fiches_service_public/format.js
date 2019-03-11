const getChildren = (element, name) => element.$.find(el => el.name === name);

// Beware, this one is recursive
function getText(element = { text: "" }, joint = " ") {
  if (element.type === "text") {
    return element.$.trim();
  }
  if (element.$) {
    return element.$
      .map((child) => getText(child, joint))
      .join(joint);
  }
  return "";
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

  const joint = "#";
  const meaninglessCrumbs = ["Accueil particuliers", "Travail"];
  const ariane = getText(getChildren(publication, "FilDAriane"), joint)
    .split(joint)
    .filter(crumb => !meaninglessCrumbs.includes(crumb));
  const sousThemePere =  getText(getChildren(publication, "SousThemePere"), joint).split(joint);
  const dossierPere = getText(getChildren(publication, "DossierPere"), joint).split(joint);
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
