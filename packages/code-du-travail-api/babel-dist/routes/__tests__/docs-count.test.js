"use strict";
var _docsCount = _interopRequireDefault(require("../docs-count"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const request = require("supertest");
const Koa = require("koa");

const app = new Koa();
app.use(_docsCount.default.routes());
test("docsCount route", async () => {
  const response = await request(app.callback()).get(`/api/v1/docsCount`);
  expect(response.body).toMatchSnapshot();
});
