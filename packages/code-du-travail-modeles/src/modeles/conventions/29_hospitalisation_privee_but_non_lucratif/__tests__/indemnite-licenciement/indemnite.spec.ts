import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../../../internal/merger";

const engine = global.__engine__;

describe("CC 29", () => {
  describe("Calcul de l'indemnité de licenciement pour Autres salariés", () => {
    test.each`
      seniority | salaireRef | expectedCompensation
      ${0.5}    | ${2400}    | ${0}
      ${8 / 12} | ${2400}    | ${400}
      ${10}     | ${2400}    | ${6000}
      ${20}     | ${2400}    | ${14000}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef € => une compensation de base de $expectedCompensation €",
      ({ salaireRef, expectedCompensation, seniority }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC0029'",
            "contrat salarié . convention collective . hospitalisation privée à but non lucratif . indemnité de licenciement . catégorie professionnelle":
              "'Autres salariés'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salaireRef,
          })
          .evaluate(
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.missingVariables).toEqual({});
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });

  describe("Calcul de l'indemnité de licenciement pour Médecins, pharmaciens et biologistes exerçant à titre permanent", () => {
    test.each`
      seniority | salaireRef | expectedCompensation
      ${0.5}    | ${2950}    | ${0}
      ${8 / 12} | ${2950}    | ${491.67}
      ${10}     | ${2950}    | ${7375}
      ${20}     | ${2950}    | ${17208.33}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef € => une compensation de base de $expectedCompensation €",
      ({ salaireRef, expectedCompensation, seniority }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC0029'",
            "contrat salarié . convention collective . hospitalisation privée à but non lucratif . indemnité de licenciement . catégorie professionnelle":
              "'Médecins, pharmaciens et biologistes exerçant à titre permanent'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salaireRef,
          })
          .evaluate(
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.missingVariables).toEqual({});
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });

  describe("Calcul de l'indemnité de licenciement pour Assistants familiaux des services de placements familiaux spécialisés exerçant à titre permanent", () => {
    test.each`
      seniority | salaireRef | expectedCompensation
      ${0.5}    | ${2334}    | ${0}
      ${8 / 12} | ${2334}    | ${389}
      ${10}     | ${2334}    | ${5835}
      ${20}     | ${2334}    | ${13615}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef € => une compensation de base de $expectedCompensation €",
      ({ salaireRef, expectedCompensation, seniority }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC0029'",
            "contrat salarié . convention collective . hospitalisation privée à but non lucratif . indemnité de licenciement . catégorie professionnelle":
              "'Assistants familiaux des services de placements familiaux spécialisés'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salaireRef,
          })
          .evaluate(
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.missingVariables).toEqual({});
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });
});
