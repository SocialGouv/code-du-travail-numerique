const themes = require("@cdt/data...datafiller/themes.data.json");

async function getUrls() {
  return Promise.resolve(
    [].concat(themes.map(({ slug }) => ({ url: `/${slug}` })))
  );
}
module.exports = getUrls;
