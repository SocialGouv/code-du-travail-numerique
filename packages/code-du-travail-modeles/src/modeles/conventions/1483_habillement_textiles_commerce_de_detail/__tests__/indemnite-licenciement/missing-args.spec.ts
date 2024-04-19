import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1483"
);

describe("CC 1483 - missing args", () => {
  test("Vérification que l'age est demandé", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC1483'",
      "contrat salarié . convention collective . habillement textiles commerce de detail . catégorie professionnelle": `'Cadres'`,
    };

    const result = engine.calculate(input);
    expect(result).toNextMissingQuestionBeEqual(
      "Quel est l'âge du salarié à la fin de son préavis (exécuté ou non)&nbsp;?"
    );
  });
});
