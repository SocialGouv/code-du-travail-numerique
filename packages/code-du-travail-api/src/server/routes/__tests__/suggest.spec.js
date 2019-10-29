const request = require("supertest");
const Koa = require("koa");
const router = require("../suggest");

const app = new Koa();
app.use(router.routes());

function getSuggestions(query) {
  return request(app.callback()).get(`/api/v1/suggest?q=` + query);
}

test("return suggestions for re in the right format", () =>
  getSuggestions("re")
    .expect(200)
    .expect("Content-Type", /json/)
    .expect(res => expect(res.body).toMatchSnapshot()));

test("accentuation is ignored", async () =>
  getSuggestions("ré").expect(res =>
    // this is ugly
    expect(res.body).toEqual(expect.arrayContaining(["retraite"]))
  ));

test(`when query match several suggestions with same rank, 
  ensure order is based on query prefix matching position`, () =>
  getSuggestions("ré").expect(res => expect(res.body).toMatchSnapshot()));

test(`when query match several suggestions with same prefix, 
  ensure order is based on rank`, () =>
  getSuggestions("re").expect(res => expect(res.body).toMatchSnapshot()));

test("fuzzy matching works", () =>
  getSuggestions("reta").expect(res => expect(res.body).toMatchSnapshot()));

test("fuzzy matching results are lower than exact matchs", () =>
  getSuggestions("ded").expect(res => expect(res.body).toMatchSnapshot()));

test("ensure results are only returned when enough characters passed", () =>
  getSuggestions("d").expect(res => expect(res.body).toMatchSnapshot()));
