const themes = require("../datafiller/themes.data.json");

async function updateTheme(fiches) {
  fiches.forEach(fiche => {
    const ficheUrl = `/fiche-ministere-travail/${fiche.slug}`;
    const theme = themes.find(theme =>
      theme.refs.map(r => r.url.split("#")[0]).includes(ficheUrl)
    );
    fiche.themeSlug = theme && theme.slug;
    fiche.breadcrumbs =
      theme &&
      (
        (theme.breadcrumbs &&
          theme.breadcrumbs.map(node => ({
            title: node.title,
            slug: node.slug
          }))) ||
        []
      ).concat([
        {
          title: theme.title,
          slug: theme.slug
        }
      ]);
  });
}

async function main() {
  const fiches = require("./fiches-mt.json");
  updateTheme(fiches);
  console.log(JSON.stringify(fiches, null, 2));
}

if (module === require.main) {
  main();
}

module.exports = updateTheme;
