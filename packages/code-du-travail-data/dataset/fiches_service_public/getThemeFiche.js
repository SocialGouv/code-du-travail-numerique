const { SOURCES, getRouteBySource } = require("@cdt/sources");

const themes = require("../datafiller/themes.data.json");
const slugify = require("../../slugify");

function getThemeFiche(fiche) {
  const ficheUrl = `/fiche-service-public/${slugify(fiche.title)}`;
  const theme = themes.find(theme =>
    theme.refs.map(r => r.url).includes(ficheUrl)
  );
  const breadcrumbs = [];
  if (theme) {
    if (theme.breadcrumbs) {
      breadcrumbs.push(...theme.breadcrumbs);
    }
    breadcrumbs.push({
      label: theme.title,
      slug: `/${getRouteBySource(SOURCES.THEMES)}/${theme.slug}`
    });
  }

  return { breadcrumbs };
}

module.exports = { getThemeFiche };
