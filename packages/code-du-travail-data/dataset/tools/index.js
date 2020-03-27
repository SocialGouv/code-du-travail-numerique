const { SOURCES, getRouteBySource } = require("@cdt/sources");
const allThemes = require("@cdt/data...datafiller/themes.data.json");
const tools = require("./internals.json");

const themes = allThemes.filter((theme) =>
  theme.refs.some((ref) =>
    ref.url.startsWith(`/${getRouteBySource(SOURCES.LETTERS)}`)
  )
);

const toolsWithBreadCrumbs = tools
  .filter((tool) => tool.slug !== "simulateur-embauche")
  .map((tool) => {
    const theme = themes.find((theme) =>
      theme.refs.some((ref) => ref.url.match(new RegExp(tool.slug)))
    );
    let breadcrumbs = [];
    if (theme) {
      breadcrumbs = (theme.breadcrumbs || []).concat([
        {
          label: theme.title,
          slug: `/${getRouteBySource(SOURCES.THEMES)}/${theme.slug}`,
        },
      ]);
    }

    return {
      ...tool,
      breadcrumbs,
    };
  });

module.exports = toolsWithBreadCrumbs;
