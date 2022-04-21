import type { SuperTest } from "supertest";
import supertest from "supertest";

import { app } from "..";

const mostSearches = [
  "3239", // popular
  "indemnités de licenciement",
  "indemnité licenciement",
  "congés payés",
  "rupture conventionnelle cdi",
  "licenciement",
  "convention collective",
  "heures supplémentaires",
  "période d'essai",
  "licenciement inaptitude",
  "Préavis",
  "Congés payés et fractionnement",
  "Solde de tout compte",
  "amiante", // pré-qualifié
  "covid 19 (variante de coronavirus)",
  "lettre de démission (variante de lettre-demission)",
  "syntec", // synonymes
  "1596",
  "1597",
  "HCR",
];

describe("Search - Snapshot result", () => {
  let server: any;
  let request: SuperTest<any>;

  beforeEach(() => {
    server = app.listen(3000);
    request = supertest(server);
  });

  afterEach(() => {
    server.close();
  });

  it("should be defined", async () => {
    const res = await request.get("/");
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({ message: "running" });
  });

  it.each(mostSearches)("should return a result for %s", async (search) => {
    const url = `/api/v1/search?q=${encodeURIComponent(search)}`;
    const res = await request.get(url);
    expect(res.status).toBe(200);
    expect(res.body).toMatchSnapshot();
  });
});
