const cstojson = require("csvtojson");
const slugify = require("slugify");

/**
 *
 * flattenThemes take a csv file of themes
 * [{
 *    niveau1: '1 | Recrutement et contrat de travail',
 *    niveau2: '9 | Recrutement',
 *    niveau3: '50 | Méthodes de recrutement',
 *    niveau4: ''
 * }, {
 *    niveau1: '1 | Recrutement et contrat de travail',
 *    niveau2: '9 | Recrutement',
 *    niveau3: '51 | Curriculum vitae (CV)',
 *    niveau4: ''
 * }]
 *
 *
 *  and will return a flat list of theme
 * [{
 *  id: 1,
 *  label: "Recrutement et contrat de travail",
 *  slug: "1-recrutement-et-contrat-de-travail"
 * },
 * {
 *  id: 9,
 *  label: "Recrutement",
 *  slug: "9-recrutement"
 *  parent: "1-recrutement-et-contrat-de-travail"
 * },
 * {
 *  id: 50,
 *  label: "Méthodes de recrutement'",
 *  slug: "50-methodes-de-recrutement'"
 *  parent: "9-recrutement"
 * },
  * {
 *  id: 51,
 *  label: "Curriculum vitae (CV)",
 *  slug: "51-curriculum-vitae-cv"
 *  parent: "9-recrutement"
 * }]
 */
const iconsMap = {
  1: "hiring-1.svg",
  2: "coins.svg",
  3: "time.svg",
  4: "certificate.svg",
  5: "shield.svg",
  6: "handshake.svg",
  7: "file-3.svg",
  8: "book_web.svg",
}
function flattenThemes(data) {
  const allThemes = data.reduce((state, row) => {
    const themes = Object.entries(row)
      .filter(([_, value]) => value !== "")
      .sort(([key1], [key2]) => key1.localeCompare(key2))
      .map(([_, value]) => value)
      .map((value, index, items) => {
        const [_, id, theme] = value.match(/^([0-9]+) \| ?(.+)/);
        let parentSlug = null;
        if (index > 0) {
          parentSlug = slugify(items[index - 1].replace('|', '-').toLowerCase(), {
            remove: /[()']/
          });
        }
        return {
          id: parseInt(id, 10),
          label: theme,
          slug: slugify(value.replace('|', '-').toLowerCase(), { remove: /[()']/ }),
          parent: parentSlug,
          icon: iconsMap[parseInt(id, 10)] || undefined
        };
      });

    const newThemes = themes.filter(
      theme => !state.some(item => item.id === theme.id)
    );
    return state.concat(newThemes);
  }, []);
  return allThemes.sort((a, b) => a.id - b.id);
}

async function main() {
  const data = await cstojson().fromFile("themes-cdtn.csv");
  const themes = flattenThemes(data);
  console.log(JSON.stringify(themes, null, 2));
  console.error(`${themes.length} themes trouvés`);
}

/**
 * Extract a slug from a chained theme breadcrumbs
 * input : 46 - Conflits au travail et contrôle de la réglementation - Sanctions disciplinaires
 * output : 46-sanctions-disciplinaires
 * @param {String} str complete str
 * @returns {String} a slugify version of the id+theme
 */

function extractSlug(str) {
  const [_, id, label] = str.match(/([0-9]+) \| (.+)$/, "");
  const [theme] = label.split("|").map(t => t.trim()).reverse();
  return slugify(`${id} - ${theme}`.toLowerCase(), { remove: /[()']/ });
}

module.exports = {
  extractSlug,
}

if (module === require.main) {
  main();
}
