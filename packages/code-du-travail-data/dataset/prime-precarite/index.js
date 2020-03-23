const { promisify } = require("util");
const GoogleSpreadsheets = require("google-spreadsheets");

const SPREADSHEET_KEY = "1SCFHUDjsWWRdVhYP5cVz2Q3AqPa-ubOYsEc3C3kRKOA";
const SPREADSHEET_TAB = 1;

const getCells = promisify(GoogleSpreadsheets.cells);

const csvColumns = {
  contractType: 2,
  idcc: 3,
  hasConventionalProvision: 5,
  allowBonus: 10,
  endMessage: 11,
  rate: 12,
  bonusLabel: 14,
  refLabel: 16,
  refUrl: 17,
};

const criteriaIndex = {
  6: "cddType",
  7: "hasCdiProposal",
  8: "hasCdiRenewal",
  9: "hasEquivalentCdiRenewal",
};

function rowWithIdcc(row) {
  return row[csvColumns.idcc] && row[csvColumns.idcc].value.length > 0;
}
async function getData() {
  const { cells } = await getCells({
    key: SPREADSHEET_KEY,
    worksheet: SPREADSHEET_TAB,
  });

  return Object.values(cells)
    .slice(1)
    .filter(rowWithIdcc)
    .map(transformRow)
    .filter(Boolean);
}

function transformRow(row) {
  try {
    const data = { criteria: {} };
    for (const [key, index] of Object.entries(csvColumns)) {
      data[key] = (row[index] && row[index].value.trim()) || null;
      if (data[key] === "oui" || data[key] === "non") {
        data[key] = data[key] === "oui";
      }
    }
    // @lionelb: force idcc to match kali-data number format
    data.idcc = parseInt(data.idcc, 10);
    for (const [index, key] of Object.entries(criteriaIndex)) {
      if (row[index]) {
        data.criteria[key] = row[index].value.trim() || null;
      }
    }
    return data;
  } catch (error) {
    console.error(row);
    console.error(error);
    return null;
  }
}

async function main() {
  const data = await getData();
  console.log(JSON.stringify(data.filter(Boolean), 0, 2));
}

if (module === require.main) {
  main().catch(error => {
    console.error(error);
  });
}
