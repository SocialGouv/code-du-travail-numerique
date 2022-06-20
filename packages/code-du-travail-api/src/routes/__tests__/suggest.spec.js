import router from "../suggest";

const request = require("supertest");
const Koa = require("koa");

const app = new Koa();
app.use(router.routes());

async function getSuggestions(query) {
  return request(app.callback()).get(`/api/v1/suggest?q=` + query);
}

test("return suggestions for re in the right format", async () => {
  const response = await getSuggestions("re");
  expect(response.status).toBe(200);
  expect(response.get("Content-Type")).toMatch(/json/);
  expect(response.body).toMatchSnapshot();
});

test("accentuation is ignored", async () => {
  const response = await getSuggestions("ré");
  expect(response.body.includes("retraite")).toBeTruthy();
});

test(`when query match several suggestions with same rank, 
  ensure order is based on query prefix matching position`, async () => {
  const response = await getSuggestions("ré");
  expect(response.body).toMatchSnapshot();
});

test(`when query match several suggestions with same prefix, 
  ensure order is based on rank`, async () => {
  const response = await getSuggestions("re");
  expect(response.body).toMatchSnapshot();
});

test("fuzzy matching works", async () => {
  const response = await getSuggestions("reta");
  expect(response.body).toMatchSnapshot();
});

test("fuzzy matching results are lower than exact matchs", async () => {
  const response = await getSuggestions("con");
  expect(response.body).toMatchSnapshot();
});

test("ensure results are only returned when enough characters passed", async () => {
  const response = await getSuggestions("d");
  expect(response.body).toMatchSnapshot();
});
