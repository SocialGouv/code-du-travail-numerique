import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1606"
);

describe("CC 1606 - missing args", () => {
  test("Vérification que l'age est demandé", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC1606'",
      "contrat salarié . convention collective . bricolage . catégorie professionnelle": `'Cadres'`,
    };

    const result = engine.calculate(input);
    expect(result).toNextMissingQuestionBeEqual(
      "Quel est l'âge du salarié à la date de notification de son licenciement&nbsp;?"
    );
  });
});
