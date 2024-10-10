/** @jest-environment node */

import { fetchAllInformations } from "../queries";

describe("Informations", () => {
  it("Récupération de tous les informations", async () => {
    const result = await fetchAllInformations(["slug", "title", "date"]);
    expect(result).toEqual([
      {
        date: "29/05/2024",
        slug: "exemples-de-contrats-de-travail-cdi-et-cdd",
        title: "Exemples de contrats de travail CDI et CDD",
      },
      {
        date: "14/08/2024",
        slug: "rupture-conventionnelle-individuelle-la-procedure-en-details",
        title:
          "Rupture conventionnelle : les étapes de la procédure et les délais",
      },
    ]);
  });
});
