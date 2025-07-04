import { SOURCES } from "@socialgouv/cdtn-utils";
import { fetchDocument } from "../documents";
import { ElasticGlossary, GlossaryItem } from "./types";

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
