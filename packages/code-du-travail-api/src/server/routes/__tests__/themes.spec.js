const request = require("supertest");
const Koa = require("koa");
const router = require("../themes");

const app = new Koa();
app.use(router.routes());

test("return themes root themes", async () => {
  const response = await request(app.callback()).get(`/api/v1/themes`);
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});

test("return theme data for slug 42-licenciement-pour-inaptitude", async () => {
  const response = await request(app.callback()).get(
    `/api/v1/themes/42-licenciement-pour-inaptitude`
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});

test("return theme data for slug 41-licenciement-pour-motif-personnel", async () => {
  const response = await request(app.callback()).get(
    `/api/v1/themes/41-licenciement-pour-motif-personnel`
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});

test("returns 404 when slug match no themes", async () => {
  const response = await request(app.callback()).get(`/api/v1/themes/slug`);
  expect(response.status).toBe(404);
});
