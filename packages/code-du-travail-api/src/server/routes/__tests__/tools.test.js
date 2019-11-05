const request = require("supertest");
const Koa = require("koa");
const router = require("../tools");

const app = new Koa();
app.use(router.routes());

it("returns all tools", async () => {
  const response = await request(app.callback()).get(`/api/v1/tools`);
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});

it("returns a single tool", async () => {
  const response = await request(app.callback()).get(
    `/api/v1/tools/this-is-a-second-tool`
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});
