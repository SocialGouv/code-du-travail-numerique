var fetch = require("node-fetch");
const cheerio = require("cheerio");
const ora = require("ora");
const { batchPromise } = require("./utils");
const kali = require("./kali.json");
const apeByIdcc = require("./apeByIdcc.json");

function getPage(item) {
  return fetch(item.url)
    .then(response => response.text())
    .then(result => cheerio.load(result))
    .then($ => {
      const idccLabel = $(".contexte .soustitre");
      const [, idcc] = idccLabel.text().split(" ");
      if (!idcc) {
        return {
          ...item,
          ape: [],
          idcc: ""
        };
      }
      const idccApeKey = ("0000" + idcc).slice(-5);
      return {
        ...item,
        ape: apeByIdcc[idccApeKey],
        idcc: idcc
      };
    });
}

const updateSpinner = spinner => ({ progress, total }) => {
  spinner.text = `fetching ${progress}/${total}`;
};

async function parseAll(list) {
  const spinner = ora(`fetching 0/${list.length}`).start();
  const progress = updateSpinner(spinner);
  try {
    results = await batchPromise(list, 10, getPage, progress);
    spinner.stop().clear();
    console.log(JSON.stringify(results, null, 2));
  } catch (error) {
    spinner.stop().clear();
    console.error(error);
  }
}

if (module === require.main) {
  parseAll(kali);
}
