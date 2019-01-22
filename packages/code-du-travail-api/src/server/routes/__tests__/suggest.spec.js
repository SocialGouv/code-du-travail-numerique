const request = require("supertest");
const Koa = require("koa");
const API_BASE_URL = require("../api").BASE_URL;
const routes = require("../suggest");
const { routeName } = routes;

const app = new Koa();
app.use(routes.routes());

test("return suggest results for demission", async () => {
  const response = await request(app.callback()).get(
    `${API_BASE_URL}${routeName}?q=démission`
  );
  expect(response.status).toBe(200);
  expect(response.body.hits).toMatchSnapshot();
});

test("return faq search suggest for demission ", async () => {
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
    `${API_BASE_URL}${routeName}?q=démission&excludeSources=${excludeSources.join(
      ","
    )}`
  );
  expect(response.status).toBe(200);
  expect(response.body.hits).toMatchSnapshot();
});
