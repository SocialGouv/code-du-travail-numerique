const axios = require("axios");
const csv = require("csvtojson");
const json2csv = require("json2csv");

const ora = require("ora");
const { batchPromise, range } = require("@cdt/data...kali/utils");

const TestCasesFile = "./testcases.csv";
const endpoint = "http://localhost:1337/api/v1/search";

const spinner = ora("testing search").start();

function updateSpinner(progress, total) {
  spinner.text = `search done: ${progress + 1}/${total}`;
}

function processResult(line, hits) {
  const resultsUrl = hits.map(
    result =>
      result._source.url || `${result._source.source}/${result._source.slug}`
  );
  const expectedValues = range(1, 6).map(i => line[`Expected_${i}`]);

  const resultsRank = expectedValues.reduce((state, url, i) => {
    const position = resultsUrl.indexOf(url);
    state[`Actual_Rank${i + 1}`] = position > -1 ? position + 1 : "";
    return state;
  }, {});

  const foundResults = Object.values(resultsRank).filter(Boolean);
  const foundExpected = expectedValues.filter(Boolean);
  const countResults = `${foundResults.length}/${foundExpected.length}`;

  const urlsObj = resultsUrl.reduce((state, url, index) => {
    state[`url_${index}`] = url;
    return state;
  }, {});

  return {
    ...line,
    countResults,
    ...resultsRank,
    ...urlsObj
  };
}

async function processRequest(data, index, list) {
  const { Request: query } = data;
  try {
    const response = await axios.get(`${endpoint}?q=${query}&size=20`);
    updateSpinner(index, list.length);
    return processResult(data, response.data.hits.hits);
  } catch (error) {
    spinner.fail(error).start();
    return null;
  }
}

async function main() {
  const data = await csv().fromFile(TestCasesFile);
  const results = await batchPromise(data, 10, processRequest);
  spinner.stop().clear();
  const csvString = json2csv.parse(results, {
    fields: Object.keys(results[0])
  });

  // eslint-disable-next-line no-console
  console.log(csvString);
}

if (module === require.main) {
  main();
}
