const Router = require("koa-router");
const API_BASE_URL = require("../v1.prefix");
const themes = require("@cdt/data...themes/themes.json");

const router = new Router({ prefix: API_BASE_URL });
const themesMap = themes.reduce(
  (state, theme) => ({ ...state, [theme.slug]: theme }),
  {}
);
/**
 * Return the root themes
 *
 * @example
 * http://localhost:1337/api/v1/themes
 *
 * @returns {Object} An object containing the matching theme .
 */
router.get("/themes", ctx => {
  ctx.body = {
    children: getChildren(null)
  };
});
/**
 * Return the theme that match a given slug
 *
 * @example
 * http://localhost:1337/api/v1/themes/:slug
 *
 * @returns {Object} An object containing the matching theme .
 */
router.get("/themes/:slug", ctx => {
  const { slug } = ctx.params;
  if (!themesMap.hasOwnProperty(slug)) {
    ctx.throw(404, `there is no theme that match ${slug}`);
  }
  const breadcrumbs = [];
  let currentTheme = themesMap[slug];
  while (currentTheme) {
    breadcrumbs.unshift(currentTheme);
    currentTheme = themesMap[currentTheme.parent];
  }
  ctx.body = {
    theme: themesMap[slug],
    children: themes.filter(theme => theme.parent === slug),
    breadcrumbs
  };
});

module.exports = router;
