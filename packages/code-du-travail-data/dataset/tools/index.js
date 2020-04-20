const { SOURCES, getRouteBySource } = require("@cdt/sources");
const allThemes = require("@socialgouv/datafiller-data/data/themes.json");
const { createThemer } = require("../../indexing/breadcrumbs");
const tools = require("./internals.json");

const getBreadcrumbs = createThemer(allThemes);

const toolsWithBreadCrumbs = tools.map((tool) => {
  return {
    ...tool,
    breadcrumbs: getBreadcrumbs(
      `/${getRouteBySource(SOURCES.TOOLS)}/${tool.slug}`
    ),
  };
});

module.exports = toolsWithBreadCrumbs;
