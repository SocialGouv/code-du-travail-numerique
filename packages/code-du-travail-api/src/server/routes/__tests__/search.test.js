const request = require("supertest");
const Koa = require("koa");
const router = require("../search");

const getSearchBody = require("../search/search.elastic");
const getSemBody = require("../search/search.sem");

const nlpFakeData = require("./sem_search.json");
const nlpFakeDataArticles = require("./sem_search_art.json");
// mock fetch function
jest.mock("node-fetch", () => jest.fn());
const fetch = require("node-fetch");

const app = new Koa();
app.use(router.routes());

it("asks same sources wether it is search sem or search elastic and gets a description", () => {
  expect(getSearchBody._source).toEqual(getSemBody._source);
});

it("returns search results for demission from datafiller", async () => {
  // nlp api will return fake data
  fetch.mockResolvedValue({ json: () => nlpFakeData });

  const response = await request(app.callback()).get(
    "/api/v1/search?q=démission"
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot(); // datafiller is involved here (no ES or Sem)
});

it("returns 3 search results for demission from elastic if size = 3", async () => {
  const response = await request(app.callback()).get(
    "/api/v1/search?q=démission&skipSavedResults&size=3"
  );
  expect(response.status).toBe(200);
  expect(response.body.length).toBe(3);
});

it("returns search results for demission from elastic", async () => {
  // nlp api will return fake data
  fetch.mockResolvedValue({ json: () => nlpFakeData });

  const response = await request(app.callback()).get(
    "/api/v1/search?q=démission&skipSavedResults"
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});

it("returns article results when searching with article id", async () => {
  fetch.mockResolvedValue({ json: () => nlpFakeDataArticles });
  const response = await request(app.callback()).get(
    `/api/v1/search?q=R1225-18`
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});
