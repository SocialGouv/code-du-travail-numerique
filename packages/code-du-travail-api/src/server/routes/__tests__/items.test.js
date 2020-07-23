const request = require("supertest");
const Koa = require("koa");
const router = require("../items");
require("./__mocking__/mockNLP");

jest.mock("@cdt/data/indexing/vectorizer");

const app = new Koa();
app.use(router.routes());

test("return item from its id", async () => {
  const response = await request(app.callback()).get(`/api/v1/items/8`);
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});

test("return item from source and slug", async () => {
  const response = await request(app.callback()).get(
    `/api/v1/items/fiches_service_public/demission-dun-salarie`
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});

test("return item from its url", async () => {
  const response = await request(app.callback()).get(
    `/api/v1/items?url=https://www.service-public.fr/particuliers/vosdroits/F2883`
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});
