const request = require("supertest");
const Koa = require("koa");
const router = require("../conventions");

const app = new Koa();
app.use(router.routes());

it("returns an agreement document", async () => {
  const response = await request(app.callback()).get(
    "/api/v1/conventions/1596-nouvelle-convention-collective-nationale-des-ouvriers-employes-par-les-entr"
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});

test("returns 404 when slug match no agreement", async () => {
  const response = await request(app.callback()).get(
    `/api/v1/conventions/slug`
  );
  expect(response.status).toBe(404);
});
