"use strict";
var _glossary = _interopRequireDefault(require("../glossary"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const request = require("supertest");
const Koa = require("koa");

const app = new Koa();
app.use(_glossary.default.routes());
test("return glossary terms", async () => {
  const response = await request(app.callback()).get(`/api/v1/glossary`);
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});
test("return glossary matching the slug", async () => {
  const response = await request(app.callback()).get(
    `/api/v1/glossary/a-titre-conservatoire`
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});
