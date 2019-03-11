const fs = require("fs");
const path = require("path");
const pLimit = require("p-limit");

const fetchAll = require("./fetch");
const elastic = require("./elastic");

const limit = pLimit(5);

// convert datafiller references to valid ES references
const toEsResults = results =>
  Promise.all(
    results.map(result =>
      limit(async () => ({
        ...result,
        refs: await elastic.getReferences(result.refs)
      }))
    )
  );

const main = async () => {
  const data = await fetchAll().then(toEsResults);
  if (process.argv.length === 3) {
    const outPath = path.join(__dirname, process.argv[2]);
    fs.writeFile(outPath, JSON.stringify(data, null, 2), () => {
      console.log(`\nwrote ${data.length} entries to ${outPath}\n`);
    });
  } else {
    console.log(JSON.stringify(data, null, 2));
  }
};

if (require.main === module) {
  main();
}
