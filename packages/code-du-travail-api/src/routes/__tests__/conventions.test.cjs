import router from "../conventions/index.cjs";

const request = require("supertest");
const Koa = require("koa");

const app = new Koa();
app.use(router.routes());

it("returns the agreement document from idcc 843", async () => {
  const response = await request(app.callback()).get(
    "/api/v1/conventions/843-boulangerie-patisserie-entreprises-artisanales"
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
