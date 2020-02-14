const fs = require("fs");
const { SOURCES, getRouteBySource } = require("@cdt/sources");
const themes = require("../datafiller/themes.data.json");

function updateTheme(fiches) {
  fiches.forEach(fiche => {
    const strippedSlug = fiche.slug.split("#")[0];
    const ficheUrl = `/${getRouteBySource(SOURCES.SHEET_MT)}/${strippedSlug}`;
    const theme = themes.find(theme =>
      theme.refs.map(r => r.url.split("#")[0]).includes(ficheUrl)
    );
    fiche.breadcrumbs = [];
    if (theme) {
      if (theme.breadcrumbs) {
        fiche.breadcrumbs.push(...theme.breadcrumbs);
      }
      fiche.breadcrumbs.push({
        label: theme.title,
        path: getRouteBySource(SOURCES.THEMES),
        slug: theme.slug
      });
    }
  });
}

let fiches = require("./fiches-mt.json");
updateTheme(fiches);
fs.writeFileSync("./fiches-mt.json", JSON.stringify(fiches, null, 2));
fiches = require("./fiches-mt-split.json");
updateTheme(fiches);
fs.writeFileSync("./fiches-mt-split.json", JSON.stringify(fiches, null, 2));
