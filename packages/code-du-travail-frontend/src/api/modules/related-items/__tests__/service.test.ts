/** @jest-environment node */

import { getRelatedItems } from "../service";

describe("RelatedItems", () => {
  it("getRelatedItems", async () => {
    const result = await getRelatedItems(
      { _id: "5" },
      "quelles-sont-les-consequences-du-deces-de-lemployeur-sur-le-contrat-de-travail"
    );
    expect(result).toEqual([
      {
        items: [
          {
            source: "outils",
            title: "Heures d'absence pour rechercher un emploi",
            url: "/outils/heures-recherche-emploi",
          },
          {
            source: "outils",
            title: "Préavis de démission",
            url: "/outils/preavis-demission",
          },
        ],
        title: "Modèles et outils liés",
      },
      {
        items: [
          {
            source: "fiches_service_public",
            title: "Démission d'une assistante maternelle",
            url: "https://www.service-public.fr/particuliers/vosdroits/F33164",
          },
          {
            source: "fiches_service_public",
            title: "Certificat de travail",
            url: "https://www.service-public.fr/particuliers/vosdroits/F87",
          },
          {
            source: "contributions",
            title: "Les congés pour événements familiaux",
            url: "/contribution/les-conges-pour-evenements-familiaux",
          },
        ],
        title: "Articles liés",
      },
    ]);
  });
});
