"use strict";
var _idcc = _interopRequireDefault(require("../idcc"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const request = require("supertest");
const Koa = require("koa");

const app = new Koa();
app.use(_idcc.default.routes());
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
