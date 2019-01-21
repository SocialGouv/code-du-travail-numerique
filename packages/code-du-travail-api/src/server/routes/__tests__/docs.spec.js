//

const request = require("supertest");
const Koa = require("koa");

//

const docsRoutes = require("../docs");
const BASE_URL = require("../api").BASE_URL;

const app = new Koa();
app.use(docsRoutes);

test("should send certificat-de-travail.docx", async () => {
  const response = await request(app.callback()).get(
    `${BASE_URL}/docs/certificat-de-travail.docx`
  );
  expect(response.status).toBe(200);
});
