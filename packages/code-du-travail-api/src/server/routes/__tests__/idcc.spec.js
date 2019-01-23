const request = require("supertest");
const Koa = require("koa");
const routes = require("../idcc");

const app = new Koa();
app.use(routes.routes());

test("return idcc results for boulangerie", async () => {
  const response = await request(app.callback()).get(
    `/api/v1/idcc?q=boulangerie`
  );
  expect(response.status).toBe(200);
  expect(response.body.hits).toMatchSnapshot();
});
