const { promisify } = require("util");
const GoogleSpreadsheets = require("google-spreadsheets");

const { extractSlug } = require("@cdt/data...themes")
const { getBreadcrumbs } = require("@cdt/data...themes/query");

const spreadsheetKey = "1CVRrR45QIlSzVeO_9V1TUXSqI1U9Bt5_KYWlcH9K2jI";
const getCells = promisify(GoogleSpreadsheets.cells);

/**
 * This module export a function that will load a google speardsheet
 * which contains a mapping between content classification of ministere-travail content
 * and the cdtn classification
 */

/**
 * Transform a dash separated string a breadcrumbs of themes
 * input: 46 - Conflits au travail et contrôle de la réglementation - Sanctions disciplinaires
 * output:  [{sous-theme1}, {sous-theme2},...]
 *
 * @param {string} themeFlat
 * @returns {Object}
 */
const unRollTheme = themeFlat => {
  const slug = extractSlug(themeFlat);
  return getBreadcrumbs(slug);
};

const transformRow = row => {
  const [_, slug] = row["1"].value.match(/\/([\w-]+)\/?$/);
  return {
    slug,
    theme: row['9'] ? unRollTheme(row["9"].value) : []
  };
};

async function getThemeMapping() {
  const { cells } = await getCells({
    key: spreadsheetKey,
    worksheet: 2 // matching fiche MT
  });

  return Object.values(cells)
    .slice(1) // remove header
    .map(transformRow)
    .reduce((state, item) => {
      if (state[item.slug]) {
        console.error("slug existant", item.slug, state[item.slug], item.theme)
      }
      state[item.slug] = item.theme
      return state
    }, {});
}

module.exports = getThemeMapping;

async function main() {
  const themesMap = await getThemeMapping();
  console.log(themesMap);
  console.log("nb slug", Object.keys(themesMap).length)
}

if (module === require.main) {
  main();
}
