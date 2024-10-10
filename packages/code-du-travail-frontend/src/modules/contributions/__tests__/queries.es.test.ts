/** @jest-environment node */

import { fetchAllContributions } from "../queries";

describe("Contributions", () => {
  it("Récupération de toutes les contributions", async () => {
    const result = await fetchAllContributions([
      "slug",
      "title",
      "contentType",
    ]);
    expect(result).toEqual([
      {
        slug: "les-conges-pour-evenements-familiaux",
        title: "Les congés pour événements familiaux",
      },
      {
        slug: "quelles-sont-les-consequences-du-deces-de-lemployeur-sur-le-contrat-de-travail",
        title:
          "Quelles sont les conséquences du décès de l’employeur sur le contrat de travail ?",
      },
      {
        slug: "44-quelles-sont-les-consequences-du-deces-de-lemployeur-sur-le-contrat-de-travail",
        title:
          "Quelles sont les conséquences du décès de l’employeur sur le contrat de travail ?",
      },
      {
        slug: "1090-quelles-sont-les-consequences-du-deces-de-lemployeur-sur-le-contrat-de-travail",
        title:
          "Quelles sont les conséquences du décès de l’employeur sur le contrat de travail ?",
      },
      {
        slug: "quand-le-salarie-a-t-il-droit-a-une-prime-danciennete-quel-est-son-montant",
        title:
          "Quand le salarié a-t-il droit à une prime d’ancienneté ? Quel est son montant ?",
      },
      {
        contentType: "ANSWER",
        slug: "44-quand-le-salarie-a-t-il-droit-a-une-prime-danciennete-quel-est-son-montant",
        title:
          "Quand le salarié a-t-il droit à une prime d’ancienneté ? Quel est son montant ?",
      },
    ]);
  });
});
