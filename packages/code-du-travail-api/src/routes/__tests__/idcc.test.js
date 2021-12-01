import router, { parseIdcc } from "../idcc";

const request = require("supertest");
const Koa = require("koa");

const app = new Koa();
app.use(router.routes());

test("parse idcc", () => {
  expect(parseIdcc("aa")).toBeUndefined();
  expect(parseIdcc("123")).toEqual(123);
  expect(parseIdcc("0123")).toEqual(123);
});

test("return idcc results for boulangerie", async () => {
  const response = await request(app.callback()).get(
    `/api/v1/idcc?q=boulangerie`
  );
  expect(response.status).toBe(200);
  expect(response.body.hits).toMatchSnapshot();
});

test("return idcc results for pati", async () => {
  const response = await request(app.callback()).get(`/api/v1/idcc?q=pati`);
  expect(response.status).toBe(200);
  expect(response.body.hits).toMatchSnapshot();
});

test("return idcc results in correct order for banque", async () => {
  const response = await request(app.callback()).get(`/api/v1/idcc?q=banque`);
  expect(response.status).toBe(200);
  expect(response.body.hits).toMatchSnapshot();
});

test("return idcc for number 27", async () => {
  const response = await request(app.callback()).get(`/api/v1/idcc?q=27`);
  expect(response.status).toBe(200);
  expect(response.body.hits).toMatchSnapshot();
});
