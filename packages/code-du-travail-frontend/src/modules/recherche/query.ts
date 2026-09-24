import {
  DEFAULT_PRESEARCH_RESULTS_NUMBER,
  SearchResult,
  searchWithQuery,
} from "../../api";

const search = async (
  query: string,
  sizeParams = 25,
  withPQ = false
): Promise<{
  topDocuments: SearchResult[];
  documents: SearchResult[];
  class: string;
  size: number;
}> => {
  // Validation de la requête
  if (!query || query.trim().length === 0) {
    return {
      topDocuments: [],
      documents: [],
      class: "",
      size: 0,
    };
  }

  try {
    const response = await searchWithQuery(query, sizeParams, withPQ);

    // Vérification que la réponse est valide
    if (
      !response ||
      !response.documents ||
      !Array.isArray(response.documents)
    ) {
      return {
        topDocuments: [],
        documents: [],
        class: "",
        size: 0,
      };
    }

    const topDocuments = response.documents.slice(
      0,
      DEFAULT_PRESEARCH_RESULTS_NUMBER
    );
    const documents = response.documents.slice(
      DEFAULT_PRESEARCH_RESULTS_NUMBER
    );

    return {
      topDocuments,
      documents,
      class: response.class || "",
      size: topDocuments.length + documents.length,
    };
  } catch (error) {
    console.error("Erreur lors de la recherche:", error);
    return {
      topDocuments: [],
      documents: [],
      class: "",
      size: 0,
    };
  }
};

export default search;
