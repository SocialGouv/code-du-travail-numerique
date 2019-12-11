const themes = require("../datafiller/themes.data.json");
const slugify = require("../../slugify");

function getThemeFiche(fiche) {
  const ficheUrl = `/fiche-service-public/${slugify(fiche.title)}`;
  const theme = themes.find(theme =>
    theme.refs.map(r => r.url).includes(ficheUrl)
  );
  return {
    themeSlug: theme && theme.slug,
    breadcrumbs:
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
      ])
  };
}

module.exports = { getThemeFiche };
