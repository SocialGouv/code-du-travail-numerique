import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2148"
);

describe("CC 2148 - missing args", () => {
  test("Vérification que l'age est demandé", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC2148'",
    };

    const result = engine.calculate(input);
    expect(result).toNextMissingQuestionBeEqual(
      "Quel est l'âge du salarié à la date de notification de son licenciement&nbsp;?"
    );
  });
});
