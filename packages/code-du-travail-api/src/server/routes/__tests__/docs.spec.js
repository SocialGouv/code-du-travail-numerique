const request = require("supertest");
const Koa = require("koa");
const docsRoutes = require("../docs");

const app = new Koa();
app.use(docsRoutes);

test("should send certificat-de-travail.docx", async () => {
  const response = await request(app.callback()).get(
    "/api/v1/docs/certificat-de-travail.docx"
  );
  expect(response.status).toBe(200);
});
