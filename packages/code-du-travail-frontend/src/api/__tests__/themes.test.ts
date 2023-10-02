import request from "supertest";
import server from "nextjs-http-supertest";

describe("Themes", () => {
  afterAll(() => {
    server.close();
  });

  it("should return a list for /themes", async () => {
    const res = await request(server).get("/api/themes");
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body).toMatchSnapshot();
  });

  it("should return an item for /themes/[slug]", async () => {
    const res = await request(server).get(
      "/api/themes/embauche-et-contrat-de-travail"
    );
    expect(res.status).toBe(200);
    expect(res.body).toMatchSnapshot();
  });

  it("should return an error for /themes/[slug]", async () => {
    const res = await request(server).get("/api/themes/blabla");
    expect(res.status).toBe(404);
  });
});
