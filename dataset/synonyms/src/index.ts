//

import synonymsJSON from "./cdtn_synonyms.json";
import thesaurusJSON from "./TESS.json";

//
export interface Thesaurus {
  term: string;
  generic: string;
  specific: string[];
  related: string;
  notes: string;
  equivalent: string;
}
export const cdtnSynonyms: string[] = synonymsJSON;
export const thesaurus: Thesaurus[] = thesaurusJSON;

//

const thesaurusSynonyms = thesaurus
  .filter(
    ({ term, equivalent }) =>
      term && equivalent && !Number.isInteger(parseInt(equivalent, 10))
  )
  .map(({ term, equivalent }) => `${term}, ${equivalent}`);

function format(str: string) {
  if (str.includes("=>")) {
    return str;
  }
  const [abbrev, ...tokens] = str
    .split(",")
    .sort((a, b) => a.length - b.length)
    .map((t) => t.trim());
  return `${[...tokens, abbrev].join(", ")} => ${abbrev}`;
}

export const synonyms = [...cdtnSynonyms, ...thesaurusSynonyms]
  .map((str) => format(str).toLowerCase())
  .sort((a, b) => a.localeCompare(b));
