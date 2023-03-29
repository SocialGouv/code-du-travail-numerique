import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "275"
);

describe("CC 275", () => {
  describe("Calcul de l'indemnité de licenciement pour Non-cadres", () => {
    test.each`
      seniorityRight | seniority | salaireRef | expectedCompensation
      ${0.91}        | ${0.91}   | ${2500}    | ${0}
      ${0.91}        | ${5}      | ${2500}    | ${2500}
      ${0.91}        | ${10}     | ${2500}    | ${7500}
      ${0.91}        | ${15}     | ${2500}    | ${15000}
      ${0.91}        | ${20}     | ${2500}    | ${25000}
      ${0.91}        | ${25}     | ${2500}    | ${37500}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef € => une compensation de base de $expectedCompensation €",
      ({ salaireRef, expectedCompensation, seniority, seniorityRight }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0275'",
            "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle":
              "'Non-cadres'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salaireRef,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(missingArgs).toEqual([]);
        expect(result.value).toEqual(expectedCompensation);
      }
    );
  });

  describe("Calcul de l'indemnité de licenciement pour Cadres", () => {
    test.each`
      seniorityRight | seniority | salaireRef | expectedCompensation | age
      ${0.91}        | ${0.91}   | ${2500}    | ${0}                 | ${50}
      ${0.91}        | ${5}      | ${2500}    | ${2500}              | ${50}
      ${0.91}        | ${10}     | ${2500}    | ${7500}              | ${50}
      ${0.91}        | ${15}     | ${2500}    | ${17500}             | ${50}
      ${0.91}        | ${20}     | ${2500}    | ${30000}             | ${50}
      ${0.91}        | ${25}     | ${2500}    | ${42500}             | ${50}
      ${0.91}        | ${0.91}   | ${2500}    | ${0}                 | ${55}
      ${0.91}        | ${5}      | ${2500}    | ${2500}              | ${55}
      ${0.91}        | ${10}     | ${2500}    | ${10000}             | ${55}
      ${0.91}        | ${15}     | ${2500}    | ${20000}             | ${55}
      ${0.91}        | ${20}     | ${2500}    | ${32500}             | ${55}
      ${0.91}        | ${25}     | ${2500}    | ${45000}             | ${55}
      ${0.91}        | ${0.91}   | ${2500}    | ${0}                 | ${56}
      ${0.91}        | ${5}      | ${2500}    | ${2500}              | ${56}
      ${0.91}        | ${10}     | ${2500}    | ${12500}             | ${56}
      ${0.91}        | ${15}     | ${2500}    | ${22500}             | ${56}
      ${0.91}        | ${20}     | ${2500}    | ${35000}             | ${56}
      ${0.91}        | ${25}     | ${2500}    | ${47500}             | ${56}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef € => une compensation de base de $expectedCompensation €",
      ({
        salaireRef,
        expectedCompensation,
        seniority,
        seniorityRight,
        age,
      }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0275'",
            "contrat salarié . convention collective . transport aérien personnel au sol . age":
              age,
            "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle":
              "'Cadres'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salaireRef,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(missingArgs).toEqual([]);
        expect(result.value).toEqual(expectedCompensation);
      }
    );
  });
});
