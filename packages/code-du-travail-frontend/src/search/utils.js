import { SOURCES } from "@cdt/sources";

import ReponseIcon from "../icons/ReponseIcon";
import ArticleIcon from "../icons/ArticleIcon";
import ModeleCourrierIcon from "../icons/ModeleCourrierIcon";
import DossierIcon from "../icons/DossierIcon";
import OutilIcon from "../icons/OutilsIcon";

export const getSourceIcon = (source = "") => {
  switch (source) {
    case SOURCES.FAQ:
    case SOURCES.SHEET_SP:
    case SOURCES.SHEET_MT:
      return ReponseIcon;
    case SOURCES.CDT:
    case SOURCES.CCN:
      return ArticleIcon;
    case SOURCES.LETTERS:
      return ModeleCourrierIcon;
    case SOURCES.TOOLS:
      return OutilIcon;
    case SOURCES.THEMES:
      return DossierIcon;
    default:
      return null;
  }
};

export const groupBySource = items =>
  items.reduce((accumulator, item) => {
    const itemSource = item._source.source;
    item._source.highlight = item.highlight;
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
      item._source.highlight = item.highlight;
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
