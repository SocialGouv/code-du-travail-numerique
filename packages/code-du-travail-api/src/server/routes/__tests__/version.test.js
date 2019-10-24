const request = require("supertest");
const Koa = require("koa");
const router = require("../version");

const app = new Koa();
app.use(router.routes());

test("version route", async () => {
  jest.mock("../../../../package.json", () => ({ version: "x.y.z" }));
  const response = await request(app.callback()).get(`/api/v1/version`);
  expect(response.body).toMatchSnapshot();
});
