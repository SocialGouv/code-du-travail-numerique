import fs from "fs";
import type { SuperTest } from "supertest";
import supertest from "supertest";

import { app } from "../../..";

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
  "particulier employeur",
  "particuliers employeurs",
  "assistantes maternelles",
  "assistant maternel",
  "convention collective assistante maternelle",
];

describe("Search - Snapshot result", () => {
  let server: any;
  let request: SuperTest<any>;

  beforeAll(() => {
    server = app.listen(3000);
    request = supertest(server);
  });

  afterAll(() => {
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
    const documents = res.body.documents;
    const result = documents.map((r: any) => ({
      slug: r.slug,
      source: r.source,
    }));
    fs.writeFileSync(
      __dirname + `/search_results/${search.replace(/\s/g, "_")}.json`,
      JSON.stringify(result, null, 2)
    );
    expect(res.status).toBe(200);
  });
});
