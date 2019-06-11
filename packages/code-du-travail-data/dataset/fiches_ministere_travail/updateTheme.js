const getThemeMapping = require("./cdtn-theme-mt.js");

async function updateTheme(fiches) {
  const themeMapping = await getThemeMapping();
  fiches.forEach(fiche => {
    const [_, slug] = fiche.url.match(/\/([\w-]+)\/?$/);
    console.error(slug);
    fiche.themeCdtn = themeMapping[slug];
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
