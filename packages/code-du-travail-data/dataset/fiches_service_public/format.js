
const findChildrenByName = (element, name) => element.children.find(el => el.name === name);
const getText = element => element.children.find(el => el.type === "text").value

const getTextDeep = element => null;


const format = fiche => {

  if (!fiche.children[0].name === "Publication") return null;

  const publication = fiche.children[0];
  const { ID: id } = publication.attr;

  const title = getText(findChildrenByName(publication, "dc:title"));
  const dateRaw = getText(findChildrenByName(publication, "dc:date"));
  const audience = getText(findChildrenByName(publication, "Audience"));

  // tags
  // Retirer ['Accueil particuliers', 'Travail']
  const ariane = findChildrenByName(publication, "FilDAriane");
  const sousThemePere = findChildrenByName(publication, "SousThemePere");
  const dossierPere = findChildrenByName(publication, "DossierPere");
  
  // text
  const intro = findChildrenByName(publication, "Introduction");
  const texte = findChildrenByName(publication, "Texte");
  const ListeSituations = findChildrenByName(publication, "ListeSituations");
/*

  TAGS_IRRELEVANT = ['Accueil particuliers', 'Travail']

  text = item.get('intro', '') + item.get('text', '') + item.get('situations', '')
  if not text:
      logger.warning('No text found for title: %s\n%s', item['title'], item['url'])

  # Replace new lines by spaces.
  text = ' '.join(text.split('\n'))
  # Replace multiple spaces by a single space.
  text = ' '.join(text.split())

  # Merge everything that look like a tag, remove duplicate values.
  tags = list(set(
      [item['sousTheme']] if 'sousTheme' in item else []
      + item['tags']
      + [item for item in item['ariane'] if item not in TAGS_IRRELEVANT]
      + item['fiches']
      + item['sousDossiers']
  ))
*/

  const [year, month, day] = dateRaw.split(" ")[1].split("-");

  const date = `${day}/${month}/${year}`;

  const urlSlug = audience === "Particuliers" ? "particuliers" : "professionnels-entreprises";
  const url = `https://www.service-public.fr/${urlSlug}/vosdroits/${id}`;

 /*
  // Get text
  const intro = 
  */


  if (id === "F2883") {
    console.log(
      JSON.stringify({
        date,
        id,
        raw: { ...fiche },
        // tags,
        // text,
        title,
        url
      }, null, 2)
    );
  }

  return {
    date,
    id,
    raw: { ...fiche },
    // tags,
    // text,
    title,
    url
  }
}

module.exports = format;
