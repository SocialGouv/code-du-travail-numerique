"use strict";
var _highlights = _interopRequireDefault(require("../highlights"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const request = require("supertest");
const Koa = require("koa");

const app = new Koa();
app.use(_highlights.default.routes());
test("return highlights matching the slug, correctly hydrated", async () => {
  const response = await request(app.callback()).get(
    `/api/v1/highlights/homepage`
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});
