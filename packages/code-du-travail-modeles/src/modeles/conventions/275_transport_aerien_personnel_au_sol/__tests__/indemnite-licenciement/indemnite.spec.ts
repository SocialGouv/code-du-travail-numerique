import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "275"
);

describe("CC 275", () => {
  describe("Calcul de l'indemnité de licenciement pour Non-cadres", () => {
    test.each`
      seniority | salaireRef | expectedCompensation
      ${0.91}   | ${2500}    | ${0}
      ${5}      | ${2500}    | ${2500}
      ${10}     | ${2500}    | ${7500}
      ${15}     | ${2500}    | ${15000}
      ${20}     | ${2500}    | ${25000}
      ${25}     | ${2500}    | ${37500}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef € => une compensation de base de $expectedCompensation €",
      ({ salaireRef, expectedCompensation, seniority }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0275'",
            "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle":
              "'Non-cadres'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniority,
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
      seniority | salaireRef | expectedCompensation | age
      ${0.91}   | ${2500}    | ${0}                 | ${50}
      ${5}      | ${2500}    | ${2500}              | ${50}
      ${10}     | ${2500}    | ${7500}              | ${50}
      ${15}     | ${2500}    | ${17500}             | ${50}
      ${20}     | ${2500}    | ${30000}             | ${50}
      ${25}     | ${2500}    | ${42500}             | ${50}
      ${0.91}   | ${2500}    | ${0}                 | ${55}
      ${5}      | ${2500}    | ${2500}              | ${55}
      ${10}     | ${2500}    | ${10000}             | ${55}
      ${15}     | ${2500}    | ${20000}             | ${55}
      ${20}     | ${2500}    | ${32500}             | ${55}
      ${25}     | ${2500}    | ${45000}             | ${55}
      ${0.91}   | ${2500}    | ${0}                 | ${56}
      ${5}      | ${2500}    | ${2500}              | ${56}
      ${10}     | ${2500}    | ${12500}             | ${56}
      ${15}     | ${2500}    | ${22500}             | ${56}
      ${20}     | ${2500}    | ${35000}             | ${56}
      ${25}     | ${2500}    | ${47500}             | ${56}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef € => une compensation de base de $expectedCompensation €",
      ({ salaireRef, expectedCompensation, seniority, age }) => {
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
              seniority,
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
