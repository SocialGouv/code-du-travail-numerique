const path = require("path");
const dataSources = ["faq.json"];

function extractTags(filename) {
  const data = require(path.join("../", filename));
  return [
    filename,
    data
      .filter(items => items.tags)
      .reduce((state, items) => state.concat(Object.entries(items.tags)), [])
      .reduce((state, item) => {
        const [tag, values] = item;
        state.set(tag, new Set([...(state.get(tag) || [])].concat(values)));
        return state;
      }, new Map())
  ];
}

function dumpTags([filename, tags]) {
  console.log(`
### ${filename}

Tag | values
----|-------
${[...tags.entries()]
    .map(([key, tags]) => `${key} | ${[...tags].join(", ")}`)
    .join("\n")}
`);
}

const tags = dataSources.map(extractTags);
if (module === require.main) {
  tags.forEach(dumpTags);
} else {
  module.exports = tags.reduce((state, tags) => state.contat(tags), []);
}
