const fs = require("fs");
const { SOURCES, getRouteBySource } = require("@cdt/sources");
const themes = require("../datafiller/themes.data.json");

function updateTheme(fiches) {
  fiches.forEach(fiche => {
    const ficheUrl = `/${getRouteBySource(SOURCES.SHEET_MT)}/${fiche.slug}`;
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

let fiches = require("./fiches-mt.json");
updateTheme(fiches);
fs.writeFileSync("./fiches-mt.json", JSON.stringify(fiches, null, 2));
fiches = require("./fiches-mt-split.json");
updateTheme(fiches);
fs.writeFileSync("./fiches-mt-split.json", JSON.stringify(fiches, null, 2));
