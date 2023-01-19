import Koa from "koa";
import request from "supertest";

import router from "../items";

jest.mock("@socialgouv/cdtn-elasticsearch");

const app = new Koa();
app.use(router.routes());

test("return item from its id", async () => {
  const response = await request(app.callback()).get(`/api/v1/items/9`);
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});

test("return item from source and slug", async () => {
  const response = await request(app.callback()).get(
    `/api/v1/items/fiches_service_public/demission-dun-salarie`
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});

test("ensure related items do not include queried item", async () => {
  const source = "fiches_service_public";
  const slug = "demission-dun-salarie";
  const response = await request(app.callback()).get(
    `/api/v1/items/${source}/${slug}`
  );
  expect(response.status).toBe(200);
  expect(
    response.body.relatedItems.map(({ slug, source }) => ({ slug, source }))
  ).not.toContainEqual({ slug, source });
});

test("return item from its url", async () => {
  const response = await request(app.callback()).get(
    `/api/v1/items?url=https://www.service-public.fr/particuliers/vosdroits/F2883`
  );
  expect(response.status).toBe(200);
  expect(response.body).toMatchSnapshot();
});
