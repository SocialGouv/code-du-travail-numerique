const GoogleSpreadsheets = require("google-spreadsheets");
const { promisify } = require("util");

const getCells = promisify(GoogleSpreadsheets.cells);

const csvColumns = {
  type: 1,
  idcc: 2,
  typeRupture: 14,
  answer: 25,
  answer2: 26,
  answer3: 27,
  ref: 28,
  refUrl: 29,
};

const criteriaIndex = [
  4, // aéroport paris
  5, // agents payés a l'heure
  6, // période d'essai
  7, // catégorie socio-professionnelle
  8, // personnel de conduite
  9, // motif de rupture
  10, // durée du travail
  11, // temps de travail
  12, // durée de préavis
  13, // delais de prévenance
  // 14, // type de rupture
  15, // conclusion contrat
  16, // logement
  17, // niveau
  18, // classe
  19, // position
  20, // groupe
  21, // coefficient
  22, // échelon
  23, // ancienneté
  24, // age
];

export async function getQuestions({ spreadsheetKey, worksheet }) {
  const cells = await getDataFromSpreadsheet({ spreadsheetKey, worksheet });
  return cells.slice(1).map(extractQuestions).filter(Boolean);
}

export async function getSituations({ spreadsheetKey, worksheet }) {
  const cells = await getDataFromSpreadsheet({ spreadsheetKey, worksheet });
  const [headerRows, ...valueRows] = Object.values(cells);

  const headers = getRowHeaders(headerRows);
  const rowTransformerWithHeaders = (row) => transformRow(headers, row);
  return Object.values(valueRows)
    .map(rowTransformerWithHeaders)
    .filter(Boolean);
}

async function getDataFromSpreadsheet({ spreadsheetKey, worksheet }) {
  const { cells } = await getCells({
    key: spreadsheetKey,
    worksheet: worksheet,
  });

  return Object.values(cells);
}

function getRowHeaders(row) {
  const headers = {};
  for (const [col, item] of Object.entries(row)) {
    headers[col] = item.value.trim().toLowerCase();
  }
  return headers;
}

function extractQuestions(row) {
  const rowMapping = { name: 1, question: 2 };
  const data = {};
  for (const [key, index] of Object.entries(rowMapping)) {
    data[key.trim()] = (row[index] && row[index].value) || null;
  }
  return data;
}

function transformRow(headers, row) {
  const data = { criteria: {} };

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
