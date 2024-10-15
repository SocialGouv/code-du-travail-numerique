/** @jest-environment node */

import { fetchModels } from "../queries";

describe("Modèles de courrier", () => {
  it("Récupération de tous les modèles de courrier", async () => {
    const result = await fetchModels(["slug", "title", "type"]);
    expect(result).toEqual([
      {
        slug: "demande-de-rendez-vous-en-vue-dune-rupture-conventionnelle",
        title: "Demande de rendez-vous en vue d’une rupture conventionnelle",
      },
      {
        slug: "rupture-de-periode-dessai-a-linitiative-de-lemployeur",
        title: "Rupture de période d’essai à l’initiative de l’employeur",
      },
      {
        slug: "certificat-de-travail",
        title: "Certificat de travail",
      },
    ]);
  });
});
