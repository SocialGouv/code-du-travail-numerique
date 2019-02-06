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
    if (response.statusCode === 200) {
      return url;
    } else {
      spinner.info(`${response.statusCode}-${url}`).start();
    }
  } catch (error) {
    switch (error.response.statusCode) {
      case 301:
        return error.response.headers.location;
      case 404:
        spinner.fail(url).start();
        return null;
      default:
        spinner.fail(`${error.response.statusCode}-${url}`).start();
        return null;
    }
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
