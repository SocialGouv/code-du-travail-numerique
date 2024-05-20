/** @jest-environment node */

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
  test("accentuation is ignored", async () => {
    const res = await request(server).get("/api/suggest?q=ré");
    expect(res.body.includes("retraite")).toBeTruthy();
    expect(res.body).toMatchSnapshot();
  });

  test("fuzzy matching works", async () => {
    const res = await request(server).get("/api/suggest?q=reta");
    expect(res.body).toMatchSnapshot();
  });

  test("fuzzy matching results are lower than exact matchs", async () => {
    const res = await request(server).get("/api/suggest?q=con");
    expect(res.body).toMatchSnapshot();
  });

  test("ensure results are only returned when enough characters passed", async () => {
    const res = await request(server).get("/api/suggest?q=d");
    expect(res.body).toMatchSnapshot();
  });
});
