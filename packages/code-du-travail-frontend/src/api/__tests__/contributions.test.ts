import request from "supertest";
import server from "nextjs-http-supertest";

describe("Contributions", () => {
  afterAll(() => {
    server.close();
  });

  it("should return all contributions", async () => {
    const res = await request(server).get("/api/contributions");
    expect(res.status).toBe(200);
    expect(res.body).toMatchSnapshot();
  });
});
