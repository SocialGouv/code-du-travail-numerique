import {
  IndemniteDepartVolontaireRetraiteReferences,
  IndemniteMiseRetraiteReferences,
} from "../../../../__test__/common/legal-references";
import { IndemniteRetraitePublicodes } from "../../../../publicodes";

describe("Références juridiques de l'indemnité de départ ou de mise à la retraite", () => {
  test.each`
    origine                 | miseALaRetraite | expectedReferences
    ${"mise à la retraite"} | ${"oui"}        | ${IndemniteMiseRetraiteReferences}
    ${"départ volontaire"}  | ${"non"}        | ${IndemniteDepartVolontaireRetraiteReferences}
  `(
    "affiche uniquement les articles du $origine",
    ({ miseALaRetraite, expectedReferences }) => {
      const engine = new IndemniteRetraitePublicodes(modelsIndemniteRetraite);
      engine.setSituation({
        "contrat salarié . indemnité de licenciement . ancienneté en année":
          "12",
        "contrat salarié . indemnité de licenciement . ancienneté requise en année":
          "12",
        "contrat salarié . indemnité de licenciement . salaire de référence":
          "1000",
        "contrat salarié . indemnité de retraite . mise à la retraite":
          miseALaRetraite,
      });

      const result = engine.getReferences();

      expect(result).toHaveLength(expectedReferences.length);
      expect(result).toEqual(expect.arrayContaining(expectedReferences));
    }
  );

  // Le simulateur ne s'appuie que sur le Code du travail : aucun article
  // propre au licenciement ne doit fuiter dans le résultat.
  test.each`
    miseALaRetraite
    ${"oui"}
    ${"non"}
  `(
    "n'expose aucun article du licenciement (mise à la retraite = $miseALaRetraite)",
    ({ miseALaRetraite }) => {
      const engine = new IndemniteRetraitePublicodes(modelsIndemniteRetraite);
      engine.setSituation({
        "contrat salarié . indemnité de licenciement . ancienneté en année":
          "12",
        "contrat salarié . indemnité de licenciement . ancienneté requise en année":
          "12",
        "contrat salarié . indemnité de licenciement . salaire de référence":
          "1000",
        "contrat salarié . indemnité de retraite . mise à la retraite":
          miseALaRetraite,
      });

      const articles = engine.getReferences().map(({ article }) => article);

      expect(articles.filter((a) => a.includes("1234"))).toEqual([]);
    }
  );
});
