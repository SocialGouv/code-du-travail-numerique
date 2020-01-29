import GoogleSpreadsheets from "google-spreadsheets";
import { promisify } from "util";

const getCells = promisify(GoogleSpreadsheets.cells);

const csvColumns = {
  type: 1,
  idcc: 2,
  answer: 24,
  answer2: 25,
  answer3: 26,
  ref: 27,
  refUrl: 28
};

const criteriaIndex = [
  4, // aéroport paris
  5, // agents payés a l'heure
  6, // catégorie socio-professionnelle
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

export async function getQuestions({ spreadsheetKey, worksheet }) {
  const cells = await getDataFromSpreadsheet({ spreadsheetKey, worksheet });
  return cells.map(extractQuestions).filter(Boolean);
}

export async function getSituations({ spreadsheetKey, worksheet }) {
  const cells = await getDataFromSpreadsheet({ spreadsheetKey, worksheet });
  const [headerRows, ...valueRows] = Object.values(cells);

  const headers = getRowHeaders(headerRows);
  const rowTransformerWithHeaders = row => transformRow(headers, row);
  return Object.values(valueRows)
    .map(rowTransformerWithHeaders)
    .filter(Boolean);
}

async function getDataFromSpreadsheet({ spreadsheetKey, worksheet }) {
  const { cells } = await getCells({
    key: spreadsheetKey,
    worksheet: worksheet
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
