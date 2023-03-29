import request from "supertest";
import server from "nextjs-http-supertest";

describe("Suggestion", () => {
  afterAll(() => {
    server.close();
  });

  it("should return a list of suggestion", async () => {
    const res = await request(server).get("/api/suggest?q=re");
    expect(res.status).toBe(200);
    expect(res.body).toMatchSnapshot();
  });

  it("should return nothing", async () => {
    const res = await request(server).get("/api/suggest?q=a");
    expect(res.status).toBe(200);
    expect(res.body).toMatchSnapshot();
  });
});
