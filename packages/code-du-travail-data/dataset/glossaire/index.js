const GoogleSpreadsheets = require("google-spreadsheets");
const { promisify } = require("util");
const getCells = promisify(GoogleSpreadsheets.cells);

const SPREADSHEET_KEY = "1WrmotMiu4kBxRTKW47Q3CzNjxc0GycfAilSHcXH_hfA";

const columns = {
  term: 1,
  abbrev: 2,
  synonym: 3,
  definition: 4,
  reference: 5
};

function transformRow(row) {
  return Object.entries(columns).reduce(
    (state, [key, colIndex]) => ({
      ...state,
      [key]: Object.hasOwnProperty.call(row, colIndex)
        ? row[colIndex].value
        : undefined
    }),
    {}
  );
}

async function getGlossaire() {
  const { cells } = await getCells({
    key: SPREADSHEET_KEY,
    worksheet: 2
  });
  return Object.values(cells)
    .slice(1)
    .filter(row => Object.hasOwnProperty.call(row, "1"))
    .map(transformRow);
}

module.exports = getGlossaire;

async function main() {
  try {
    const glossaire = await getGlossaire();
    console.log(JSON.stringify(glossaire, 0, 2));
    console.error(`${glossaire.length} termes extraits`);
  } catch (err) {
    console.error(err);
  }
}

if (module === require.main) {
  main();
}
