const request = require("supertest");
const Koa = require("koa");
const router = require("../suggest");

const app = new Koa();
app.use(router.routes());

test("return suggestions", async () => {
  const response = await request(app.callback()).get(`/api/v1/suggest`);
  expect(response.status).toBe(200);
});

test("return suggestions for re", async () => {
  const response = await request(app.callback()).get(`/api/v1/suggest?q=re`);
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});
