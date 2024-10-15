/** @jest-environment node */

import { fetchAllAgreements } from "../queries";

describe("Conventions collectives", () => {
  it("Récupération de toutes les conventions collectives", async () => {
    const result = await fetchAllAgreements(["slug", "title", "num"]);
    expect(result).toEqual([
      {
        num: 843,
        slug: "843-boulangerie-patisserie-entreprises-artisanales",
        title:
          "Convention collective nationale de la boulangerie-pâtisserie du 19 mars 1976.  Etendue par arrêté du 21 juin 1978 JONC 28 juillet 1978.",
      },
      {
        num: 2120,
        slug: "2120-banque",
        title:
          "Convention collective nationale de la banque du 10 janvier 2000.  Etendue par arrêté du 17 novembre 2004 JORF 11 décembre 2004.",
      },
      {
        num: 1090,
        slug: "1090-services-de-lautomobile-commerce-et-reparation-de-lautomobile-du-cycle",
        title:
          "Services de l'automobile Convention collective nationale du commerce et de la réparation de l'automobile, du cycle et du motocycle et des activités connexes, ainsi que du contrôle technique automobile du 15 janvier 1981. Etendue par arrêté du 30 octobre 1981 JONC 3 décembre 1981.",
      },
      {
        num: 1234,
        slug: "1518-education-culture-loisirs-et-animation-au-service-des-territoires-eclat",
        title:
          "Éducation, culture, loisirs et animation au service des territoires (ÉCLAT)",
      },
    ]);
  });
});
