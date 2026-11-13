import { SOURCES } from "@socialgouv/cdtn-utils";
import { getNewsSearchBody, getSearchBody, NEWS_MIN_SCORE } from "../queries";

describe("getSearchBody", () => {
  it("weights news by freshness without touching other sources", () => {
    const { function_score } = getSearchBody("congés payés", 10, [
      SOURCES.NEWS,
    ]).query;

    expect(function_score.boost_mode).toBe("multiply");
    expect(function_score.functions).toHaveLength(2);
    for (const fn of function_score.functions) {
      expect(fn.filter).toEqual({ term: { source: SOURCES.NEWS } });
    }
    expect(function_score.functions[1]).toMatchObject({
      gauss: { publishedAt: { origin: "now" } },
    });
  });
});

describe("getNewsSearchBody", () => {
  it("only matches recent published news containing every query word", () => {
    const body = getNewsSearchBody("congés payés");

    expect(body.min_score).toBe(NEWS_MIN_SCORE);
    expect(body.query.bool.filter).toEqual(
      expect.arrayContaining([
        { term: { source: SOURCES.NEWS } },
        { term: { isPublished: true } },
        { term: { excludeFromSearch: false } },
      ])
    );
    expect(body.query.bool.must.dis_max.queries[0]).toEqual({
      match: { "title.french": { query: "congés payés", operator: "and" } },
    });
  });

  it("ranks the matches by freshness", () => {
    const { rescore } = getNewsSearchBody("congés payés");

    expect(rescore.query.score_mode).toBe("multiply");
    expect(rescore.query.rescore_query.function_score.gauss).toBeDefined();
  });
});
