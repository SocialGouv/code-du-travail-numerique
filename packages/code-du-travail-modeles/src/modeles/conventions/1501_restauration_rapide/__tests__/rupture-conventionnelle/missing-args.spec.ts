import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "1501"
);

describe("CC 1501 - Wording question sur la rupture conventionnelle", () => {
  test("Vérification que l'age est demandé à la date de la rupture du contrat de travail", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC1501'",
      "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . catégorie professionnelle": `'Cadres'`,
      "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . licenciement économique": `'Oui'`,
    };

    const { missingArgs } = engine.calculate(input);
    expect(missingArgs).toHaveNextMissingRule(
      "contrat salarié . convention collective . restauration rapide . rupture conventionnelle . age"
    );
    expect(missingArgs).toHaveNextMissingQuestion(
      "Quel est l'âge du salarié à la date de la rupture du contrat de travail&nbsp;?"
    );
  });

  test("L'age n'est plus demandé si on le renseigne", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC1501'",
      "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . catégorie professionnelle": `'Cadres'`,
      "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . licenciement économique": `'Oui'`,
      "contrat salarié . convention collective . restauration rapide . rupture conventionnelle . age":
        "45",
    };

    const { missingArgs } = engine.calculate(input);
    expect(missingArgs).toHaveNextMissingRule(null);
  });
});
