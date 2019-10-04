import { SOURCES } from "@cdt/sources";

export const groupBySource = items =>
  items.reduce((accumulator, item) => {
    const itemSource = item._source.source;
    if (accumulator[itemSource]) {
      accumulator[itemSource].push(item._source);
    } else {
      accumulator[itemSource] = [item._source];
    }
    return accumulator;
  }, {});

const law = [SOURCES.CDT, SOURCES.CCN];

export const groupByDisplayCategory = items =>
  items.reduce(
    (accumulator, item) => {
      const itemSource = item._source.source;
      if (itemSource === SOURCES.THEMES) {
        accumulator.themes.push(item._source);
      } else if (law.includes(itemSource)) {
        accumulator.law.push(item._source);
      } else {
        accumulator.matches.push(item._source);
      }
      return accumulator;
    },
    {
      matches: [],
      law: [],
      themes: []
    }
  );
