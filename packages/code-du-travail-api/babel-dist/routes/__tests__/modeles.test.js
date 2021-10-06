"use strict";
var _modeles = _interopRequireDefault(require("../modeles"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const request = require("supertest");
const Koa = require("koa");

const app = new Koa();
app.use(_modeles.default.routes());
test("return all modeles results", async () => {
  const response = await request(app.callback()).get(`/api/v1/modeles`);
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});
