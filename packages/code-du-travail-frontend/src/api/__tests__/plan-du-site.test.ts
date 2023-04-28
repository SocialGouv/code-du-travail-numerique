import request from "supertest";
import server from "nextjs-http-supertest";

describe("Plan du site", () => {
  afterAll(() => {
    server.close();
  });

  it("should return a list for /plan-du-site", async () => {
    const res = await request(server).get("/api/plan-du-site");
    expect(res.status).toBe(200);
    expect(res.body).toMatchSnapshot();
  });
});
