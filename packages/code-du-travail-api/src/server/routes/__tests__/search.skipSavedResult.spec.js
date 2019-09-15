const request = require("supertest");
const Koa = require("koa");
const router = require("../search");

const getSavedResult = require("../search/search.getSavedResult");

jest.mock("../search/search.getSavedResult");

const app = new Koa();
app.use(router.routes());

beforeEach(() => {
  getSavedResult.mockReset();
});

test("return know query from prequalified.data.json", async () => {
  const response = await request(app.callback()).get(
    `/api/v1/search?q=known-query2`
  );
  expect(getSavedResult).toHaveBeenCalled();
  expect(response.status).toBe(200);
});

test("skip know query from prequalified.data.json with skipSavedResults param", async () => {
  const response = await request(app.callback()).get(
    `/api/v1/search?q=known-query2&skipSavedResults`
  );
  expect(getSavedResult).not.toHaveBeenCalled();
  expect(response.status).toBe(200);
});
