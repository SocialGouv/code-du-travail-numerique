const request = require("supertest");
const Koa = require("koa");
const router = require("../idcc");

const app = new Koa();
app.use(router.routes());

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
