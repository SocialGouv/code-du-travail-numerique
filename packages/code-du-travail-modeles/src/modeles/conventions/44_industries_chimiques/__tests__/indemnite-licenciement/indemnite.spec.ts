import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";
import { CategoryPro44 } from "../../salary";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "44"
);

describe("Indemnité conventionnel de licenciement pour la CC 44", () => {
  describe("Défaut", () => {
    test.each`
      category                     | isEconomicFiring | age   | seniority | salary  | expectedCompensation
      ${CategoryPro44.ouvrier}     | ${false}         | ${45} | ${0}      | ${2500} | ${0}
      ${CategoryPro44.techniciens} | ${false}         | ${45} | ${0}      | ${2500} | ${0}
      ${CategoryPro44.inge}        | ${false}         | ${45} | ${0}      | ${2500} | ${0}
    `(
      "Avec $seniority ans, catégorie $category, age $age, isEconomicFiring $isEconomicFiring et sref : $salary => $expectedCompensation €",
      ({
        category,
        isEconomicFiring,
        age,
        seniority,
        salary,
        expectedCompensation,
      }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0044'",
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle":
              category,
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique":
              isEconomicFiring ? `'Oui'` : `'Non'`,
            "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique . age":
              age,

            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(missingArgs).toEqual([]);
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.value).toEqual(expectedCompensation);
      }
    );
  });

  describe("Licenciement normal", () => {
    describe("Ouvrier", () => {
      test.each`
        category                 | isEconomicFiring | age   | seniorityRight | seniority | salary  | expectedCompensation
        ${CategoryPro44.ouvrier} | ${false}         | ${50} | ${1.25}        | ${1.25}   | ${2719} | ${0}
        ${CategoryPro44.ouvrier} | ${false}         | ${50} | ${1.99}        | ${1.99}   | ${2719} | ${0}
        ${CategoryPro44.ouvrier} | ${false}         | ${50} | ${1.99}        | ${2}      | ${2719} | ${0}
        ${CategoryPro44.ouvrier} | ${false}         | ${50} | ${2}           | ${2}      | ${2719} | ${1631.4}
        ${CategoryPro44.ouvrier} | ${false}         | ${50} | ${2}           | ${5}      | ${2719} | ${6797.5}
        ${CategoryPro44.ouvrier} | ${false}         | ${55} | ${1.25}        | ${1.25}   | ${2719} | ${0}
        ${CategoryPro44.ouvrier} | ${false}         | ${55} | ${1.99}        | ${2}      | ${2719} | ${0}
        ${CategoryPro44.ouvrier} | ${false}         | ${55} | ${2}           | ${2}      | ${2719} | ${1631.4}
        ${CategoryPro44.ouvrier} | ${false}         | ${55} | ${2}           | ${5}      | ${2719} | ${9516.5}
        ${CategoryPro44.ouvrier} | ${false}         | ${57} | ${1.25}        | ${1.25}   | ${2719} | ${0}
        ${CategoryPro44.ouvrier} | ${false}         | ${57} | ${1.99}        | ${2}      | ${2719} | ${0}
        ${CategoryPro44.ouvrier} | ${false}         | ${57} | ${2}           | ${2}      | ${2719} | ${1631.4}
        ${CategoryPro44.ouvrier} | ${false}         | ${57} | ${2}           | ${5}      | ${2719} | ${9516.5}
        ${CategoryPro44.ouvrier} | ${false}         | ${57} | ${2}           | ${5}      | ${3495} | ${12232.5}
      `(
        "Avec $seniority ans (droit: $seniorityRight ans), catégorie $category, age $age, isEconomicFiring $isEconomicFiring et sref : $salary => $expectedCompensation €",
        ({
          category,
          isEconomicFiring,
          age,
          seniority,
          seniorityRight,
          salary,
          expectedCompensation,
        }) => {
          const { result, missingArgs } = engine.setSituation(
            {
              "contrat salarié . convention collective": "'IDCC0044'",
              "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle":
                category,
              "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique":
                isEconomicFiring ? `'Oui'` : `'Non'`,
              "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique . age":
                age,

              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
                seniority,
              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
                seniorityRight,
              "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
                salary,
            },
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
          expect(missingArgs).toEqual([]);
          expect(result.unit?.numerators).toEqual(["€"]);
          expect(result.value).toEqual(expectedCompensation);
        }
      );
    });

    describe("Technicien", () => {
      test.each`
        category                     | isEconomicFiring | age   | seniorityRight | seniority | salary  | expectedCompensation
        ${CategoryPro44.techniciens} | ${false}         | ${50} | ${1.33}        | ${1.33}   | ${3140} | ${0}
        ${CategoryPro44.techniciens} | ${false}         | ${50} | ${1.99}        | ${1.99}   | ${3140} | ${0}
        ${CategoryPro44.techniciens} | ${false}         | ${50} | ${1.99}        | ${2}      | ${3140} | ${0}
        ${CategoryPro44.techniciens} | ${false}         | ${50} | ${2}           | ${2}      | ${3140} | ${1884}
        ${CategoryPro44.techniciens} | ${false}         | ${50} | ${2}           | ${3}      | ${3140} | ${2826}
        ${CategoryPro44.techniciens} | ${false}         | ${50} | ${2}           | ${5}      | ${3140} | ${7850}
        ${CategoryPro44.techniciens} | ${false}         | ${50} | ${2}           | ${10}     | ${3140} | ${15700}
        ${CategoryPro44.techniciens} | ${false}         | ${50} | ${2}           | ${20}     | ${3140} | ${34540}
        ${CategoryPro44.techniciens} | ${false}         | ${55} | ${1.33}        | ${1.33}   | ${3140} | ${0}
        ${CategoryPro44.techniciens} | ${false}         | ${55} | ${1.99}        | ${2}      | ${3140} | ${0}
        ${CategoryPro44.techniciens} | ${false}         | ${55} | ${3}           | ${3}      | ${3140} | ${2826}
        ${CategoryPro44.techniciens} | ${false}         | ${55} | ${2}           | ${5}      | ${3140} | ${10990}
        ${CategoryPro44.techniciens} | ${false}         | ${55} | ${2}           | ${10}     | ${3140} | ${18840}
        ${CategoryPro44.techniciens} | ${false}         | ${55} | ${2}           | ${20}     | ${3140} | ${37680}
        ${CategoryPro44.techniciens} | ${false}         | ${56} | ${1.33}        | ${1.33}   | ${3140} | ${0}
        ${CategoryPro44.techniciens} | ${false}         | ${56} | ${1.99}        | ${2}      | ${3140} | ${0}
        ${CategoryPro44.techniciens} | ${false}         | ${56} | ${2}           | ${3}      | ${3140} | ${2826}
        ${CategoryPro44.techniciens} | ${false}         | ${56} | ${2}           | ${5}      | ${3140} | ${10990}
        ${CategoryPro44.techniciens} | ${false}         | ${56} | ${2}           | ${10}     | ${3140} | ${18840}
        ${CategoryPro44.techniciens} | ${false}         | ${56} | ${2}           | ${20}     | ${3140} | ${37680}
      `(
        "Avec $seniority ans (droit: $seniorityRight ans), catégorie $category, age $age, isEconomicFiring $isEconomicFiring et sref : $salary => $expectedCompensation €",
        ({
          category,
          isEconomicFiring,
          age,
          seniority,
          seniorityRight,
          salary,
          expectedCompensation,
        }) => {
          const { result, missingArgs } = engine.setSituation(
            {
              "contrat salarié . convention collective": "'IDCC0044'",
              "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle":
                category,
              "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique":
                isEconomicFiring ? `'Oui'` : `'Non'`,
              "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique . age":
                age,

              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
                seniority,
              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
                seniorityRight,
              "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
                salary,
            },
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
          expect(missingArgs).toEqual([]);
          expect(result.unit?.numerators).toEqual(["€"]);
          expect(result.value).toEqual(expectedCompensation);
        }
      );
    });

    describe("Ingénieur", () => {
      test.each`
        category              | isEconomicFiring | age   | seniorityRight | seniority | salary  | expectedCompensation
        ${CategoryPro44.inge} | ${false}         | ${40} | ${0.67}        | ${0.67}   | ${3541} | ${0}
        ${CategoryPro44.inge} | ${false}         | ${40} | ${1.99}        | ${1.99}   | ${3541} | ${0}
        ${CategoryPro44.inge} | ${false}         | ${40} | ${1.99}        | ${2}      | ${3541} | ${0}
        ${CategoryPro44.inge} | ${false}         | ${40} | ${2}           | ${2}      | ${3541} | ${2832.8}
        ${CategoryPro44.inge} | ${false}         | ${40} | ${2}           | ${2.5}    | ${3541} | ${3541}
        ${CategoryPro44.inge} | ${false}         | ${40} | ${2}           | ${5}      | ${3541} | ${7082}
        ${CategoryPro44.inge} | ${false}         | ${40} | ${2}           | ${10}     | ${3541} | ${14164}
        ${CategoryPro44.inge} | ${false}         | ${40} | ${2}           | ${13}     | ${3541} | ${20537.8}
        ${CategoryPro44.inge} | ${false}         | ${40} | ${2}           | ${17}     | ${3541} | ${30452.6}
        ${CategoryPro44.inge} | ${false}         | ${48} | ${0.67}        | ${0.67}   | ${3541} | ${0}
        ${CategoryPro44.inge} | ${false}         | ${48} | ${1.99}        | ${2}      | ${3541} | ${0}
        ${CategoryPro44.inge} | ${false}         | ${48} | ${2}           | ${2.5}    | ${3541} | ${3541}
        ${CategoryPro44.inge} | ${false}         | ${48} | ${2}           | ${5}      | ${3541} | ${7082}
        ${CategoryPro44.inge} | ${false}         | ${48} | ${2}           | ${10}     | ${3541} | ${17705}
        ${CategoryPro44.inge} | ${false}         | ${48} | ${2}           | ${13}     | ${3541} | ${24078.8}
        ${CategoryPro44.inge} | ${false}         | ${48} | ${2}           | ${17}     | ${3541} | ${33993.6}
        ${CategoryPro44.inge} | ${false}         | ${58} | ${0.67}        | ${0.67}   | ${3541} | ${0}
        ${CategoryPro44.inge} | ${false}         | ${58} | ${1.99}        | ${2}      | ${3541} | ${0}
        ${CategoryPro44.inge} | ${false}         | ${58} | ${2}           | ${2.5}    | ${3541} | ${3541}
        ${CategoryPro44.inge} | ${false}         | ${58} | ${2}           | ${5}      | ${3541} | ${7082}
        ${CategoryPro44.inge} | ${false}         | ${58} | ${2}           | ${10}     | ${3541} | ${21246}
        ${CategoryPro44.inge} | ${false}         | ${58} | ${2}           | ${13}     | ${3541} | ${27619.8}
        ${CategoryPro44.inge} | ${false}         | ${58} | ${2}           | ${17}     | ${3541} | ${37534.6}
      `(
        "Avec $seniority ans, catégorie $category, age $age, isEconomicFiring $isEconomicFiring et sref : $salary => $expectedCompensation €",
        ({
          category,
          isEconomicFiring,
          age,
          seniority,
          seniorityRight,
          salary,
          expectedCompensation,
        }) => {
          const { result, missingArgs } = engine.setSituation(
            {
              "contrat salarié . convention collective": "'IDCC0044'",
              "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle":
                category,
              "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique":
                isEconomicFiring ? `'Oui'` : `'Non'`,
              "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique . age":
                age,

              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
                seniority,
              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
                seniorityRight,
              "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
                salary,
            },
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
          expect(missingArgs).toEqual([]);
          expect(result.unit?.numerators).toEqual(["€"]);
          expect(result.value).toEqual(expectedCompensation);
        }
      );
    });
  });

  describe("Licenciement économique", () => {
    describe("Ouvrier", () => {
      test.each`
        category                 | isEconomicFiring | age   | seniorityRight | seniority | salary  | expectedCompensation
        ${CategoryPro44.ouvrier} | ${true}          | ${30} | ${0.75}        | ${0.75}   | ${2500} | ${0}
        ${CategoryPro44.ouvrier} | ${true}          | ${30} | ${0.99}        | ${0.99}   | ${2500} | ${0}
        ${CategoryPro44.ouvrier} | ${true}          | ${30} | ${0.99}        | ${1}      | ${2500} | ${0}
        ${CategoryPro44.ouvrier} | ${true}          | ${30} | ${1}           | ${1}      | ${2500} | ${2500}
        ${CategoryPro44.ouvrier} | ${true}          | ${30} | ${1}           | ${1.5}    | ${2500} | ${2500}
        ${CategoryPro44.ouvrier} | ${true}          | ${30} | ${1}           | ${2}      | ${2500} | ${5000}
        ${CategoryPro44.ouvrier} | ${true}          | ${30} | ${1}           | ${5}      | ${2500} | ${5000}
        ${CategoryPro44.ouvrier} | ${true}          | ${52} | ${0.75}        | ${0.75}   | ${2500} | ${0}
        ${CategoryPro44.ouvrier} | ${true}          | ${52} | ${0.75}        | ${1}      | ${2500} | ${0}
        ${CategoryPro44.ouvrier} | ${true}          | ${52} | ${1}           | ${1.5}    | ${2500} | ${2500}
        ${CategoryPro44.ouvrier} | ${true}          | ${52} | ${1}           | ${2}      | ${2500} | ${5000}
        ${CategoryPro44.ouvrier} | ${true}          | ${52} | ${1}           | ${5}      | ${2500} | ${8750}
        ${CategoryPro44.ouvrier} | ${true}          | ${56} | ${0.75}        | ${0.75}   | ${2500} | ${0}
        ${CategoryPro44.ouvrier} | ${true}          | ${56} | ${0.75}        | ${1}      | ${2500} | ${0}
        ${CategoryPro44.ouvrier} | ${true}          | ${56} | ${1}           | ${1.5}    | ${2500} | ${2500}
        ${CategoryPro44.ouvrier} | ${true}          | ${56} | ${1}           | ${2}      | ${2500} | ${5000}
        ${CategoryPro44.ouvrier} | ${true}          | ${56} | ${1}           | ${5}      | ${2500} | ${8750}
      `(
        "Avec $seniority ans, catégorie $category, age $age, isEconomicFiring $isEconomicFiring et sref : $salary => $expectedCompensation €",
        ({
          category,
          isEconomicFiring,
          age,
          seniority,
          seniorityRight,
          salary,
          expectedCompensation,
        }) => {
          const { result, missingArgs } = engine.setSituation(
            {
              "contrat salarié . convention collective": "'IDCC0044'",
              "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle":
                category,
              "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique":
                isEconomicFiring ? `'Oui'` : `'Non'`,
              "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique . age":
                age,

              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
                seniority,
              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
                seniorityRight,
              "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
                salary,
            },
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
          expect(missingArgs).toEqual([]);
          expect(result.unit?.numerators).toEqual(["€"]);
          expect(result.value).toEqual(expectedCompensation);
        }
      );
    });

    describe("Technicien", () => {
      test.each`
        category                     | isEconomicFiring | age   | seniorityRight | seniority | salary  | expectedCompensation
        ${CategoryPro44.techniciens} | ${true}          | ${30} | ${0.75}        | ${0.75}   | ${2500} | ${0}
        ${CategoryPro44.techniciens} | ${true}          | ${30} | ${0.99}        | ${0.99}   | ${2500} | ${0}
        ${CategoryPro44.techniciens} | ${true}          | ${30} | ${0.99}        | ${1}      | ${2500} | ${0}
        ${CategoryPro44.techniciens} | ${true}          | ${30} | ${1}           | ${1}      | ${2500} | ${2500}
        ${CategoryPro44.techniciens} | ${true}          | ${30} | ${1}           | ${1.5}    | ${2500} | ${2500}
        ${CategoryPro44.techniciens} | ${true}          | ${30} | ${1}           | ${2}      | ${2500} | ${5000}
        ${CategoryPro44.techniciens} | ${true}          | ${30} | ${1}           | ${5}      | ${2500} | ${5000}
        ${CategoryPro44.techniciens} | ${true}          | ${52} | ${0.75}        | ${0.75}   | ${2500} | ${0}
        ${CategoryPro44.techniciens} | ${true}          | ${52} | ${0.75}        | ${1}      | ${2500} | ${0}
        ${CategoryPro44.techniciens} | ${true}          | ${52} | ${1}           | ${1.5}    | ${2500} | ${2500}
        ${CategoryPro44.techniciens} | ${true}          | ${52} | ${1}           | ${2}      | ${2500} | ${5000}
        ${CategoryPro44.techniciens} | ${true}          | ${52} | ${1}           | ${5}      | ${2500} | ${8750}
        ${CategoryPro44.techniciens} | ${true}          | ${56} | ${0.75}        | ${0.75}   | ${2500} | ${0}
        ${CategoryPro44.techniciens} | ${true}          | ${56} | ${0.75}        | ${1}      | ${2500} | ${0}
        ${CategoryPro44.techniciens} | ${true}          | ${56} | ${1}           | ${1.5}    | ${2500} | ${2500}
        ${CategoryPro44.techniciens} | ${true}          | ${56} | ${1}           | ${2}      | ${2500} | ${5000}
        ${CategoryPro44.techniciens} | ${true}          | ${56} | ${1}           | ${5}      | ${2500} | ${8750}
      `(
        "Avec $seniority ans, catégorie $category, age $age, isEconomicFiring $isEconomicFiring et sref : $salary => $expectedCompensation €",
        ({
          category,
          isEconomicFiring,
          age,
          seniority,
          seniorityRight,
          salary,
          expectedCompensation,
        }) => {
          const { result, missingArgs } = engine.setSituation(
            {
              "contrat salarié . convention collective": "'IDCC0044'",
              "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle":
                category,
              "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique":
                isEconomicFiring ? `'Oui'` : `'Non'`,
              "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique . age":
                age,

              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
                seniority,
              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
                seniorityRight,
              "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
                salary,
            },
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
          expect(missingArgs).toEqual([]);
          expect(result.unit?.numerators).toEqual(["€"]);
          expect(result.value).toEqual(expectedCompensation);
        }
      );
    });

    describe("Ingénieur", () => {
      test.each`
        category              | isEconomicFiring | age   | seniorityRight | seniority | salary  | expectedCompensation
        ${CategoryPro44.inge} | ${true}          | ${30} | ${0.75}        | ${0.75}   | ${2500} | ${0}
        ${CategoryPro44.inge} | ${true}          | ${30} | ${0.99}        | ${0.99}   | ${2500} | ${0}
        ${CategoryPro44.inge} | ${true}          | ${30} | ${0.99}        | ${1}      | ${2500} | ${0}
        ${CategoryPro44.inge} | ${true}          | ${30} | ${1}           | ${1}      | ${2500} | ${2500}
        ${CategoryPro44.inge} | ${true}          | ${30} | ${1}           | ${1.5}    | ${2500} | ${2500}
        ${CategoryPro44.inge} | ${true}          | ${30} | ${1}           | ${2}      | ${2500} | ${5000}
        ${CategoryPro44.inge} | ${true}          | ${30} | ${1}           | ${5}      | ${2500} | ${5000}
        ${CategoryPro44.inge} | ${true}          | ${52} | ${0.75}        | ${0.75}   | ${2500} | ${0}
        ${CategoryPro44.inge} | ${true}          | ${52} | ${0.75}        | ${1}      | ${2500} | ${0}
        ${CategoryPro44.inge} | ${true}          | ${52} | ${1}           | ${1.5}    | ${2500} | ${2500}
        ${CategoryPro44.inge} | ${true}          | ${52} | ${1}           | ${2}      | ${2500} | ${5000}
        ${CategoryPro44.inge} | ${true}          | ${52} | ${1}           | ${5}      | ${2500} | ${10000}
        ${CategoryPro44.inge} | ${true}          | ${56} | ${0.75}        | ${0.75}   | ${2500} | ${0}
        ${CategoryPro44.inge} | ${true}          | ${56} | ${0.75}        | ${1}      | ${2500} | ${0}
        ${CategoryPro44.inge} | ${true}          | ${56} | ${1}           | ${1.5}    | ${2500} | ${2500}
        ${CategoryPro44.inge} | ${true}          | ${56} | ${1}           | ${2}      | ${2500} | ${5000}
        ${CategoryPro44.inge} | ${true}          | ${56} | ${1}           | ${5}      | ${2500} | ${10000}
      `(
        "Avec $seniority ans, catégorie $category, age $age, isEconomicFiring $isEconomicFiring et sref : $salary => $expectedCompensation €",
        ({
          category,
          isEconomicFiring,
          age,
          seniority,
          seniorityRight,
          salary,
          expectedCompensation,
        }) => {
          const { result, missingArgs } = engine.setSituation(
            {
              "contrat salarié . convention collective": "'IDCC0044'",
              "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle":
                category,
              "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique":
                isEconomicFiring ? `'Oui'` : `'Non'`,
              "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique . age":
                age,

              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
                seniority,
              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
                seniorityRight,
              "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
                salary,
            },
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
          expect(missingArgs).toEqual([]);
          expect(result.unit?.numerators).toEqual(["€"]);
          expect(result.value).toEqual(expectedCompensation);
        }
      );
    });

    test("it", () => {
      const situtation = {
        "contrat salarié . convention collective": "'IDCC0044'",
        "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle":
          "'Ouvriers et collaborateurs (Groupes I à III)'",
        "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . licenciement économique . age":
          "57",
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2019",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/01/2024",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/01/2024",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        hasVariablePay: "oui",
        licenciementFauteGrave: "non",
        salaryPeriods:
          '[{"month":"décembre 2023","value":3541},{"month":"novembre 2023","value":3555},{"month":"octobre 2023","value":3512},{"month":"septembre 2023","value":3596},{"month":"août 2023","value":3310},{"month":"juillet 2023","value":3554},{"month":"juin 2023","value":3560},{"month":"mai 2023","value":3330},{"month":"avril 2023","value":3530},{"month":"mars 2023","value":3510},{"month":"février 2023","value":3580},{"month":"janvier 2023","value":3362}]',
        typeContratTravail: "cdi",
      };
      const { result, missingArgs } = engine.setSituation(
        situtation,
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
      expect(missingArgs).toHaveLength(0);
      expect(result.value).toEqual(12000);
    });
  });
});
