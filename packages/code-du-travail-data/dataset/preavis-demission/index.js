const { promisify } = require("util");
const GoogleSpreadsheets = require("google-spreadsheets");
const conventionsColl = require("@socialgouv/kali-data/data/index.json");

const SPREADSHEET_KEY = "1zd_hShEui8BHK0349GpDUZRkCcQ9syIZ9gSrkYKRdo0";
const getCells = promisify(GoogleSpreadsheets.cells);

const conventionsById = conventionsColl.reduce((state, cc) => ({
  ...state,
  [cc.num]: cc.titre
}));

const csvColumns = {
  type: 1,
  answer: 13,
  ref: 14,
  refUrl: 15
};

const criteriaIndex = [
  2, // idcc
  4, // catégorie
  5, // durée du tranvail
  6, // type de rupture
  7, // durée de préavis
  8, // groupe
  9, // ancienneté
  10, // coefficient
  11, // échelon
  12 // période d'essai
];

function getHeaders(row) {
  const headers = {};
  for (const [col, item] of Object.entries(row)) {
    headers[col] = item.value.trim().toLowerCase();
  }
  return headers;
}

async function getData() {
  const { cells } = await getCells({
    key: SPREADSHEET_KEY,
    worksheet: 2
  });

  const [headersRow] = Object.values(cells).slice(0, 1);

  const headers = getHeaders(headersRow);
  const createRowWithHeaders = headers => row => transformRow(headers, row);
  const rowTransformer = createRowWithHeaders(headers);
  return Object.values(cells)
    .slice(1)
    .map(rowTransformer);
}

function transformRow(headers, row) {
  const data = { criteria: {} };
  // we are only intereeted in type: préavis de démission
  if (row[csvColumns.type].value !== "préavis de démission") {
    return null;
  }
  for (const [key, index] of Object.entries(csvColumns)) {
    data[key] = (row[index] && row[index].value) || null;
  }

  for (const index of criteriaIndex) {
    if (row[index]) {
      const key = headers[index].trim();

      // handling branche criterion
      if (key === "idcc") {
        // format the idcc with
        const id = ("0000" + row[index].value).slice(-4);
        const label = conventionsById[row[index].value] || "Je ne sais pas";
        data.criteria["branche"] = { id, label };
      } else {
        data.criteria[key] = row[index].value || undefined;
      }
    }
  }

  return data;
}

async function main() {
  const data = await getData();
  console.log(JSON.stringify(data.filter(Boolean), 0, 2));
}

if (module === require.main) {
  main();
}
