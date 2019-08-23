const { promisify } = require("util");
const GoogleSpreadsheets = require("google-spreadsheets");

const SPREADSHEET_KEY = "1GQrDlvAAHUE8tP6isZJ3tPjIyQb5R2sg1ufxmFzEG-E";
const getCells = promisify(GoogleSpreadsheets.cells);

const csvColumns = {
  theme: 4,
  type: 3,
  answerCc: 22,
  refCc: 23,
  refCcUrl: 24,
  answerCdt: 25,
  refCdt: 26
};

const criteriaIndex = [6, 9, 11, 13, 20];

async function getData() {
  const { cells } = await getCells({
    key: SPREADSHEET_KEY,
    worksheet: 2
  });
  // the 2 first columns are headers
  return Object.values(cells)
    .slice(2)
    .map(transformRow);
}

function transformRow(row) {
  const data = { criteria: {} };
  // we are only intereeted in type: préavis de démission
  if (
    !row[csvColumns.type] ||
    !row[csvColumns.theme] ||
    row[csvColumns.type].value !== "préavis de démission" ||
    row[csvColumns.theme].value !== "droit au préavis - durée du préavis"
  ) {
    return null;
  }
  for (const [key, index] of Object.entries(csvColumns)) {
    data[key] = (row[index] && row[index].value) || null;
  }

  for (const index of criteriaIndex) {
    if (row[index] && row[index + 1]) {
      const key = row[index].value.trim().toLowerCase();
      data.criteria[key] = row[index + 1].value;

      // handling branche criterion
      if (key === "branche") {
        const [, idcc] = data.criteria[key].match(/\(\s?([0-9]+)\)/);
        const label = data.criteria[key].replace(/\(\s?([0-9]+)\)/, "");
        // format the idcc with
        data.criteria[key] = {
          idcc: ("0000" + idcc).slice(-4),
          label: label.trim().toLowerCase()
        };
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
