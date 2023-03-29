import request from "supertest";
import server from "nextjs-http-supertest";

describe("Items", () => {
  afterAll(() => {
    server.close();
  });

  it("should return a list for /items", async () => {
    const res = await request(server).get("/api/items");
    expect(res.status).toBe(200);
    expect(res.body).toMatchSnapshot();
  });

  it("should return a list for /items with query params", async () => {
    const res = await request(server).get(
      "/api/items?url=https://www.service-public.fr/particuliers/vosdroits/F2883"
    );
    expect(res.status).toBe(200);
    expect(res.body).toMatchSnapshot();
  });

  it("should return an item for /items/[source]/[slug]", async () => {
    const res = await request(server).get(
      "/api/items/fiches_service_public/demission-dun-salarie"
    );
    expect(res.status).toBe(200);
    expect(res.body).toMatchSnapshot();
  });

  it("should return an error for /items/[source]/[slug]", async () => {
    const res = await request(server).get(
      "/api/items/fiches_service_public/blabla"
    );
    expect(res.status).toBe(404);
  });
});
