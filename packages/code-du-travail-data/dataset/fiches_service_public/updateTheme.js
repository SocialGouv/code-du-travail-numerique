const getThemeMapping = require("./cdtnThemeSP.js");

async function updateTheme(fiches) {
  const themeMapping = await getThemeMapping();
  fiches.forEach(fiche => {
    fiche.themeCdtn = themeMapping[fiche.id] || [];
  });
}

async function main() {
  const fiches = require("./fiches-sp-travail.json");
  await updateTheme(fiches);
  console.log(JSON.stringify(fiches, null, 2));
}

if (module === require.main) {
  main();
}

module.exports = updateTheme;
