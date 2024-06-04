/** @jest-environment node */

import request from "supertest";
import server from "nextjs-http-supertest";

describe("Modeles", () => {
  afterAll(() => {
    server.close();
  });

  it("should return all modeles", async () => {
    const res = await request(server).get("/api/modeles");
    expect(res.status).toBe(200);
    expect(res.body).toMatchSnapshot();
  });
});
