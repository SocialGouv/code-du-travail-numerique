const request = require("supertest");
const Koa = require("koa");
const router = require("../themes");

const app = new Koa();
app.use(router.routes());

test("return themes root themes", async () => {
  const response = await request(app.callback()).get(`/api/v1/themes`);
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});

test("return theme data for slug 1-embauche-et-contrat-de-travail", async () => {
  const response = await request(app.callback()).get(
    `/api/v1/themes/1-embauche-et-contrat-de-travail`
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});

test("return theme data for slug 644-handicap", async () => {
  const response = await request(app.callback()).get(
    `/api/v1/themes/644-handicap`
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});

test("returns 404 when slug match no themes", async () => {
  const response = await request(app.callback()).get(`/api/v1/themes/slug`);
  expect(response.status).toBe(404);
});

/*test("return documents that belongs to theme 7-depart-de-lentreprise", async () => {
  const response = await request(app.callback()).get(
    "/api/v1/themes/7-depart-de-lentreprise/items"
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});

test("return documents that belongs to theme 37-demission", async () => {
  const response = await request(app.callback()).get(
    "/api/v1/themes/37-demission/items"
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});
*/
test("return 404 when slug match no themes", async () => {
  const response = await request(app.callback()).get(
    "/api/v1/themes/no-theme/items"
  );
  expect(response.status).toBe(404);
  expect(response.body).toMatchSnapshot();
});
/*
test("return 204 when slug match no themes", async () => {
  const response = await request(app.callback()).get(
    "/api/v1/themes/1-embauche-et-contrat-de-travail/items"
  );
  expect(response.status).toBe(204);
  expect(response.body).toMatchSnapshot();
});
*/
