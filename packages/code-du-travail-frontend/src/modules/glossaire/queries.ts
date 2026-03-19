import { SOURCES } from "@socialgouv/cdtn-utils";
import Fuse from "fuse.js";
import { fetchDocument } from "../documents";
import { ElasticGlossary, GlossaryItem, GlossarySearchResult } from "./types";

export const fetchGlossary = async (): Promise<GlossaryItem[]> => {
  const result = await fetchDocument<ElasticGlossary, keyof ElasticGlossary>(
    ["data"],
    {
      query: {
        bool: {
          filter: [{ term: { source: SOURCES.GLOSSARY } }],
        },
      },
      size: 1,
    }
  );

  if (!result) {
    throw new Error("Glossaire non trouvé");
  }
  return result.data;
};

export const findGlossaryDefinition = (
  query: string,
  glossaryData: GlossaryItem[] | null
): GlossarySearchResult | undefined => {
  if (!glossaryData) {
    return undefined;
  }

  const normalizedQuery = query.toLowerCase().trim();

  const fuse = new Fuse(glossaryData, {
    keys: ["term", "variants", "abbreviations"],
    threshold: 0.3,
    ignoreDiacritics: true,
    includeScore: true,
    ignoreLocation: true,
  });

  const results = fuse.search(normalizedQuery);

  if (results.length > 0 && results[0].item) {
    return {
      term: results[0].item.term,
      definition: results[0].item.definition,
    };
  }

  return undefined;
};
