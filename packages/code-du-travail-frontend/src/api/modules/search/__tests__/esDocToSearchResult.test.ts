import { SOURCES } from "@socialgouv/cdtn-utils";
import { SEARCH_ALGO } from "../service/types";
import { esDocToSearchResult } from "../utils";

const toResult = esDocToSearchResult(SEARCH_ALGO.FULL_TEXT);

describe("esDocToSearchResult", () => {
  it("uses the meta description of a news item as its description", () => {
    const result = toResult({
      _score: 1,
      _source: {
        source: SOURCES.NEWS,
        slug: "mon-actualite",
        title: "Mon actualité",
        metaDescription: "Résumé de l'actualité",
      },
    });

    expect(result.description).toBe("Résumé de l'actualité");
  });

  it("keeps the description of other sources untouched", () => {
    const result = toResult({
      _score: 1,
      _source: {
        source: SOURCES.SHEET_SP,
        slug: "une-fiche",
        title: "Une fiche",
        metaDescription: "Meta description",
      },
    });

    expect(result.description).toBeUndefined();
  });
});
