import router from "../glossary";

const request = require("supertest");
const Koa = require("koa");

const app = new Koa();
app.use(router.routes());

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
