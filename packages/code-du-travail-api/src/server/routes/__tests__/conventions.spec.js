const request = require("supertest");
const Koa = require("koa");
const router = require("../conventions");

const app = new Koa();
app.use(router.routes());

it("returns a convention container with base text", async () => {
  const response = await request(app.callback()).get(
    "/api/v1/conventions/KALICONT000030185307"
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});

it("returns a convention container with textes attaches", async () => {
  const response = await request(app.callback()).get(
    "/api/v1/conventions/KALICONT000030185307/attaches"
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});

it("returns a convention container with textes salaires", async () => {
  const response = await request(app.callback()).get(
    "/api/v1/conventions/KALICONT000030185307/salaires"
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});
