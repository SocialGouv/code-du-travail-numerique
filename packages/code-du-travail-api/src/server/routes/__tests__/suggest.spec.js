const request = require("supertest");
const Koa = require("koa");
const router = require("../suggest");

const app = new Koa();
app.use(router.routes());

function getSuggestions(query) {
  return request(app.callback()).get(`/api/v1/suggest?q=` + query);
}

function ensureSuggestionsMatchSnapshot(query) {
  return getSuggestions(query).expect(res =>
    expect(res.body).toMatchSnapshot()
  );
}

test("return suggestions for re in the right format", () =>
  getSuggestions("re")
    .expect(200)
    .expect("Content-Type", /json/)
    .expect(res => expect(res.body).toMatchSnapshot()));

test("accentuation is ignored", () =>
  getSuggestions("ré").expect(res =>
    expect(res.body.includes("retraite")).toBeTruthy()
  ));

test(`when query match several suggestions with same rank, 
  ensure order is based on query prefix matching position`, () =>
  ensureSuggestionsMatchSnapshot("ré"));

test(`when query match several suggestions with same prefix, 
  ensure order is based on rank`, () => ensureSuggestionsMatchSnapshot("re"));

test("fuzzy matching works", () => ensureSuggestionsMatchSnapshot("reta"));

test("fuzzy matching results are lower than exact matchs", () =>
  ensureSuggestionsMatchSnapshot("con"));

test("ensure results are only returned when enough characters passed", () =>
  ensureSuggestionsMatchSnapshot("d"));
