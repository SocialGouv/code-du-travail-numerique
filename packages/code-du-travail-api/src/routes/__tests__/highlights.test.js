import router from "../highlights";

const request = require("supertest");
const Koa = require("koa");

const app = new Koa();
app.use(router.routes());

test("return highlights matching the slug, correctly hydrated", async () => {
  const response = await request(app.callback()).get(
    `/api/v1/highlights/homepage`
  );

  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});
