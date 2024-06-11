/** @jest-environment node */

import request from "supertest";
import server from "nextjs-http-supertest";

describe("Agreements", () => {
  afterAll(() => {
    server.close();
  });

  it("should return a list for /agreements", async () => {
    const res = await request(server).get("/api/agreements");
    expect(res.status).toBe(200);
    expect(res.body).toMatchSnapshot();
  });

  it("should return an item for /agreements/[slug]", async () => {
    const res = await request(server).get("/api/agreements/2120-banque");
    expect(res.status).toBe(200);
    expect(res.body).toMatchSnapshot();
  });

  it("should return an error for /agreements/[slug]", async () => {
    const res = await request(server).get("/api/agreements/blabla");
    expect(res.status).toBe(404);
  });
});
