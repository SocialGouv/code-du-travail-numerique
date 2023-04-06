import request from "supertest";
import server from "nextjs-http-supertest";

describe("Dossiers", () => {
  afterAll(() => {
    server.close();
  });

  it("should return an item for /dossiers/[slug]", async () => {
    const res = await request(server).get(
      "/api/dossiers/aides-et-accompagnement-embauche-et-perennisation-des-emplois"
    );
    expect(res.status).toBe(200);
    expect(res.body).toMatchSnapshot();
  });

  it("should return an error for /dossiers/[slug]", async () => {
    const res = await request(server).get("/api/dossiers/blabla");
    expect(res.status).toBe(404);
  });
});
