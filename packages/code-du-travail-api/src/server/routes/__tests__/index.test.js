import router from "../index.js";

const request = require("supertest");
const Koa = require("koa");

const app = new Koa();
app.use(router.routes());

test("index route", async () => {
  const response = await request(app.callback()).get(`/`);
  expect(response.status).toBe(200);
});
