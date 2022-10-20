import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../internal/merger";
import { QuestionOuiNon } from "../../../plugins";
import { CatPro573 } from "../../../plugins/formule/573_commerces_de_gros";

const engine = new Engine(mergeIndemniteLicenciementModels());

describe("Indemnité conventionnel de licenciement pour la CC 573", () => {
  describe("Cas standard", () => {
    test.each`
      age   | category            | typeLicenciement      | auMoins15AnsCadre     | seniority | salary
      ${32} | ${CatPro573.autres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${2}      | ${2500}
      ${32} | ${CatPro573.autres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${2}      | ${2500}
      ${32} | ${CatPro573.autres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${2}      | ${2500}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, age $age, type de licenciement $typeLicenciement, catégorie $category => $expectedCompensation €",
      ({ seniority, salary, category }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC0573'",
            "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${category}'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          })
          .evaluate(
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );

        expect(result.missingVariables).toEqual({
          "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . age": 2.0007,
          "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . age . licenciement économique": 2.0004999999999997,
          "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . age . licenciement économique . cadre durant au moins de 15 ans": 2.0003,
        });
      }
    );
  });
});
