import { SOURCES } from "@socialgouv/cdtn-utils";

import { fromDocumentBreadcrumbs, listingSegment } from "../segments";

describe("segments du fil d'Ariane", () => {
  describe("listingSegment", () => {
    // Verrouille le contrat de l'issue #7378 : ce sont ces trois libellés et
    // ces trois URL qui doivent apparaître sur les pages de contenu natif.
    it.each([
      [SOURCES.CONTRIBUTIONS, "Fiches pratiques", "/contribution"],
      [SOURCES.INFOGRAPHICS, "Infographies", "/infographie"],
      [SOURCES.LETTERS, "Modèles de documents", "/modeles-de-courriers"],
      [SOURCES.TOOLS, "Simulateurs", "/outils"],
    ])("mappe %s vers %s", (source, label, href) => {
      expect(listingSegment(source)).toEqual({ label, href });
    });
  });

  describe("fromDocumentBreadcrumbs", () => {
    it("convertit les slugs en href et préserve l'ordre", () => {
      expect(
        fromDocumentBreadcrumbs([
          { label: "Congés et repos", position: 3, slug: "/themes/conges" },
          { label: "Congés", position: 1, slug: "/themes/conges-payes" },
        ])
      ).toEqual([
        { label: "Congés et repos", href: "/themes/conges" },
        { label: "Congés", href: "/themes/conges-payes" },
      ]);
    });

    it("renvoie une liste vide quand le document n'a pas de thème", () => {
      expect(fromDocumentBreadcrumbs()).toEqual([]);
      expect(fromDocumentBreadcrumbs([])).toEqual([]);
    });
  });
});
