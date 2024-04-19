import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
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
    expect(missingArgs).toHaveNextMissingQuestion(
      "Quel est l'âge du salarié à la date de notification de son licenciement&nbsp;?"
    );
  });
});
