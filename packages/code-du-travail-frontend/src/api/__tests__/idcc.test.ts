import request from "supertest";
import server from "nextjs-http-supertest";

describe("IDCC", () => {
  afterAll(() => {
    server.close();
  });

  it("should return idcc for banques", async () => {
    const res = await request(server).get("/api/idcc?q=banque");
    expect(res.status).toBe(200);
    expect(res.body).toMatchSnapshot();
  });

  it("should return nothing", async () => {
    const res = await request(server).get("/api/idcc?q=blabla");
    expect(res.status).toBe(200);
    expect(res.body).toMatchSnapshot();
  });
});
