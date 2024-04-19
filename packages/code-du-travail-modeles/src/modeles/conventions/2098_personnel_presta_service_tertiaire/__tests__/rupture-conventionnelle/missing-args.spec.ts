import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "2098"
);

describe("CC 2098 - Wording question sur la rupture conventionnelle", () => {
  test("Vérification que l'age est demandé à la date de la rupture du contrat de travail", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC2098'",
      "contrat salarié . convention collective . personnel presta service tertiaire . autre licenciement . catégorie professionnelle":
        "'Cadres'",
      "contrat salarié . convention collective . personnel presta service tertiaire . inaptitude suite à un accident non professionnelle":
        "'Non'",
    };

    const { missingArgs } = engine.calculate(input);
    expect(missingArgs).toHaveNextMissingQuestion(
      "Quel est l'âge du salarié à la date de la rupture du contrat de travail&nbsp;?"
    );
  });
});
