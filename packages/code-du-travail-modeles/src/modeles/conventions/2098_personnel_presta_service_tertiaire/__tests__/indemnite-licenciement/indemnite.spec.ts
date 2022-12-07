import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../../../internal/merger";

const engine = new Engine(mergeIndemniteLicenciementModels());

describe("Calcul de l'indemnité de licenciement CC 2098", () => {
  describe("Licenciement pour inaptitude non professionnelle", () => {
    test.each`
      seniority | expectedCompensation
      ${0.67}   | ${469}
      ${20}     | ${16333.33}
    `(
      "Avec une ancienneté $seniority ans et salaire de ref 2800€ => une compensation de base de $expectedCompensation €",
      ({ expectedCompensation, seniority }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC2098'",
            "contrat salarié . convention collective . personnel presta service tertiaire . inaptitude suite à un accident non professionnelle":
              "'Oui'",
            "contrat salarié . indemnité de licenciement": "oui",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . ancienneté en année": seniority,
            "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
              "non",
            "contrat salarié . indemnité de licenciement . salaire de référence": 2800,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 2800,
          })
          .evaluate(
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );

        expect(result.missingVariables).toEqual({});
        expect(result.nodeValue).toEqual(expectedCompensation);
        expect(result.unit?.numerators).toEqual(["€"]);
      }
    );
  });

  describe("Autre licenciement", () => {
    test.each`
      seniority | expectedCompensation
      ${1}      | ${0}
      ${2}      | ${560}
      ${7}      | ${2200}
      ${14}     | ${5640}
      ${22}     | ${10400}
      ${33}     | ${18800}
    `(
      "Non-cadres, Avec une ancienneté $seniority ans et salaire de ref 2800€ => une compensation de base de $expectedCompensation €",
      ({ expectedCompensation, seniority }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC2098'",
            "contrat salarié . convention collective . personnel presta service tertiaire . autre licenciement . catégorie professionnelle":
              "'Non-cadres'",
            "contrat salarié . convention collective . personnel presta service tertiaire . inaptitude suite à un accident non professionnelle":
              "'Non'",
            "contrat salarié . indemnité de licenciement": "oui",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 2800,
          })
          .evaluate(
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );

        expect(result.missingVariables).toEqual({});
        expect(result.nodeValue).toEqual(expectedCompensation);
        expect(result.unit?.numerators).toEqual(["€"]);
      }
    );

    test.each`
      seniority | age   | expectedCompensation
      ${1}      | ${35} | ${0}
      ${2}      | ${35} | ${2223.6}
      ${7}      | ${35} | ${8523.8}
      ${14}     | ${35} | ${20383}
      ${22}     | ${35} | ${37801.2}
      ${33}     | ${35} | ${62260.8}
      ${1}      | ${54} | ${0}
      ${2}      | ${54} | ${2445.96}
      ${7}      | ${54} | ${9376.18}
      ${14}     | ${54} | ${22421.3}
      ${22}     | ${54} | ${41581.32}
      ${33}     | ${54} | ${66708}
      ${1}      | ${57} | ${0}
      ${2}      | ${57} | ${2779.5}
      ${7}      | ${57} | ${10654.75}
      ${14}     | ${57} | ${25478.75}
      ${22}     | ${57} | ${47251.5}
      ${33}     | ${57} | ${66708}
    `(
      "Cadres, avec une ancienneté $seniority ans, un age $age ans, un salaire de référence 3706€ => une compensation de base de $expectedCompensation €",
      ({ salaireRef, expectedCompensation, seniority, age }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC2098'",
            "contrat salarié . convention collective . personnel presta service tertiaire . autre licenciement . cadres . age": age,
            "contrat salarié . convention collective . personnel presta service tertiaire . autre licenciement . catégorie professionnelle":
              "'Cadres'",
            "contrat salarié . convention collective . personnel presta service tertiaire . inaptitude suite à un accident non professionnelle":
              "'Non'",
            "contrat salarié . indemnité de licenciement": "oui",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salaireRef,
          })
          .evaluate(
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );

        expect(result.missingVariables).toEqual({});
        expect(result.nodeValue).toEqual(expectedCompensation);
        expect(result.unit?.numerators).toEqual(["€"]);
      }
    );
  });
});
