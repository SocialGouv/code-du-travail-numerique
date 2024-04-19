import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "1596"
);

describe("CC 1596 - Wording question sur la rupture conventionnelle", () => {
  test("Vérification que l'age est demandé à la date de la rupture du contrat de travail", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC1596'",
    };

    const { missingArgs } = engine.calculate(input);
    expect(missingArgs).toHaveNextMissingQuestion(
      "Quel est l'âge du salarié à la date de la rupture du contrat de travail&nbsp;?"
    );
  });
});
