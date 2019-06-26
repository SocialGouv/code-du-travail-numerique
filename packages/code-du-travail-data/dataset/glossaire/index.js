const GoogleSpreadsheets = require("google-spreadsheets");
const { promisify } = require("util");
const getCells = promisify(GoogleSpreadsheets.cells);

const SPREADSHEET_KEY = "1WrmotMiu4kBxRTKW47Q3CzNjxc0GycfAilSHcXH_hfA";

const columns = {
  term: 2,
  abbrev: 3,
  synonym: 4,
  definition: 6,
  definition_cdtn: 7
};

function transformRow(row) {
  return Object.entries(columns).reduce(
    (state, [key, colIndex]) => ({
      ...state,
      [key]: row.hasOwnProperty(colIndex) ? row[colIndex].value : undefined
    }),
    {}
  );
}

async function getGlossaire() {
  const { cells } = await getCells({
    key: SPREADSHEET_KEY,
    worksheet: 1
  });
  return Object.values(cells)
    .slice(1)
    .filter(row => row.hasOwnProperty("1"))
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
