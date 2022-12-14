import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../../../internal/merger";
import { CatPro3239 } from "../../salary";

const engine = SingletonEnginePublicodes.getInstance();

describe("Suppression de l'étape indemnité de licenciement pour la CC 3239", () => {
  test("Avec des informations basiques", () => {
    const situation = engine.setSituation({
      "contrat salarié . convention collective": "'IDCC3239'",
      "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle": `'${CatPro3239.assistantMaternel}'`,
      "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement": `'Non'`,
      "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement . autres . total salaires": 30000,
      "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": 2,
      "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 0,
    });

    const result = situation.evaluate(
      "contrat salarié . indemnité de licenciement . étape salaire désactivée"
    );

    expect(result.missingVariables).toEqual({});
    expect(result.nodeValue).toEqual(true);
  });

  test("Avec des informations basiques mais avec oui", () => {
    const situation = engine.setSituation({
      "contrat salarié . convention collective": "'IDCC3239'",
      "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle": `'${CatPro3239.assistantMaternel}'`,
      "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement": `'Oui'`,
      "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement . autres . total salaires": 30000,
      "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": 2,
      "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 0,
    });

    const result = situation.evaluate(
      "contrat salarié . indemnité de licenciement . étape salaire désactivée"
    );

    expect(result.missingVariables).toEqual({});
    expect(result.nodeValue).toEqual(false);
  });
});
