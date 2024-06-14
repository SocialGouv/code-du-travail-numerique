/** @jest-environment node */

import request from "supertest";
import server from "nextjs-http-supertest";

describe("Sheets-mt", () => {
  afterAll(() => {
    server.close();
  });

  it("should return an item for /sheets-mt/[slug]", async () => {
    const res = await request(server).get(
      "/api/sheets-mt/5-questions-reponses-sur-la-sante-au-travail"
    );
    expect(res.status).toBe(200);
    expect(res.body).toMatchSnapshot();
  });

  it("should return an error for /sheets-mt/[slug]", async () => {
    const res = await request(server).get("/api/sheets-mt/blabla");
    expect(res.status).toBe(404);
  });
});
