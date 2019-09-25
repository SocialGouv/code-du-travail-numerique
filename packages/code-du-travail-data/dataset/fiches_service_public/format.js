const parseReference = require("./parseReference");
const getChild = (element, name) =>
  element.children.find(el => el.name === name);

// Beware, this one is recursive
function getText(element = { text: "" }) {
  if (element.type === "text") {
    return element.text.trim();
  }
  if (element.children) {
    return element.children.map(child => getText(child)).join(" ");
  }
  return "";
}

const format = fiche => {
  if (!fiche.children[0].name === "Publication") return null;

  const publication = fiche.children[0];
  const { ID: id, type } = publication.attributes;

  // We filter out the elements we will never use nor display
  publication.children = publication.children.filter(
    child => child.name !== "OuSAdresser" && child.name !== "ServiceEnLigne"
  );

  const title = getText(getChild(publication, "dc:title"));
  const description = getText(getChild(publication, "dc:description"));
  const dateRaw = getText(getChild(publication, "dc:date"));
  const [year, month, day] = dateRaw.split(" ")[1].split("-");
  const date = `${day}/${month}/${year}`;

  const audience = getText(getChild(publication, "Audience"));
  const urlSlug =
    audience === "Particuliers" ? "particuliers" : "professionnels-entreprises";
  const url = `https://www.service-public.fr/${urlSlug}/vosdroits/${id}`;

  const intro = getText(getChild(publication, "Introduction"));
  const texte = getText(getChild(publication, "Texte"));
  const listeSituations = getText(getChild(publication, "ListeSituations"));
  const text = intro + " " + texte + " " + listeSituations;

  const references_juridiques = publication.children
    .filter(el => el.name === "Reference")
    .map(parseReference)
    .reduce((acc, val) => acc.concat(val), []) // flatten the array
    .filter(Boolean);

  return {
    date,
    id,
    raw: JSON.stringify(publication),
    text,
    type,
    references_juridiques,
    title,
    description,
    url
  };
};

module.exports = format;
