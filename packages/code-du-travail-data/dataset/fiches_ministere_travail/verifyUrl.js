const ora = require("ora");
const request = require("superagent");

const { batchPromise } = require("@cdt/data...kali/utils");
const urls = require("./ministere-travail-liste-fiches.json");

let count = 0;
const spinner = ora(`fetching 0/${urls.length}`);

async function parseFiche(url) {
  try {
    const response = await request.head(url);
    spinner.text = `fetching ${count++}/${urls.length}`;
    switch (response.statusCode) {
      case 200:
        return url;
      case 301:
        return response.headers.location;
      case 404:
        throw new Error("not found");
      default:
        console.log(response.statusCode);
    }
  } catch (error) {
    console.log(error);
    spinner.fail(url).start();
    return null;
  }
}

async function parseFiches(urls) {
  spinner.start();
  results = await batchPromise(urls, 20, parseFiche);
  spinner.stop().clear();
  const uniqUrls = new Set(results.filter(Boolean));
  console.log(JSON.stringify([...uniqUrls].sort(), null, 2));
  console.log(results.length, "-", [...uniqUrls].length);
}

if (module === require.main) {
  parseFiches(urls);
}
