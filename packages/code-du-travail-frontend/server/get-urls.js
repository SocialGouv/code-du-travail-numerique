const themes = require("@cdt/data...themes/themes.json");

async function getUrls() {
  return Promise.resolve(
    [].concat(themes.map(({ slug }) => ({ url: `/${slug}` })))
  );
}
module.exports = getUrls;
