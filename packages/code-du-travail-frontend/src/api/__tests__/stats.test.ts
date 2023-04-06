import request from "supertest";
import server from "nextjs-http-supertest";

describe("Stats", () => {
  it("should return data", async () => {
    (global as any).fetch = jest.fn(async (url: string) => {
      if (url.includes("VisitsSummary.getVisits")) {
        return Promise.resolve({
          json: () => ({ value: 20 }),
        });
      }
      if (url.includes("Actions.get")) {
        return Promise.resolve({
          json: () => ({ nb_pageviews: 10, nb_searches: 4 }),
        });
      }
      if (url.includes("Events.getAction")) {
        return Promise.resolve({
          json: () => [
            { label: "positive", nb_events: 3 },
            { label: "negative", nb_events: 2 },
          ],
        });
      }
      return Promise.reject("unkown url");
    });
    const response = await request(server).get("/api/stats");
    expect(response.status).toBe(200);
    expect(response.body).toMatchInlineSnapshot(`
      {
        "nbDocuments": 29,
        "nbPageViews": 10,
        "nbSearches": 4,
        "nbVisits": 20,
      }
    `);
    expect(response.ok).toBe(true);
  });

  it("should render an error", async () => {
    global.fetch = jest.fn(async () => {
      return Promise.reject("MATOMO IS DOWN");
    });
    const response = await request(server).get("/api/stats");
    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({
      message: "No visit data and info data",
    });
    expect(response.ok).toBe(false);
  });
});
