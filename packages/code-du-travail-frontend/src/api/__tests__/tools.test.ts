import request from "supertest";
import server from "nextjs-http-supertest";

describe("Tools", () => {
  afterAll(() => {
    server.close();
  });

  it("should return a list for /tools", async () => {
    const res = await request(server).get("/api/tools");
    expect(res.status).toBe(200);
    expect(res.body).toMatchSnapshot();
  });

  it("should return an item for /tools/[slug]", async () => {
    const res = await request(server).get("/api/tools/indemnite-licenciement");
    expect(res.status).toBe(200);
    expect(res.body).toMatchSnapshot();
  });

  it("should return an error for /tools/[slug]", async () => {
    const res = await request(server).get("/api/tools/blabla");
    expect(res.status).toBe(404);
  });
});
