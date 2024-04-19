import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "176"
);

describe("CC 176 - Wording question sur la rupture conventionnelle", () => {
  test("Vérification que l'age est demandé à la date de la rupture du contrat de travail", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC0176'",
      "contrat salarié . indemnité de licenciement . date d'entrée":
        "01/07/2019",
    };

    const result = engine.calculate(input);
    expect(result).toNextMissingQuestionBeEqual(
      "Quel est l'âge du salarié à la date de la rupture du contrat de travail&nbsp;?"
    );
  });
});
