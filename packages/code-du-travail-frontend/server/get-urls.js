const themes = require("@cdt/data...themes/themes.json");
const kali = require("@cdt/data...kali/kali.json");

async function getUrls() {
  return Promise.resolve(
    [].concat(
      themes.map(({ slug }) => ({ url: `/${slug}` })),
      kali.map(({ slug }) => ({ url: `/${slug}` }))
    )
  );
}
module.exports = getUrls;
