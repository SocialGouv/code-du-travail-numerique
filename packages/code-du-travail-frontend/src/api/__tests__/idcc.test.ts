/** @jest-environment node */

import request from "supertest";
import server from "nextjs-http-supertest";
import { parseIdcc } from "../modules/idcc";

describe("IDCC", () => {
  afterAll(() => {
    server.close();
  });

  test("parse idcc", () => {
    expect(parseIdcc("aa")).toBeUndefined();
    expect(parseIdcc("123")).toEqual(123);
    expect(parseIdcc("0123")).toEqual(123);
  });

  test("return idcc results for boulangerie", async () => {
    const response = await request(server).get(`/api/idcc?q=boulangerie`);
    expect(response.status).toBe(200);
    expect(response.body.hits).toMatchSnapshot();
  });

  test("return idcc results for pati", async () => {
    const response = await request(server).get(`/api/idcc?q=pati`);
    expect(response.status).toBe(200);
    expect(response.body.hits).toMatchSnapshot();
  });

  test("return idcc results in correct order for banque", async () => {
    const response = await request(server).get(`/api/idcc?q=banque`);
    expect(response.status).toBe(200);
    expect(response.body.hits).toMatchSnapshot();
  });

  test("return idcc for number 27", async () => {
    const response = await request(server).get(`/api/idcc?q=27`);
    expect(response.status).toBe(200);
    expect(response.body.hits).toMatchSnapshot();
  });

  it("should return nothing", async () => {
    const res = await request(server).get("/api/idcc?q=blabla");
    expect(res.status).toBe(200);
    expect(res.body).toMatchSnapshot();
  });

  it("should return a not published agreement", async () => {
    const res = await request(server).get("/api/idcc?q=1468");
    expect(res.status).toBe(200);
    expect(res.body.hits.hits).toHaveLength(1);
    expect(res.body.hits.hits[0]._source.num).toBe(1468);
  });
});
