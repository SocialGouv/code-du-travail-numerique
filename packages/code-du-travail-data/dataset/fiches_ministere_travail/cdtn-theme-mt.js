const { promisify } = require("util");
const GoogleSpreadsheets = require("google-spreadsheets");

const spreadsheetKey = "1CVRrR45QIlSzVeO_9V1TUXSqI1U9Bt5_KYWlcH9K2jI";
const getCells = promisify(GoogleSpreadsheets.cells);

/**
 * This module export a function that will load a google speardsheet
 * which contains a mapping between content classification of ministere-travail content
 * and the cdtn classification
*/


const unRollTheme = theme => (
  theme.replace(/[0-9]+ -/, '').split('-').map(data => data.trim())
)
const transformRow = row => {
  return {
  url: row["1"].value,
  theme: row["9"] ? unRollTheme(row["9"].value) : [],
}}

async function getThemeMapping() {
  const { cells } = await getCells({
    key: spreadsheetKey,
    worksheet: 2, // matching fiche MT
  });

  return Object.values(cells)
    .slice(1) // remove header
    .map(transformRow)
    .reduce((state, item) => ({...state, [item.url]: item.theme}), {})
}

module.exports = getThemeMapping

async function main() {
  const themesMap = await getThemeMapping();
  console.log(themesMap)
}

if (module === require.main) {
  main();
}
