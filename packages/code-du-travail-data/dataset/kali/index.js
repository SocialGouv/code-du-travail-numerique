const fetchConventionsList = require("./fetchConventionsList");
const fetchConvention = require("./fetchConvention");
const writeDataAsJsonFile = require("./writeDataAsJsonFile");
const serialExec = require("promise-serial-exec");

const fetchAndExportConventionByIdcc = async idcc => {
  console.log(`fetching and exporting convention ${idcc}`);
  const convention = await fetchConvention(idcc);
  writeDataAsJsonFile(convention, `convention_${idcc}.json`);
};

const main = async ({ exportAll }) => {
  const conventions = await fetchConventionsList();
  await writeDataAsJsonFile(conventions, "conventions.json");
  if (!exportAll) return;

  await serialExec(
    conventions.map(simpleConvention => () =>
      fetchAndExportConventionByIdcc(simpleConvention.num)
    )
  );
};

if (module === require.main) {
  const exportAll = process.argv.indexOf("--all") > -1;
  main({ exportAll });
}
