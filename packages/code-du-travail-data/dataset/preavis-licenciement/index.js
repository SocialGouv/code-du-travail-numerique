const { promisify } = require("util");
const GoogleSpreadsheets = require("google-spreadsheets");
const conventionsColl = require("@socialgouv/kali-data/data/index.json");

const SPREADSHEET_KEY = "1zd_hShEui8BHK0349GpDUZRkCcQ9syIZ9gSrkYKRdo0";
const SPREADSHEET_TAB = 5;

const getCells = promisify(GoogleSpreadsheets.cells);

const conventionsById = conventionsColl.reduce((state, cc) => ({
  ...state,
  [cc.num]: cc.titre
}));

const csvColumns = {
  type: 1,
  idcc: 2,
  answer: 19,
  answer_: 19,
  ref: 22,
  refUrl: 23
};

const criteriaIndex = [
  5, // catégorie
  7, // durée du tranvail
  8, // durée de préavis
  9, // type de rupture
  13, // groupe
  15, // ancienneté
  16, // coefficient
  17, // échelon
  18 // période d'essai
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
    worksheet: SPREADSHEET_TAB
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
  // we are only intereeted in type: préavis de licenciement
  if (row[csvColumns.type].value !== "préavis de licenciement") {
    return null;
  }
  for (const [key, index] of Object.entries(csvColumns)) {
    data[key] = (row[index] && row[index].value) || null;
  }
  //Format idcc
  data.idcc = ("0000" + data.idcc).slice(-4);

  for (const index of criteriaIndex) {
    if (row[index]) {
      const key = headers[index].trim();
      data.criteria[key] = row[index].value || undefined;
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
