const fetch = (...args) =>
  import("node-fetch").then((mod) => mod.default(...args));

const request = require("supertest");
const Koa = require("koa");

const router = require("../stats");

const app = new Koa();
app.use(router.routes());

// mock fetch function to return vector for démission
jest.mock("node-fetch");
fetch.mockImplementation((url) => {
  if (/VisitsSummary\.getVisits/.test(url)) {
    return Promise.resolve({
      json: () => ({ value: 20 }),
    });
  }
  if (/Actions\.get/.test(url)) {
    return Promise.resolve({
      json: () => ({ nb_pageviews: 10, nb_searches: 4 }),
    });
  }
  if (/Events\.getAction/.test(url)) {
    return Promise.resolve({
      json: () => [
        { label: "positive", nb_events: 3 },
        { label: "negative", nb_events: 2 },
      ],
    });
  }
  return Promise.reject("unkown url");
});

test("return stats", async () => {
  const response = await request(app.callback()).get(`/api/v1/stats`);
  expect(response.status).toBe(200);
  expect(response.body).toMatchInlineSnapshot(`
    Object {
      "nbDocuments": 24,
      "nbPageViews": 10,
      "nbSearches": 4,
      "nbVisits": 20,
    }
  `);
});
