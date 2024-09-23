import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2609"
);

describe("CC 2609 - missing args", () => {
  test("Vérification que l'age est demandé", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC2609'",
    };

    const result = engine.calculate(input);
    expect(result).toNextMissingQuestionBeEqual(
      "Quel est l’âge du salarié à la fin de son préavis (exécuté ou non)&nbsp;?"
    );
  });
});
