const request = require("supertest");
const Koa = require("koa");
const routes = require("../docs-count");

const app = new Koa();
app.use(routes.routes());

test("docsCount route", async () => {
  const response = await request(app.callback()).get(`/api/v1/docsCount`);
  expect(response.body).toMatchSnapshot();
});
