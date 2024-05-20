/** @jest-environment node */

import request from "supertest";
import server from "nextjs-http-supertest";

describe("Items", () => {
  afterAll(() => {
    server.close();
  });

  it("should return an error for /items/[source]/[slug]", async () => {
    const res = await request(server).get(
      "/api/items/fiches_service_public/blabla"
    );
    expect(res.status).toBe(404);
  });

  test("ensure related items do not include queried item", async () => {
    const source = "fiches_service_public";
    const slug = "demission-dun-salarie";
    const response = await request(server).get(`/api/items/${source}/${slug}`);
    expect(response.status).toBe(200);
    expect(
      response.body.relatedItems.map(({ slug, source }) => ({ slug, source }))
    ).not.toContainEqual({ slug, source });
  });

  it("should return an error for /items/[source]/[slug]", async () => {
    const res = await request(server).get(
      "/api/items/fiches_service_public/blabla"
    );
    expect(res.status).toBe(404);
  });

  test("return item from source and slug", async () => {
    const response = await request(server).get(
      `/api/items/fiches_service_public/demission-dun-salarie`
    );
    expect(response.status).toBe(200);
    expect(response.body).toMatchSnapshot();
  });
});
