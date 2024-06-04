/** @jest-environment node */

import request from "supertest";
import server from "nextjs-http-supertest";

describe("Glossary", () => {
  afterAll(() => {
    server.close();
  });

  it("should return a list for /glossary", async () => {
    const res = await request(server).get("/api/glossary");
    expect(res.status).toBe(200);
    expect(res.body).toMatchSnapshot();
  });

  it("should return an item for /glossary/[slug]", async () => {
    const res = await request(server).get(
      "/api/glossary/a-titre-conservatoire"
    );
    expect(res.status).toBe(200);
    expect(res.body).toMatchSnapshot();
  });

  it("should return an error for /glossary/[slug]", async () => {
    const res = await request(server).get("/api/glossary/blabla");
    expect(res.status).toBe(404);
  });
});
