const fs = require("fs");
const path = require("path");
const axios = require("axios");
const csv = require("csvtojson");
const json2csv = require("json2csv");
const ora = require("ora");
const pLimit = require("p-limit");

const limit = pLimit(10);

const {
  computeLineScore,
  printResultsAbstract,
  printResultsDetails
} = require("../lib");

const TestCasesFile = "results.csv";
const endpoint = "http://localhost:1337/api/v1/search";

const spinner = ora("testing search").start();

function updateSpinner(progress, total) {
  spinner.text = `search done: ${progress + 1}/${total}`;
}

async function processRequest(data, nbItem) {
  const { Request: query } = data;
  try {
    const response = await axios.get(`${endpoint}?q=${query}&size=20`);
    updateSpinner(nbItem - limit.pendingCount, nbItem);
    return computeLineScore(data, response.data.hits.hits);
  } catch (error) {
    spinner.fail(error).start();
    return null;
  }
}

async function main() {
  const csvFile = path.join(__dirname, TestCasesFile);

  const csvData = await csv().fromFile(csvFile);
  const results = await Promise.all(
    csvData.map(data => limit(() => processRequest(data, csvData.length)))
  );
  spinner.stop().clear();
  const csvString = json2csv.parse(results, {
    fields: Object.keys(results[0])
  });
  // fs.writeFileSync(csvFile, csvString);

  // eslint-disable-next-line no-console
  console.log(printResultsAbstract(results));
  // eslint-disable-next-line no-console
  console.log(printResultsDetails(results));
}

if (module === require.main) {
  main();
}
