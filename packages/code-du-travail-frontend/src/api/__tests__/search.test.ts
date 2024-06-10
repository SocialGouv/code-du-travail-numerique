/** @jest-environment node */

import request from "supertest";
import server from "nextjs-http-supertest";

describe("Search", () => {
  afterAll(() => {
    server.close();
  });

  it("should return a list of suggestion", async () => {
    const res = await request(server).get("/api/search?q=code-du-travail");
    expect(res.status).toBe(200);
    expect(res.body).toMatchSnapshot();
  });

  it("should return nothing", async () => {
    const res = await request(server).get("/api/search?q=a");
    expect(res.status).toBe(200);
    expect(res.body).toMatchSnapshot();
  });

  it("returns 3 search results for demission from elastic if size = 3", async () => {
    const response = await request(server).get(
      "/api/search?q=démission&skipSavedResults&size=3"
    );
    expect(response.status).toBe(200);
    expect(response.body.documents.length).toBe(3);
  });
});
