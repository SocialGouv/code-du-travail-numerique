const themes = require("./themes.json");
const memoizee = require("memoizee");

const themesMap = themes.reduce(
  (state, theme) => ({ ...state, [theme.slug]: theme }),
  {}
);

const getBreadcrumbs = slug => {
  const breadcrumbs = [];
  let currentTheme = themesMap[slug];
  while (currentTheme) {
    breadcrumbs.unshift(currentTheme);
    currentTheme = themesMap[currentTheme.parent];
  }
  return breadcrumbs;
};
const getTheme = slug => themesMap[slug];

const getChildren = slug => themes.filter(theme => theme.parent === slug);

module.exports = {
  getTheme,
  getChildren: memoizee(getChildren),
  getBreadcrumbs: memoizee(getBreadcrumbs)
};
