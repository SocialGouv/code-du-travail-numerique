const fs = require("fs");
const path = require("path");
const axios = require("axios");
const csv = require("csvtojson");
const json2csv = require("json2csv");
const ora = require("ora");
const { batchPromise } = require("@cdt/data...kali/utils");

const {
  computeLineScore,
  printResultsAbstract,
  printResultsDetails
} = require("./lib");

const TestCasesFile = "results.csv";
const endpoint = "http://localhost:1337/api/v1/search";

const spinner = ora("testing search").start();

function updateSpinner(progress, total) {
  spinner.text = `search done: ${progress + 1}/${total}`;
}

async function processRequest(data, index, list) {
  const { Request: query } = data;
  try {
    const response = await axios.get(`${endpoint}?q=${query}&size=20`);
    updateSpinner(index, list.length);
    return computeLineScore(data, response.data.hits.hits);
  } catch (error) {
    spinner.fail(error).start();
    return null;
  }
}

async function main() {
  const csvFile = path.join(__dirname, TestCasesFile);

  const data = await csv().fromFile(csvFile);
  const results = await batchPromise(data, 10, processRequest);
  spinner.stop().clear();
  const csvString = json2csv.parse(results, {
    fields: Object.keys(results[0])
  });
  fs.writeFileSync(csvFile, csvString);

  // eslint-disable-next-line no-console
  console.log(printResultsAbstract(results));
  // eslint-disable-next-line no-console
  console.log(printResultsDetails(results));
}

if (module === require.main) {
  main();
}
