const { promisify } = require("util");
const GoogleSpreadsheets = require("google-spreadsheets");

const SPREADSHEET_KEY = "1zd_hShEui8BHK0349GpDUZRkCcQ9syIZ9gSrkYKRdo0";
const SPREADSHEET_DATA_TAB = 5;
const SPREADSHEET_QUESTIONS_TAB = 7;

const getCells = promisify(GoogleSpreadsheets.cells);

const csvColumns = {
  type: 1,
  idcc: 2,
  answer: 23,
  ref: 26,
  refUrl: 27
};

const criteriaIndex = [
  4, // aéroport paris
  5, // agents payés a l'heure
  6, // catégorie
  7, // personnel de conduite
  8, // motif de rupture
  9, // durée du travail
  10, // durée de préavis
  11, // type de rupture
  12, // conclusion contrat
  13, // période d'essai
  14, // logement
  15, // niveau
  16, // classe
  17, // position
  18, // groupe
  19, // coefficient
  20, // échelon
  21, // ancienneté
  22 // age
];

function getHeaders(row) {
  const headers = {};
  for (const [col, item] of Object.entries(row)) {
    headers[col] = item.value.trim().toLowerCase();
  }
  return headers;
}
async function getQuestions() {
  const { cells } = await getCells({
    key: SPREADSHEET_KEY,
    worksheet: SPREADSHEET_QUESTIONS_TAB
  });

  return Object.values(cells)
    .slice(1)
    .map(extractQuestions)
    .filter(Boolean);
}
function extractQuestions(row) {
  const rowMapping = { name: 1, question: 2 };
  const data = {};
  for (const [key, index] of Object.entries(rowMapping)) {
    data[key] = (row[index] && row[index].value) || null;
  }
  return data;
}
async function getData() {
  const { cells } = await getCells({
    key: SPREADSHEET_KEY,
    worksheet: SPREADSHEET_DATA_TAB
  });

  const [headersRow] = Object.values(cells).slice(0, 1);
  const headers = getHeaders(headersRow);
  const createRowWithHeaders = headers => row => transformRow(headers, row);
  const rowTransformer = createRowWithHeaders(headers);
  return Object.values(cells)
    .slice(1)
    .map(rowTransformer)
    .filter(Boolean);
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
  // @lionelb: force idcc to match kali-data number format
  data.idcc = parseInt(data.idcc, 10);

  for (const index of criteriaIndex) {
    if (row[index]) {
      const key = headers[index].trim();
      data.criteria[key] = row[index].value || undefined;
    }
  }

  return data;
}

async function main() {
  const situations = await getData();
  const questions = await getQuestions();
  console.log(JSON.stringify({ questions, situations }, 0, 2));
}

if (module === require.main) {
  main().catch(error => {
    console.error(error);
  });
}
