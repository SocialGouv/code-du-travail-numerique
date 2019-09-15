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

test("return theme data for slug 644-handicap", async () => {
  const response = await request(app.callback()).get(
    `/api/v1/themes/644-handicap`
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});

test("return theme data for slug 1-embauche-et-contrat-de-travail", async () => {
  const response = await request(app.callback()).get(
    `/api/v1/themes/1-embauche-et-contrat-de-travail`
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});

test("returns 404 when slug match no themes", async () => {
  const response = await request(app.callback()).get(`/api/v1/themes/slug`);
  expect(response.status).toBe(404);
});
