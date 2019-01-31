const { basename } = require("path");
const dataSources = ["../faq.json", "../faq-contributions.json"];

function extractTags(filepath) {
  const data = require(filepath);
  return [
    basename(filepath),
    data
      .filter(items => items.tags)
      .reduce((state, items) => state.concat(Object.entries(items.tags)), [])
      .reduce(mergeTags, new Map())
  ];
}

function mergeTags(state, [tag, values]) {
  state.set(tag, new Set([...(state.get(tag) || [])].concat(values)));
  return state;
}

function flattenTagMap(tags) {
  return tags.reduce((state, [_, tagsMap]) => {
    return [...tagsMap.entries()].reduce((state, [tag, values]) => {
      mergeTags(state, [tag, [...values]]);
      return state;
    }, state);
  }, new Map());
}

function dumpTags([filename, tagMap]) {
  return `
### ${filename}

Tag | values
----|-------
${[...tagMap.entries()]
    .map(([key, tags]) => `${key} | ${[...tags].join(", ")}`)
    .join("\n")}
`;
}

const tags = dataSources.map(extractTags);

if (module === require.main) {
  const dump = data
    .forEach(([file, tagMap]) => dumpTags(file, tagMap))
    .join("\n");
  console.log(dump);
} else {
  module.exports = {
    tags: flattenTagMap(tags),
    dumpTags,
    extractTags
  };
}
