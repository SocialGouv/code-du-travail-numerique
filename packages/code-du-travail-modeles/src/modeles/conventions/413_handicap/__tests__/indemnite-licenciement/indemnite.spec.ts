import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../../../internal/merger";

const engine = SingletonEnginePublicodes.getInstance();

describe("Indemnité conventionnel de licenciement pour la CC 413", () => {
  describe("Cas standard", () => {
    test.each`
      category                                                                                                                         | seniority  | salary     | expectedCompensation
      ${"Non-cadres"}                                                                                                                  | ${0}       | ${2000}    | ${0}
      ${"Non-cadres"}                                                                                                                  | ${23 / 12} | ${2000}    | ${0}
      ${"Non-cadres"}                                                                                                                  | ${1.75}    | ${2000}    | ${0}
      ${"Non-cadres"}                                                                                                                  | ${2}       | ${2100}    | ${2100}
      ${"Non-cadres"}                                                                                                                  | ${15}      | ${2100}    | ${12600}
      ${"Non-cadres"}                                                                                                                  | ${9}       | ${3650}    | ${16425}
      ${"Non-cadres"}                                                                                                                  | ${100}     | ${3650}    | ${21900}
      ${"Cadres"}                                                                                                                      | ${0}       | ${2000}    | ${0}
      ${"Cadres"}                                                                                                                      | ${23 / 12} | ${2000}    | ${0}
      ${"Cadres"}                                                                                                                      | ${2}       | ${2000}    | ${0}
      ${"Cadres"}                                                                                                                      | ${25 / 12} | ${2000}    | ${4166.67}
      ${"Cadres"}                                                                                                                      | ${3}       | ${3650}    | ${10950}
      ${"Cadres"}                                                                                                                      | ${4}       | ${3650}    | ${14600}
      ${"Cadres"}                                                                                                                      | ${14}      | ${3650}    | ${43800}
      ${"Cadres"}                                                                                                                      | ${100}     | ${3650}    | ${43800}
      ${"Cadres directeurs généraux, directeurs de centre de formation en travail social et directeurs d'établissement ou de service"} | ${0}       | ${2000}    | ${0}
      ${"Cadres directeurs généraux, directeurs de centre de formation en travail social et directeurs d'établissement ou de service"} | ${23 / 12} | ${2000}    | ${0}
      ${"Cadres directeurs généraux, directeurs de centre de formation en travail social et directeurs d'établissement ou de service"} | ${2}       | ${2000}    | ${0}
      ${"Cadres directeurs généraux, directeurs de centre de formation en travail social et directeurs d'établissement ou de service"} | ${25 / 12} | ${2000}    | ${4166.67}
      ${"Cadres directeurs généraux, directeurs de centre de formation en travail social et directeurs d'établissement ou de service"} | ${3}       | ${2000}    | ${6000}
      ${"Cadres directeurs généraux, directeurs de centre de formation en travail social et directeurs d'établissement ou de service"} | ${10}      | ${3633.33} | ${36333.3}
      ${"Cadres directeurs généraux, directeurs de centre de formation en travail social et directeurs d'établissement ou de service"} | ${14}      | ${2000}    | ${28000}
      ${"Cadres directeurs généraux, directeurs de centre de formation en travail social et directeurs d'établissement ou de service"} | ${40}      | ${2000}    | ${36000}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, => $expectedCompensation €",
      ({ seniority, salary, expectedCompensation, category }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC0413'",
            "contrat salarié . convention collective . établissement handicap . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
            "contrat salarié . convention collective . établissement handicap . indemnité de licenciement . catégorie professionnelle . non cadre durant une période":
              "non",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
          })
          .evaluate(
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        expect(result.missingVariables).toEqual({});
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });

  describe("Cas mixte", () => {
    test.each`
      seniorityNonCadres | category                                                                                                                         | seniority | salary     | expectedCompensation
      ${9}               | ${"Cadres"}                                                                                                                      | ${13}     | ${3650}    | ${31025}
      ${10}              | ${"Cadres"}                                                                                                                      | ${25}     | ${3650}    | ${62050}
      ${13}              | ${"Cadres"}                                                                                                                      | ${26}     | ${3650}    | ${65700}
      ${4}               | ${"Cadres directeurs généraux, directeurs de centre de formation en travail social et directeurs d'établissement ou de service"} | ${8}      | ${3633.33} | ${21799.98}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, seniorityNonCadres: $seniorityNonCadres => $expectedCompensation €",
      ({
        seniority,
        salary,
        expectedCompensation,
        seniorityNonCadres,
        category,
      }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC0413'",
            "contrat salarié . convention collective . établissement handicap . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
            "contrat salarié . convention collective . établissement handicap . indemnité de licenciement . catégorie professionnelle . non cadre durant une période":
              "'Oui'",
            "contrat salarié . convention collective . établissement handicap . indemnité de licenciement . catégorie professionnelle . non cadre durant une période . temps effectif": seniorityNonCadres,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
          })
          .evaluate(
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        expect(result.missingVariables).toEqual({});
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });
});
