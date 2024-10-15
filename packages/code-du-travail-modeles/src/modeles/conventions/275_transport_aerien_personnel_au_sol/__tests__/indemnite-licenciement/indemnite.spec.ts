import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "275"
);

describe("Calcul de l'indemnité de licenciement pour la CC 275", () => {
  describe("Avant le 31/01/2024", () => {
    describe("Non Cadres", () => {
      test.each`
        seniorityRight | seniority | salaireRef | expectedCompensation
        ${0.91}        | ${0.91}   | ${2500}    | ${0}
        ${1}           | ${5}      | ${2500}    | ${2500}
        ${1}           | ${10}     | ${2500}    | ${7500}
        ${1}           | ${15}     | ${2500}    | ${15000}
        ${1}           | ${20}     | ${2500}    | ${25000}
        ${1}           | ${25}     | ${2500}    | ${37500}
        ${1}           | ${50}     | ${5000}    | ${90000}
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
              "contrat salarié . indemnité de licenciement . date de notification":
                "30/01/2024",
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

    describe("Cadres", () => {
      test.each`
        seniorityRight | seniority | salaireRef | expectedCompensation | age
        ${0.91}        | ${0.91}   | ${2500}    | ${0}                 | ${45}
        ${1}           | ${5}      | ${2500}    | ${2500}              | ${45}
        ${1}           | ${10}     | ${2500}    | ${7500}              | ${45}
        ${1}           | ${15}     | ${2500}    | ${17500}             | ${45}
        ${1}           | ${20}     | ${2500}    | ${30000}             | ${45}
        ${1}           | ${25}     | ${2500}    | ${42500}             | ${45}
        ${1}           | ${50}     | ${5000}    | ${90000}             | ${45}
        ${0.91}        | ${0.91}   | ${2500}    | ${0}                 | ${50}
        ${1}           | ${5}      | ${2500}    | ${2500}              | ${50}
        ${1}           | ${10}     | ${2500}    | ${10000}             | ${50}
        ${1}           | ${15}     | ${2500}    | ${20000}             | ${50}
        ${1}           | ${20}     | ${2500}    | ${32500}             | ${50}
        ${1}           | ${25}     | ${2500}    | ${45000}             | ${50}
        ${1}           | ${50}     | ${5000}    | ${95000}             | ${50}
        ${0.91}        | ${0.91}   | ${2500}    | ${0}                 | ${55}
        ${1}           | ${5}      | ${2500}    | ${2500}              | ${55}
        ${1}           | ${10}     | ${2500}    | ${12500}             | ${55}
        ${1}           | ${15}     | ${2500}    | ${22500}             | ${55}
        ${1}           | ${20}     | ${2500}    | ${35000}             | ${55}
        ${1}           | ${25}     | ${2500}    | ${47500}             | ${55}
        ${1}           | ${50}     | ${5000}    | ${100000}            | ${55}
      `(
        "Avec une ancienneté $seniority ans et $age ans d'age, un salaire de référence $salaireRef € => une compensation de base de $expectedCompensation €",
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
              "contrat salarié . indemnité de licenciement . date de notification":
                "30/01/2024",
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

  describe("Entre le 31/01/2024 et le 30/10/2024", () => {
    describe("Non Cadre", () => {
      test.each`
        seniorityRight | seniority | salaireRef | expectedCompensation
        ${0.61}        | ${0.61}   | ${2500}    | ${0}
        ${0.91}        | ${0.91}   | ${2500}    | ${568.75}
        ${0.91}        | ${5}      | ${2500}    | ${3125}
        ${0.91}        | ${10}     | ${2500}    | ${6250}
        ${0.91}        | ${15}     | ${2500}    | ${13750}
        ${0.91}        | ${20}     | ${2500}    | ${23750}
        ${0.91}        | ${25}     | ${2500}    | ${36250}
        ${0.91}        | ${50}     | ${5000}    | ${90000}
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
              "contrat salarié . indemnité de licenciement . date de notification":
                "31/01/2024",
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

    describe("Cadres", () => {
      test.each`
        seniorityRight | seniority | salaireRef | expectedCompensation | age
        ${0.61}        | ${0.61}   | ${2500}    | ${0}                 | ${45}
        ${0.91}        | ${0.91}   | ${2500}    | ${568.75}            | ${45}
        ${0.91}        | ${5}      | ${2500}    | ${3125}              | ${45}
        ${0.91}        | ${10}     | ${2500}    | ${6250}              | ${45}
        ${0.91}        | ${15}     | ${2500}    | ${16250}             | ${45}
        ${0.91}        | ${20}     | ${2500}    | ${28750}             | ${45}
        ${0.91}        | ${25}     | ${2500}    | ${41250}             | ${45}
        ${0.91}        | ${50}     | ${5000}    | ${90000}             | ${45}
        ${0.61}        | ${0.61}   | ${2500}    | ${0}                 | ${50}
        ${0.91}        | ${0.91}   | ${2500}    | ${568.75}            | ${45}
        ${0.91}        | ${5}      | ${2500}    | ${3125}              | ${50}
        ${0.91}        | ${10}     | ${2500}    | ${8750}              | ${50}
        ${0.91}        | ${15}     | ${2500}    | ${18750}             | ${50}
        ${0.91}        | ${20}     | ${2500}    | ${31250}             | ${50}
        ${0.91}        | ${25}     | ${2500}    | ${43750}             | ${50}
        ${0.91}        | ${50}     | ${5000}    | ${95000}             | ${50}
        ${0.61}        | ${0.61}   | ${2500}    | ${0}                 | ${55}
        ${0.91}        | ${0.91}   | ${2500}    | ${568.75}            | ${45}
        ${0.91}        | ${5}      | ${2500}    | ${3125}              | ${55}
        ${0.91}        | ${10}     | ${2500}    | ${11250}             | ${55}
        ${0.91}        | ${15}     | ${2500}    | ${21250}             | ${55}
        ${0.91}        | ${20}     | ${2500}    | ${33750}             | ${55}
        ${0.91}        | ${25}     | ${2500}    | ${46250}             | ${55}
        ${0.91}        | ${50}     | ${5000}    | ${100000}            | ${55}
      `(
        "Avec une ancienneté $seniority ans et $age ans d'age, un salaire de référence $salaireRef € => une compensation de base de $expectedCompensation €",
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
              "contrat salarié . indemnité de licenciement . date de notification":
                "31/01/2024",
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

  describe("A partir du 30/10/2024", () => {
    describe("Non Cadres", () => {
      test.each`
        seniorityRight | seniority | salaireRef | expectedCompensation
        ${0.61}        | ${0.61}   | ${2500}    | ${0}
        ${0.91}        | ${0.91}   | ${2500}    | ${568.75}
        ${0.91}        | ${4}      | ${2500}    | ${2500}
        ${0.91}        | ${5}      | ${2500}    | ${3125}
        ${0.91}        | ${10}     | ${2500}    | ${8125}
        ${0.91}        | ${15}     | ${2500}    | ${15625}
        ${0.91}        | ${20}     | ${2500}    | ${25625}
        ${0.91}        | ${25}     | ${2500}    | ${38125}
        ${0.91}        | ${50}     | ${5000}    | ${90000}
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
              "contrat salarié . indemnité de licenciement . date de notification":
                "15/10/2024",
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

    describe("Cadres", () => {
      test.each`
        seniorityRight | seniority | salaireRef | expectedCompensation | age
        ${0.61}        | ${0.61}   | ${2500}    | ${0}                 | ${45}
        ${0.91}        | ${0.91}   | ${2500}    | ${568.75}            | ${45}
        ${0.91}        | ${5}      | ${2500}    | ${3125}              | ${45}
        ${0.91}        | ${10}     | ${2500}    | ${8125}              | ${45}
        ${0.91}        | ${15}     | ${2500}    | ${18125}             | ${45}
        ${0.91}        | ${20}     | ${2500}    | ${30625}             | ${45}
        ${0.91}        | ${25}     | ${2500}    | ${43125}             | ${45}
        ${0.91}        | ${50}     | ${5000}    | ${90000}             | ${45}
        ${0.61}        | ${0.61}   | ${2500}    | ${0}                 | ${50}
        ${0.91}        | ${0.91}   | ${2500}    | ${568.75}            | ${45}
        ${0.91}        | ${5}      | ${2500}    | ${3125}              | ${50}
        ${0.91}        | ${10}     | ${2500}    | ${10625}             | ${50}
        ${0.91}        | ${15}     | ${2500}    | ${20625}             | ${50}
        ${0.91}        | ${20}     | ${2500}    | ${33125}             | ${50}
        ${0.91}        | ${25}     | ${2500}    | ${45625}             | ${50}
        ${0.91}        | ${50}     | ${5000}    | ${95000}             | ${50}
        ${0.61}        | ${0.61}   | ${2500}    | ${0}                 | ${55}
        ${0.91}        | ${0.91}   | ${2500}    | ${568.75}            | ${45}
        ${0.91}        | ${5}      | ${2500}    | ${3125}              | ${55}
        ${0.91}        | ${10}     | ${2500}    | ${13125}             | ${55}
        ${0.91}        | ${15}     | ${2500}    | ${23125}             | ${55}
        ${0.91}        | ${20}     | ${2500}    | ${35625}             | ${55}
        ${0.91}        | ${25}     | ${2500}    | ${48125}             | ${55}
        ${0.91}        | ${50}     | ${5000}    | ${100000}            | ${55}
      `(
        "Avec une ancienneté $seniority ans et $age ans d'age, un salaire de référence $salaireRef € => une compensation de base de $expectedCompensation €",
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
              "contrat salarié . indemnité de licenciement . date de notification":
                "15/10/2024",
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
});
