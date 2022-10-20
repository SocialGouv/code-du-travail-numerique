import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../internal/merger";
import { QuestionOuiNon } from "../../../plugins";
import { CatPro573 } from "../../../plugins/formule/573_commerces_de_gros";

const engine = new Engine(mergeIndemniteLicenciementModels());

describe("Indemnité conventionnel de licenciement pour la CC 573", () => {
  describe("Cas standard", () => {
    test.each`
      age   | category            | typeLicenciement      | auMoins15AnsCadre     | seniority | salary  | expectedCompensation
      ${32} | ${CatPro573.autres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${0.91}   | ${2500} | ${0}
      ${32} | ${CatPro573.autres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${1}      | ${2500} | ${500}
      ${32} | ${CatPro573.autres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${15}     | ${2500} | ${9166.67}
      ${32} | ${CatPro573.agents} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${0.5}    | ${2700} | ${0}
      ${32} | ${CatPro573.agents} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${1}      | ${2700} | ${540}
      ${32} | ${CatPro573.agents} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${15}     | ${2700} | ${9900}
      ${40} | ${CatPro573.agents} | ${QuestionOuiNon.oui} | ${QuestionOuiNon.oui} | ${1}      | ${2700} | ${540}
      ${40} | ${CatPro573.agents} | ${QuestionOuiNon.oui} | ${QuestionOuiNon.oui} | ${14}     | ${2700} | ${9000}
      ${57} | ${CatPro573.agents} | ${QuestionOuiNon.oui} | ${QuestionOuiNon.oui} | ${14}     | ${2700} | ${9000}
      ${55} | ${CatPro573.agents} | ${QuestionOuiNon.oui} | ${QuestionOuiNon.oui} | ${15}     | ${2700} | ${11664}
      ${56} | ${CatPro573.agents} | ${QuestionOuiNon.oui} | ${QuestionOuiNon.oui} | ${25}     | ${2700} | ${16200}
      ${32} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${4}      | ${3200} | ${2560}
      ${32} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${5}      | ${3200} | ${3200}
      ${40} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${6}      | ${3200} | ${5760}
      ${40} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${10}     | ${3200} | ${9920}
      ${40} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${23}     | ${3200} | ${27840}
      ${52} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${6}      | ${3200} | ${5760}
      ${52} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${10}     | ${3200} | ${9920}
      ${52} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${23}     | ${3200} | ${32016}
      ${52} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.non} | ${23}     | ${3200} | ${27840}
      ${57} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${6}      | ${3200} | ${5760}
      ${57} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${10}     | ${3200} | ${9920}
      ${57} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.oui} | ${23}     | ${3200} | ${33408}
      ${57} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${QuestionOuiNon.non} | ${23}     | ${3200} | ${27840}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, age $age, type de licenciement $typeLicenciement, catégorie $category => $expectedCompensation €",
      ({
        seniority,
        salary,
        expectedCompensation,
        category,
        typeLicenciement,
        auMoins15AnsCadre,
        age,
      }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC0573'",
            "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${category}'`,
            "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . age":
              age,
            "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . age . licenciement économique": `'${typeLicenciement}'`,
            "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . age . licenciement économique . cadre durant au moins de 15 ans": `'${auMoins15AnsCadre}'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          })
          .evaluate(
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );

        expect(result.nodeValue).toEqual(expectedCompensation);
        expect(result.missingVariables).toEqual({});
        expect(result.unit?.numerators).toEqual(["€"]);
      }
    );
  });
});
