const ora = require("ora");
const request = require("superagent");

const { batchPromise } = require("./utils");
const urls = require("./ministere-travail-liste-fiches.json");

let counter = 0;
const spinner = ora(`fetching 0/${urls.length}`);

async function parseFiche(url) {
  try {
    const response = await request.head(url);
    spinner.text = `fetching ${counter++}/${urls.length}`;
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

const count = names =>
  names.reduce((a, b) => ({ ...a, [b]: (a[b] || 0) + 1 }), {});

const duplicates = dict => Object.keys(dict).filter(a => dict[a] > 1);

async function parseFiches(urls) {
  spinner.start();
  const results = await batchPromise(urls, 6, parseFiche);

  spinner.stop().clear();
  const uniqUrls = new Set(results.filter(Boolean));
  if (results.length !== [...uniqUrls].length) {
    console.error(results.length, "-", [...uniqUrls].length);
    console.error("Duplicates are: ", duplicates(count(results)));
    process.exit(1);
  }
  console.log(JSON.stringify([...uniqUrls].sort(), null, 2));
}

if (module === require.main) {
  parseFiches(urls);
}
