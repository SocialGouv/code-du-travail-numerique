/**
 * @jest-environment node
 */
import { fetchNewsList } from "../../../actualite/queries";

jest.mock("../../../actualite/queries", () => ({
  fetchNewsList: jest.fn(),
}));

const mockedFetchNewsList = fetchNewsList as jest.Mock;

const news = (slug: string) => ({
  cdtnId: `id-${slug}`,
  title: `Actualité ${slug}`,
  slug,
});

// The route keeps its cache in module state: a fresh module per test.
const loadRoute = async () => {
  let route!: typeof import("../../../../../app/api/hints/route");
  await jest.isolateModulesAsync(async () => {
    route = await import("../../../../../app/api/hints/route");
  });
  return route;
};

describe("GET /api/hints", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    jest.useFakeTimers({ now: new Date("2026-11-13T10:00:00Z") });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("lists the latest news, cached for 1 minute", async () => {
    const { GET } = await loadRoute();
    mockedFetchNewsList.mockResolvedValue({
      items: [news("premiere"), news("seconde")],
    });

    const response = await GET();
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe(
      "public, max-age=60, s-maxage=60"
    );
    const body = await response.json();
    expect(body.actualites).toEqual([
      {
        id: "id-premiere",
        title: "Actualité premiere",
        slug: "/actualite/premiere",
      },
      {
        id: "id-seconde",
        title: "Actualité seconde",
        slug: "/actualite/seconde",
      },
    ]);
    expect(body.suggestions).toHaveLength(4);
    expect(mockedFetchNewsList).toHaveBeenCalledWith(
      ["cdtnId", "title", "slug"],
      { page: 1, pageSize: 4 }
    );

    // Within 1 minute: no new Elasticsearch call.
    jest.advanceTimersByTime(50 * 1000);
    await GET();
    expect(mockedFetchNewsList).toHaveBeenCalledTimes(1);

    // Once expired: a newly published news item shows up.
    jest.advanceTimersByTime(20 * 1000);
    mockedFetchNewsList.mockResolvedValue({ items: [news("nouvelle")] });
    const refreshed = await (await GET()).json();
    expect(refreshed.actualites[0].slug).toBe("/actualite/nouvelle");
    expect(mockedFetchNewsList).toHaveBeenCalledTimes(2);
  });

  it("falls back on the last known news when Elasticsearch fails or answers empty", async () => {
    const { GET } = await loadRoute();
    mockedFetchNewsList.mockResolvedValue({ items: [news("connue")] });
    await GET();

    jest.advanceTimersByTime(10 * 60 * 1000);
    mockedFetchNewsList.mockResolvedValue({ items: [] });
    const afterEmpty = await GET();
    expect(afterEmpty.status).toBe(200);
    expect((await afterEmpty.json()).actualites[0].slug).toBe(
      "/actualite/connue"
    );

    mockedFetchNewsList.mockRejectedValue(new Error("ES down"));
    const afterError = await GET();
    expect(afterError.status).toBe(200);
    expect((await afterError.json()).actualites[0].slug).toBe(
      "/actualite/connue"
    );
  });

  it("answers 500 when nothing was ever fetched", async () => {
    const { GET } = await loadRoute();
    mockedFetchNewsList.mockRejectedValue(new Error("ES down"));

    expect((await GET()).status).toBe(500);
  });
});
