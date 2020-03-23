const request = require("supertest");
const Koa = require("koa");

jest.mock("@cdt/data...datafiller/highlights.data.json", () => [
  {
    refs: [
      {
        url:
          "/fiche-ministere-travail/la-demission#Comment-presenter-une-demission",
        title: "pouf pouf",
        position: 0,
      },
    ],
    title: "homepage",
    last_modified: 1583944139769,
  },
]);

const router = require("../highlights");

const app = new Koa();
app.use(router.routes());

test("return highlights matching the slug, correctly hydrated", async () => {
  const response = await request(app.callback()).get(
    `/api/v1/highlights/homepage`,
  );

  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});
