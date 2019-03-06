const fs = require("fs");
const path = require("path");
const axios = require("axios");
const csv = require("csvtojson");
const json2csv = require("json2csv");

const { promisify } = require("util");

const ora = require("ora");
const pLimit = require("p-limit");
const GoogleSpreadsheets = require("google-spreadsheets");

const {
  computeLineScore,
  printResultsAbstract,
  printResultsDetails
} = require("../lib");

const spreadsheetKey = "1o6hf-Tm3rb5qMXRBId3aGuSt9tNalvxMsOkrbkHSbB4";
const endpoint = "http://localhost:1337/api/v1/search";

const limit = pLimit(10);

const spinner = ora("testing search").start();

const getCells = promisify(GoogleSpreadsheets.cells);

const getCellValue = cell => cell.value;

function updateSpinner(progress, total) {
  spinner.text = `search done: ${progress + 1}/${total}`;
}

async function getTestCases() {
  const { cells } = await getCells({
    key: spreadsheetKey,
    worksheet: 1,
    range: "A1:E100"
  });

  return Object.values(cells)
    .slice(1) // remove header
    .map(row => Object.values(row).map(getCellValue));
}

async function processRequest(testCase, csvResults, nbItem) {
  const [query, ...expectedResults] = testCase;
  const previousResults = csvResults.find(item => item.query === query);
  try {
    const response = await axios.get(`${endpoint}?q=${query}&size=20`);
    updateSpinner(nbItem - (limit.pendingCount + 1), nbItem);
    return computeLineScore({
      query,
      expectedResults,
      previousResults,
      hits: response.data.hits.hits
    });
  } catch (error) {
    spinner.fail(error).start();
    return null;
  }
}
// eslint-disable-next-line no-console
async function main({ reporter = console.log } = {}) {
  const csvFile = path.join(__dirname, "testResults.csv");
  const csvResults = await csv().fromFile(csvFile);
  const testCases = await getTestCases();

  const results = await Promise.all(
    testCases.map(testCase =>
      limit(() => processRequest(testCase, csvResults, testCases.length))
    )
  );
  spinner.stop().clear();
  const csvString = json2csv.parse(results, {
    fields: ["query", "score", "prevScore", "diffScore", "found"]
  });
  fs.writeFileSync(csvFile, csvString);

  reporter(printResultsAbstract(results));
  reporter(printResultsDetails(results));
}

if (module === require.main) {
  main();
}
