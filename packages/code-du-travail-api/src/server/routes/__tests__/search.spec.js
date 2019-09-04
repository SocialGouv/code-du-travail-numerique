const request = require("supertest");
const Koa = require("koa");
const router = require("../search");

const nlpFakeData = require("./sem_search.json");
// mock fetch function
jest.mock("node-fetch", () => ({ default: jest.fn() }));
const fetch = require("node-fetch").default;

const app = new Koa();
app.use(router.routes());

test("return search results for demission from datafiller", async () => {
  // nlp api will return fake data
  fetch.mockResolvedValue({ json: () => nlpFakeData });

  const response = await request(app.callback()).get(
    "/api/v1/search?q=démission"
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot(); // datafiller is involved here (no ES or Sem)
});

test("return 3 search results for demission from elastic if size = 3", async () => {
  const response = await request(app.callback()).get(
    "/api/v1/search?q=démission&skipSavedResults&size=3"
  );
  expect(response.status).toBe(200);
  expect(response.body.length).toBe(3);
});

test("return search results for demission from elastic", async () => {
  // nlp api will return fake data
  fetch.mockResolvedValue({ json: () => nlpFakeData });

  const response = await request(app.callback()).get(
    "/api/v1/search?q=démission&skipSavedResults"
  );
  expect(response.status).toBe(200);
  //expect(response.body).toMatchSnapshot();
});

test("return faq search results for demission ", async () => {
  // nlp api will return fake data
  fetch.mockResolvedValue({ json: () => nlpFakeData });

  const excludeSources = [
    "code_du_travail",
    "fiche",
    "modele_courrier",
    "idcc",
    "conventions_collectives",
    "themes",
    "fiches_ministere_travail",
    "fiches_service_public"
  ];
  const response = await request(app.callback()).get(
    `/api/v1/search?q=la démission&excludeSources=${excludeSources.join(",")}`
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});

test("return article results when searching with article id", async () => {
  const response = await request(app.callback()).get(
    `/api/v1/search?q=R1225-18`
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});
