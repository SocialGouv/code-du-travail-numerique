const cstojson = require("csvtojson");
const slugify = require("slugify");

/**
 *
 * flattenThemes take a csv file of themes
 * [{
 *    niveau1: '1 - Recrutement et contrat de travail',
 *    niveau2: '9 - Recrutement',
 *    niveau3: '50 - Méthodes de recrutement',
 *    niveau4: ''
 * }, {
 *    niveau1: '1 - Recrutement et contrat de travail',
 *    niveau2: '9 - Recrutement',
 *    niveau3: '51 - Curriculum vitae (CV)',
 *    niveau4: ''
 * }]
 *
 *
 *  and will return a flat list of theme
 * {
 *  id: 1,
 *  label: "Recrutement et contrat de travail",
 *  slug: "recrutement-et-contrat-de-travail"
 * },
 * {
 *  id: 9,
 *  label: "Recrutement",
 *  slug: "recrutement"
 *  parent: "recrutement-et-contrat-de-travail"
 * },
 *
 */

function flattenThemes(data) {
  const allThemes = data.reduce((state, row) => {
    const themes = Object.entries(row)
      .filter(([_, value]) => value !== "")
      .sort(([key1], [key2]) => key1.localeCompare(key2))
      .map(([_, value]) => value)
      .map((value, index, items) => {

        const [slug, id, theme] = value.match(/^([0-9]+) - ?(.+)/);
        let parentSlug = null;
        if (index > 0) {
          parentSlug = slugify(items[index - 1].toLowerCase(), { remove: /[()']/ });
        }
        return {
          id: parseInt(id, 10),
          title: theme,
          slug: slugify(slug.toLowerCase(), { remove: /[()']/ }),
          parent: parentSlug
        };
      });

    const newThemes = themes.filter( theme => !state.some(item => item.id === theme.id))
    return state.concat(newThemes);
  }, []);
  return allThemes.sort((a,b) => a.id - b.id)
}

async function main() {
  const data = await cstojson().fromFile("themes-cdtn.csv");
  const themes = flattenThemes(data);
  console.log(JSON.stringify(themes, null, 2));
  console.error(`${themes.length} themes trouvés`)
}

if (module === require.main) {
  main();
}
