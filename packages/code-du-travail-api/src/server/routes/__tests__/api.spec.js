//

const request = require("supertest");
const Koa = require("koa");

//

const apiRoutes = require("../api");

const app = new Koa();
app.use(apiRoutes.routes());

test("version route", async () => {
  jest.mock("../../../../package.json", () => ({ version: "x.y.z" }));
  const response = await request(app.callback()).get(
    `${apiRoutes.BASE_URL}/version`
  );
  expect(response.body).toMatchSnapshot();
});

test("docsCount route", async () => {
  const response = await request(app.callback()).get(
    `${apiRoutes.BASE_URL}/docsCount`
  );
  expect(response.body).toMatchSnapshot();
});
