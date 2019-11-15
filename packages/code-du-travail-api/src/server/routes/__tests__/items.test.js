const request = require("supertest");
const Koa = require("koa");
const router = require("../items");
const fetch = require("node-fetch");

// mock fetch function
jest.mock("node-fetch");
fetch.mockResolvedValue({ json: () => [] });

const app = new Koa();
app.use(router.routes());

test("return item from its id", async () => {
  const response = await request(app.callback()).get(`/api/v1/items/6`);
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});

test("return item from source and slug ", async () => {
  const response = await request(app.callback()).get(
    `/api/v1/items/fiches_service_public/demission-dun-salarie`
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});
