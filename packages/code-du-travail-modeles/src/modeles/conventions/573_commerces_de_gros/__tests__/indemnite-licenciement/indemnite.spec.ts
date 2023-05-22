import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";
import { QuestionOuiNon } from "../../../../common";
import { CatPro573 } from "../../salary";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "573"
);

describe("Indemnité conventionnel de licenciement pour la CC 573", () => {
  describe("Autres", () => {
    test.each`
      category            | seniorityRight | seniority | salary  | expectedCompensation
      ${CatPro573.autres} | ${0.91}        | ${0.91}   | ${2500} | ${0}
      ${CatPro573.autres} | ${0.91}        | ${1}      | ${2500} | ${0}
      ${CatPro573.autres} | ${1}           | ${1}      | ${2500} | ${500}
      ${CatPro573.autres} | ${1}           | ${15}     | ${2500} | ${9166.67}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, catégorie $category => $expectedCompensation €",
      ({
        seniority,
        seniorityRight,
        salary,
        expectedCompensation,
        category,
      }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0573'",
            "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${category}'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );

        expect(result.value).toEqual(expectedCompensation);
        expect(missingArgs).toEqual([]);
        expect(result.unit?.numerators).toEqual(["€"]);
      }
    );
  });

  describe("Agents", () => {
    test.each`
      age   | typeLicenciement      | seniorityRight | seniority | salary  | expectedCompensation
      ${32} | ${QuestionOuiNon.non} | ${0.5}         | ${0.5}    | ${2700} | ${0}
      ${32} | ${QuestionOuiNon.non} | ${0.99}        | ${0.99}   | ${2700} | ${0}
      ${32} | ${QuestionOuiNon.non} | ${0.99}        | ${1}      | ${2700} | ${0}
      ${32} | ${QuestionOuiNon.non} | ${1}           | ${1}      | ${2700} | ${540}
      ${32} | ${QuestionOuiNon.non} | ${1}           | ${15}     | ${2700} | ${9900}
      ${40} | ${QuestionOuiNon.oui} | ${1}           | ${1}      | ${2700} | ${540}
      ${40} | ${QuestionOuiNon.oui} | ${1}           | ${14}     | ${2700} | ${9000}
      ${57} | ${QuestionOuiNon.oui} | ${1}           | ${14}     | ${2700} | ${9000}
      ${55} | ${QuestionOuiNon.oui} | ${1}           | ${15}     | ${2700} | ${11664}
      ${56} | ${QuestionOuiNon.oui} | ${2}           | ${25}     | ${2700} | ${16200}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, catégorie Agents, age $age, typeLicenciement $typeLicenciement => $expectedCompensation €",
      ({
        seniority,
        seniorityRight,
        salary,
        typeLicenciement,
        expectedCompensation,
        age,
      }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0573'",
            "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${CatPro573.agents}'`,
            "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . agents . licenciement économique . age":
              age,
            "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . agents . licenciement économique question": `'${typeLicenciement}'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
            "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
              "non",
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );

        expect(result.value).toEqual(expectedCompensation);
        expect(missingArgs).toEqual([]);
        expect(result.unit?.numerators).toEqual(["€"]);
      }
    );
    test("Si l'inaptitude suite à un accident ou maladie professionnelle' alors pas de question pour motif eco", () => {
      const { result, missingArgs } = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC0573'",
          "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${CatPro573.agents}'`,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            "14",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            "14",
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "2700",
          "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
            "oui",
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );

      expect(result.value).toEqual(9000);
      expect(missingArgs).toEqual([]);
      expect(result.unit?.numerators).toEqual(["€"]);
    });
  });

  describe("Cadres", () => {
    test.each`
      age   | category            | auMoins15AnsCadre     | seniorityRight | seniority | salary  | expectedCompensation
      ${32} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${0.99}        | ${0.99}   | ${3200} | ${0}
      ${32} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${0.99}        | ${1}      | ${3200} | ${0}
      ${32} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${1}           | ${1}      | ${3200} | ${640}
      ${32} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${1}           | ${4}      | ${3200} | ${2560}
      ${32} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${1}           | ${5}      | ${3200} | ${3200}
      ${40} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${1}           | ${6}      | ${3200} | ${5760}
      ${40} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${1}           | ${10}     | ${3200} | ${9920}
      ${40} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${1}           | ${23}     | ${3200} | ${27840}
      ${40} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${1}           | ${23}     | ${3200} | ${27840}
      ${52} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${1}           | ${6}      | ${3200} | ${5760}
      ${52} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${1}           | ${10}     | ${3200} | ${9920}
      ${52} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${1}           | ${23}     | ${3200} | ${32016}
      ${52} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${1}           | ${23}     | ${3200} | ${27840}
      ${57} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${1}           | ${6}      | ${3200} | ${5760}
      ${57} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${1}           | ${10}     | ${3200} | ${9920}
      ${57} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${1}           | ${23}     | ${3200} | ${33408}
      ${57} | ${CatPro573.cadres} | ${QuestionOuiNon.non} | ${1}           | ${23}     | ${3200} | ${27840}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, age $age, type de licenciement $typeLicenciement, catégorie $category => $expectedCompensation €",
      ({
        seniority,
        seniorityRight,
        salary,
        expectedCompensation,
        category,
        auMoins15AnsCadre,
        age,
      }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0573'",
            "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${category}'`,
            "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . cadres . cadre durant au moins de 15 ans . age":
              age,
            "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . cadres . cadre durant au moins de 15 ans question": `'${auMoins15AnsCadre}'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );

        expect(result.value).toEqual(expectedCompensation);
        expect(missingArgs).toEqual([]);
        expect(result.unit?.numerators).toEqual(["€"]);
      }
    );
  });
});
