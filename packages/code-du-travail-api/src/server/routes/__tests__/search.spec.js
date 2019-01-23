const request = require("supertest");
const Koa = require("koa");
const routes = require("../search");

const app = new Koa();
app.use(routes.routes());

test("return search results for demission", async () => {
  const response = await request(app.callback()).get(
    `/api/v1/search?q=démission`
  );
  expect(response.status).toBe(200);
  expect(response.body.hits).toMatchSnapshot();
});

test("return faq search results for demission ", async () => {
  const excludeSources = [
    "code_du_travail",
    "fiche",
    "modele_courrier",
    "idcc",
    "kali",
    "themes",
    "fiches_ministere_travail",
    "fiches_service_public"
  ];
  const response = await request(app.callback()).get(
    `/api/v1/search?q=démission&excludeSources=${excludeSources.join(",")}`
  );
  expect(response.status).toBe(200);
  expect(response.body.hits).toMatchSnapshot();
});
