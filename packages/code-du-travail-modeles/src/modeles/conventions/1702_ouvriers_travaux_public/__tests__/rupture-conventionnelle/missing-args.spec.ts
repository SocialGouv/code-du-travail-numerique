import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "1702"
);

describe("CC 1702 - Wording question sur la rupture conventionnelle", () => {
  test("Vérification que l'age est demandé à la date de la rupture du contrat de travail", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC1702'",
    };

    const result = engine.calculate(input);
    expect(result).toNextMissingQuestionBeEqual(
      "Quel est l'âge du salarié à la date de la rupture du contrat de travail&nbsp;?"
    );
  });
});
