const getThemeMapping = require("./cdtn-theme-mt.js");

async function updateTheme(fiches) {
  const themeMapping = await getThemeMapping();
  fiches.forEach(fiche => {
    const [, slug] = fiche.url.match(/\/([\w-]+)\/?$/);
    fiche.themeCdtn = themeMapping[slug];
    if (!fiche.themeCdtn) {
      console.error(`${fiche.title} - (${fiche.internalId}) has no theme`);
      fiche.themeCdtn = [];
    }
  });
}

async function main() {
  const fiches = require("./fiches-min-travail.json");
  await updateTheme(fiches);
  console.log(JSON.stringify(fiches, null, 2));
}

if (module === require.main) {
  main();
}

module.exports = updateTheme;
