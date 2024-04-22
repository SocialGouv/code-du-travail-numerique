import { RuptureConventionnellePublicodes } from "../../../../../publicodes";
import { CategoryPro44 } from "../../salary";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "44"
);

describe("CC 44 - Wording question sur la rupture conventionnelle", () => {
  test("Vérification que l'age est demandé à la date de la rupture du contrat de travail", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC0044'",
      "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle": `${CategoryPro44.ouvrier}`,
    };

    const { missingArgs } = engine.calculate(input);
    expect(missingArgs).toHaveNextMissingQuestion(
      "Quel est l'âge du salarié à la date de la rupture du contrat de travail&nbsp;?"
    );
  });
});
