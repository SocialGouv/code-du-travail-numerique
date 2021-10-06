"use strict";
var _index = _interopRequireDefault(require("../index.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const request = require("supertest");
const Koa = require("koa");

const app = new Koa();
app.use(_index.default.routes());
test("index route", async () => {
  const response = await request(app.callback()).get(`/`);
  expect(response.status).toBe(200);
});
