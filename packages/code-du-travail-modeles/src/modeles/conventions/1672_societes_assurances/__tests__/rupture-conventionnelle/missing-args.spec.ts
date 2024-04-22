import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "1672"
);

describe("CC 1672 - Wording question sur la rupture conventionnelle", () => {
  test("Vérification que l'age est demandé à la date de la rupture du contrat de travail", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC1672'",
      "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
        "'Cadres (Classes 5 à 7)'",
      "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . avant non cadres":
        "'Oui'",
      "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . date du statut cadre":
        "01/01/2000",
    };

    const { missingArgs } = engine.calculate(input);
    expect(missingArgs).toHaveNextMissingQuestion(
      "Quel est l'âge du salarié à la date de la rupture du contrat de travail&nbsp;?"
    );
  });
});
