const { promisify } = require("util");
const GoogleSpreadsheets = require("google-spreadsheets");

const SPREADSHEET_KEY = "1SCFHUDjsWWRdVhYP5cVz2Q3AqPa-ubOYsEc3C3kRKOA";
const getCells = promisify(GoogleSpreadsheets.cells);

const csvColumns = {
  contractType: 2,
  idcc: 5,
  hasConventionalProvision: 7,
  allowBonus: 12,
  endMessage: 13,
  rate: 14,
  bonusLabel: 16,
  refLabel: 17,
  refUrl: 18
};

const criteriaIndex = {
  8: "cddType",
  9: "hasCdiProposal",
  10: "hasCdiRenewal",
  11: "hasEquivalentCdiRenewal"
};

function rowWithIdcc(row) {
  return row[csvColumns.idcc] && row[csvColumns.idcc].value.length > 0;
}
async function getData() {
  const { cells } = await getCells({
    key: SPREADSHEET_KEY,
    worksheet: 1
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
      if (key === "idcc" && data[key]) {
        data[key] = `000${data[key]}`.slice(-4);
      }
    }
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
