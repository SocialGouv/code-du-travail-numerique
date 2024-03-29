import { getSitemapData } from "../service";

describe("Sitemap", () => {
  it("getSitemapData returns empty array if contrib does not exists", async () => {
    const result = await getSitemapData();
    expect(Object.keys(result)).toEqual([
      "themes",
      "tools",
      "modeles",
      "contributions",
      "agreements",
    ]);
    expect(result.tools[0]).toEqual({
      _id: "14",
      displayTool: true,
      slug: "indemnite-licenciement",
      title: "Indemnité de licenciement",
    });
    expect(result.contributions).toEqual([
      {
        agreements: [],
        generic: {
          slug: "les-conges-pour-evenements-familiaux",
          title: "Les congés pour événements familiaux",
        },
      },
      {
        agreements: [
          {
            idcc: "0044",
            slug: "44-quand-le-salarie-a-t-il-droit-a-une-prime-danciennete-quel-est-son-montant",
            title:
              "Quand le salarié a-t-il droit à une prime d’ancienneté ? Quel est son montant ?",
          },
        ],
        generic: {
          idcc: "0000",
          slug: "quand-le-salarie-a-t-il-droit-a-une-prime-danciennete-quel-est-son-montant",
          title:
            "Quand le salarié a-t-il droit à une prime d’ancienneté ? Quel est son montant ?",
        },
      },
      {
        agreements: [
          {
            slug: "44-quelles-sont-les-consequences-du-deces-de-lemployeur-sur-le-contrat-de-travail",
            split: true,
            title:
              "Quelles sont les conséquences du décès de l’employeur sur le contrat de travail ?",
          },
          {
            slug: "1090-quelles-sont-les-consequences-du-deces-de-lemployeur-sur-le-contrat-de-travail",
            split: true,
            title:
              "Quelles sont les conséquences du décès de l’employeur sur le contrat de travail ? - Services de l'automobile",
          },
        ],
        generic: {
          slug: "quelles-sont-les-consequences-du-deces-de-lemployeur-sur-le-contrat-de-travail",
          title:
            "Quelles sont les conséquences du décès de l’employeur sur le contrat de travail ?",
        },
      },
    ]);
  });
});
