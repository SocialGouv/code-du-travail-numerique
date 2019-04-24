const { promisify } = require("util");
const GoogleSpreadsheets = require("google-spreadsheets");

const spreadsheetKey = "1CVRrR45QIlSzVeO_9V1TUXSqI1U9Bt5_KYWlcH9K2jI";
const getCells = promisify(GoogleSpreadsheets.cells);

/**
 * This module export a function that will load a google speardsheet
 * which contains a mapping between content classification of service public content
 * and the cdtn classification
*/


/**
 * Transform a dash separated string of themes into a an array
 * @param {string} theme
 */
const unRollTheme = theme =>
  theme
    .replace(/[0-9]+ -/, "")
    .split("-")
    .map(theme => theme.trim());


const transformTheme = row => {
  return {
    id: row["1"].value,
    theme: row["11"] ? unRollTheme(row["11"].value) : [],
  };
};

async function getThemeMapping() {
  const { cells } = await getCells({
    key: spreadsheetKey,
    worksheet: 4 // matching themes-SP
  });

  return Object.values(cells)
    .slice(2) // remove headers rows
    .map(transformTheme)
    .reduce((state, item) => ({ ...state, [item.id]: item.theme }), {});
}

async function main() {
  const themes = await getThemeMapping();
  console.log(themes);
}

if (module === require.main) {
  try {
    main();
  } catch (e) {
    console.error(e);
  }
}
module.exports = getThemeMapping;
