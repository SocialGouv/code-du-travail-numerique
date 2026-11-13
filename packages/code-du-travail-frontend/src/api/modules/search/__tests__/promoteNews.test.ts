import { SourceKeys, SOURCES } from "@socialgouv/cdtn-utils";
import { SEARCH_ALGO, SearchResult } from "../service/types";
import { getNewsPosition, promoteNews } from "../utils";

const doc = (
  slug: string,
  source: SourceKeys = SOURCES.SHEET_SP,
  _score?: number
): SearchResult => ({
  _score,
  cdtnId: slug,
  slug,
  source,
  title: slug,
  description: "",
  algo: SEARCH_ALGO.PRESEARCH,
});

const news = (score: number) => doc("actu", SOURCES.NEWS, score);
const others = ["a", "b", "c", "d", "e"].map((slug) => doc(slug));
const slugs = (documents: SearchResult[]) => documents.map((d) => d.slug);

describe("getNewsPosition", () => {
  it.each([
    [7.5, 0],
    [5, 0],
    [3.4, 1],
    [2, 1],
    [0.6, 2],
    [undefined, 2],
  ])("puts a news scored %s at position %s", (score, position) => {
    expect(getNewsPosition(score)).toBe(position);
  });
});

describe("promoteNews", () => {
  it("leaves the results untouched without news", () => {
    expect(promoteNews(others, undefined)).toEqual(others);
  });

  it("puts a fresh and relevant news first", () => {
    expect(slugs(promoteNews(others, news(6)))).toEqual([
      "actu",
      "a",
      "b",
      "c",
      "d",
      "e",
    ]);
  });

  it("puts a less relevant or older news after the first results", () => {
    expect(slugs(promoteNews(others, news(3)))[1]).toBe("actu");
    expect(slugs(promoteNews(others, news(1)))[2]).toBe("actu");
  });

  it("moves a lower ranked news up without duplicating it", () => {
    expect(slugs(promoteNews([...others, news(1)], news(1)))).toEqual([
      "a",
      "b",
      "actu",
      "c",
      "d",
      "e",
    ]);
  });

  it("keeps a news that already ranks higher", () => {
    const documents = [others[0], news(1), ...others.slice(1)];

    expect(promoteNews(documents, news(1))).toBe(documents);
  });

  it("appends the news to short results", () => {
    expect(slugs(promoteNews([others[0]], news(1)))).toEqual(["a", "actu"]);
  });
});
