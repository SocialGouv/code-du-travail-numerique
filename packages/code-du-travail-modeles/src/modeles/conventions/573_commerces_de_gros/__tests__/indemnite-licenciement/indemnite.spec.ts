import { QuestionOuiNon } from "../../../../common";
import { CatPro573 } from "../../salary";

describe("Indemnité conventionnel de licenciement pour la CC 573", () => {
  describe("Autres", () => {
    test.each`
      category            | seniority | salary  | expectedCompensation
      ${CatPro573.autres} | ${0.91}   | ${2500} | ${0}
      ${CatPro573.autres} | ${1}      | ${2500} | ${500}
      ${CatPro573.autres} | ${15}     | ${2500} | ${9166.67}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, catégorie $category => $expectedCompensation €",
      ({ seniority, salary, expectedCompensation, category }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC0573'",
            "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${category}'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . ancienneté requise en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
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

  describe("Agents", () => {
    test.each`
      age   | category            | typeLicenciement      | seniority | salary  | expectedCompensation
      ${32} | ${CatPro573.agents} | ${QuestionOuiNon.non} | ${0.5}    | ${2700} | ${0}
      ${32} | ${CatPro573.agents} | ${QuestionOuiNon.non} | ${0.99}   | ${2700} | ${0}
      ${32} | ${CatPro573.agents} | ${QuestionOuiNon.non} | ${1}      | ${2700} | ${540}
      ${32} | ${CatPro573.agents} | ${QuestionOuiNon.non} | ${15}     | ${2700} | ${9900}
      ${40} | ${CatPro573.agents} | ${QuestionOuiNon.oui} | ${1}      | ${2700} | ${540}
      ${40} | ${CatPro573.agents} | ${QuestionOuiNon.oui} | ${14}     | ${2700} | ${9000}
      ${57} | ${CatPro573.agents} | ${QuestionOuiNon.oui} | ${14}     | ${2700} | ${9000}
      ${55} | ${CatPro573.agents} | ${QuestionOuiNon.oui} | ${15}     | ${2700} | ${11664}
      ${56} | ${CatPro573.agents} | ${QuestionOuiNon.oui} | ${25}     | ${2700} | ${16200}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, catégorie $category, age $age, typeLicenciement $typeLicenciement => $expectedCompensation €",
      ({
        seniority,
        salary,
        typeLicenciement,
        expectedCompensation,
        category,
        age,
      }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC0573'",
            "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${category}'`,
            "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . agents . licenciement économique . age": age,
            "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . agents . licenciement économique question": `'${typeLicenciement}'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . ancienneté requise en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
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

  describe("Cadres", () => {
    test.each`
      age   | category            | auMoins15AnsCadre     | seniority | salary  | expectedCompensation
      ${32} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${0.99}   | ${3200} | ${0}
      ${32} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${1}      | ${3200} | ${640}
      ${32} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${4}      | ${3200} | ${2560}
      ${32} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${5}      | ${3200} | ${3200}
      ${40} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${6}      | ${3200} | ${5760}
      ${40} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${10}     | ${3200} | ${9920}
      ${40} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${23}     | ${3200} | ${27840}
      ${40} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${23}     | ${3200} | ${27840}
      ${52} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${6}      | ${3200} | ${5760}
      ${52} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${10}     | ${3200} | ${9920}
      ${52} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${23}     | ${3200} | ${32016}
      ${52} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${23}     | ${3200} | ${27840}
      ${57} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${6}      | ${3200} | ${5760}
      ${57} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${10}     | ${3200} | ${9920}
      ${57} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${23}     | ${3200} | ${33408}
      ${57} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${23}     | ${3200} | ${27840}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, age $age, type de licenciement $typeLicenciement, catégorie $category => $expectedCompensation €",
      ({
        seniority,
        salary,
        expectedCompensation,
        category,
        auMoins15AnsCadre,
        age,
      }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC0573'",
            "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${category}'`,
            "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . cadres . cadre durant au moins de 15 ans . age": age,
            "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . cadres . cadre durant au moins de 15 ans question": `'${auMoins15AnsCadre}'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . ancienneté requise en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
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
