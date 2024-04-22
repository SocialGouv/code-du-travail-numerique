import { RuptureConventionnellePublicodes } from "../../../../../publicodes";
import { CatPro573 } from "../../salary";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "573"
);

describe("CC 573 - Wording question sur la rupture conventionnelle", () => {
  test("Agents - Vérification que l'age est demandé à la date de la rupture du contrat de travail", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC0573'",
      "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${CatPro573.agents}'`,
      "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . agents . licenciement économique question": `'Oui'`,
    };

    const result = engine.calculate(input);
    expect(result).toNextMissingQuestionBeEqual(
      "Quel est l'âge du salarié à la date de la rupture du contrat de travail&nbsp;?"
    );
  });

  test("Cadres - Vérification que l'age est demandé à la date de la rupture du contrat de travail", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC0573'",
      "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${CatPro573.cadres}'`,
      "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . cadres . cadre durant au moins de 15 ans question": `'Oui'`,
    };

    const result = engine.calculate(input);
    expect(result).toNextMissingQuestionBeEqual(
      "Quel est l'âge du salarié à la date de la rupture du contrat de travail&nbsp;?"
    );
  });
});
