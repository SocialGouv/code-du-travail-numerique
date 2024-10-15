/** @jest-environment node */

import { fetchRootThemes } from "../queries";

describe("Thèmes", () => {
  it("Récupération de tous les thèmes", async () => {
    const result = await fetchRootThemes(["slug", "title", "children"]);
    expect(result).toEqual([
      {
        children: [
          {
            label: "Embauche",
            slug: "embauche",
          },
          {
            label: "Contrat de travail",
            slug: "contrat-de-travail",
          },
        ],
        slug: "embauche-et-contrat-de-travail",
        title: "Embauche et contrat de travail",
      },
      {
        children: [
          {
            label: "Documents à remettre au salarié",
            slug: "documents-a-remettre-au-salarie",
          },
          {
            label: "Démission",
            slug: "demission",
          },
          {
            label: "Fin d’un CDD - CTT",
            slug: "fin-dun-cdd-ctt",
          },
          {
            label: "Rupture conventionnelle",
            slug: "rupture-conventionnelle",
          },
          {
            label: "Licenciement : droits des salariés et procédures",
            slug: "licenciement-droits-des-salaries-et-procedures",
          },
          {
            label: "Retraite",
            slug: "retraite",
          },
          {
            label: "Autres départs",
            slug: "autres-departs",
          },
        ],
        slug: "depart-de-lentreprise",
        title: "Départ de l’entreprise",
      },
    ]);
  });
});
