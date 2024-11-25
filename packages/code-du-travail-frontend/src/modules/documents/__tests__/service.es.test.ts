/** @jest-environment node */

import { fetchRelatedItems } from "../fetch-related-items";

describe("RelatedItems", () => {
  it("getRelatedItems", async () => {
    const result = await fetchRelatedItems(
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
            url: "/fiche-service-public/demission-dune-assistante-maternelle",
          },
          {
            source: "fiches_service_public",
            title: "Certificat de travail",
            url: "/fiche-service-public/certificat-de-travail",
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
