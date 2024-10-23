/** @jest-environment node */

import { fetchTools } from "../queries";

describe("Outils", () => {
  it("Récupération de tous les outils", async () => {
    const result = await fetchTools(["slug", "title", "icon"]);
    expect(result).toEqual([
      {
        icon: "Indemnity",
        slug: "indemnite-licenciement",
        title: "Indemnité de licenciement",
      },
      {
        icon: "Rules",
        slug: "preavis-demission",
        title: "Préavis de démission",
      },
      {
        icon: "Time",
        slug: "heures-recherche-emploi",
        title: "Heures d'absence pour rechercher un emploi",
      },
    ]);
  });
});
