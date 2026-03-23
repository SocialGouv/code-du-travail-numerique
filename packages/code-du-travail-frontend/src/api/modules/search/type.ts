import type { GlossarySearchResult } from "../../../modules/glossaire/types";
import type { PresearchClass, SearchResult } from "./service/types";

export type SearchResultResponse = {
  results: SearchResult[];
  class: PresearchClass;
  definition?: GlossarySearchResult;
};
