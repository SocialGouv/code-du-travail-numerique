const request = require("supertest");
const Koa = require("koa");

const routes = require("../items");

const app = new Koa();
app.use(routes.routes());

test("return item from its id", async () => {
  const response = await request(app.callback()).get(`/api/v1/items/6`);
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});

test("return item from source and slug ", async () => {
  const response = await request(app.callback()).get(
    `/api/v1/items/fiches_ministere_travail/la-demission-comment-presenter-une-demission`
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});

test("return a faq item with additionnal content from its source and slug", async () => {
  const response = await request(app.callback()).get(
    `/api/v1/items/faq/dans-les-hcr-quel-est-le-preavis-de-demission`
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});
