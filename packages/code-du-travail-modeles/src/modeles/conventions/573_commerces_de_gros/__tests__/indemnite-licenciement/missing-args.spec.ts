import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";
import { CatPro573 } from "../../salary";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "573"
);

describe("CC 573 - missing args", () => {
  test("Agents - Vérification que l'age est demandé", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC0573'",
      "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${CatPro573.agents}'`,
      "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . agents . licenciement économique question": `'Oui'`,
    };

    const { missingArgs } = engine.calculate(input);
    expect(missingArgs).toHaveNextMissingQuestion(
      "Quel est l'âge du salarié à la date de notification de son licenciement&nbsp;?"
    );
  });

  test("Cadres - Vérification que l'age est demandé", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC0573'",
      "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${CatPro573.cadres}'`,
      "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . cadres . cadre durant au moins de 15 ans question": `'Oui'`,
    };

    const { missingArgs } = engine.calculate(input);
    expect(missingArgs).toHaveNextMissingQuestion(
      "Quel est l'âge du salarié à la date de notification de son licenciement&nbsp;?"
    );
  });
});
