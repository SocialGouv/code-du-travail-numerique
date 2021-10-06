"use strict";
var _version = _interopRequireDefault(require("../version"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const request = require("supertest");
const Koa = require("koa");

const app = new Koa();
app.use(_version.default.routes());
test("version route", async () => {
  jest.mock("../../../package.json", () => ({ version: "x.y.z" }));
  const response = await request(app.callback()).get(`/api/v1/version`);
  expect(response.body).toMatchSnapshot();
});
