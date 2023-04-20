import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";
import { CategoryPro675 } from "../../types";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "675"
);

describe("Indemnité conventionnel de licenciement pour la CC 675", () => {
  describe("Défaut", () => {
    test.each`
      category                  | seniority | salary  | expectedCompensation
      ${CategoryPro675.employe} | ${0}      | ${2500} | ${0}
      ${CategoryPro675.agents}  | ${0}      | ${2500} | ${0}
      ${CategoryPro675.cadres}  | ${0}      | ${2500} | ${0}
    `(
      "Avec $seniority ans, catégorie $category, isCollectifFiring Non et sref : $salary => $expectedCompensation €",
      ({ category, seniority, salary, expectedCompensation }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0675'",
            "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
            "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie professionnelle . agents . licenciement collectif question": `'Non'`,
            "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie professionnelle . cadres . licenciement collectif question": `'Non'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
            "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle": `'Non'`,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(missingArgs).toEqual([]);
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.value).toEqual(expectedCompensation);
      }
    );
  });

  describe("Employés", () => {
    test.each`
      seniority | seniorityRight | salary  | expectedCompensation
      ${1}      | ${1}           | ${1488} | ${0}
      ${5}      | ${2}           | ${1488} | ${0}
      ${5}      | ${2.01}        | ${1488} | ${744}
      ${15}     | ${2.01}        | ${1488} | ${2976}
      ${20}     | ${2.01}        | ${1488} | ${5952}
    `(
      "Avec $seniority ans, isCollectifFiring $isCollectifFiring et sref : $salary => $expectedCompensation €",
      ({ seniority, salary, expectedCompensation, seniorityRight }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0675'",
            "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie professionnelle": `'${CategoryPro675.employe}'`,
            "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . salaire mensuel des 3 derniers mois":
              salary,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
            "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle": `'Non'`,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(missingArgs).toEqual([]);
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.value).toEqual(expectedCompensation);
      }
    );

    test("Si l'inaptitude suite à un accident ou maladie professionnelle' alors pas de question pour motif eco", () => {
      const { result, missingArgs } = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC0675'",
          "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie professionnelle": `'${CategoryPro675.employe}'`,
          "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . salaire mensuel des 3 derniers mois":
            "1488",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            "15",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            "15",
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "1488",
          "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle": `'Oui'`,
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
      expect(missingArgs).toEqual([]);
      expect(result.unit?.numerators).toEqual(["€"]);
      expect(result.value).toEqual(2976);
    });
  });

  describe("Agents", () => {
    test.each`
      isCollectifFiring | age   | seniority | seniorityRight | salary  | expectedCompensation
      ${false}          | ${22} | ${1}      | ${1}           | ${1950} | ${0}
      ${false}          | ${22} | ${6}      | ${2}           | ${1950} | ${0}
      ${false}          | ${22} | ${6}      | ${2.01}        | ${1950} | ${1170}
      ${false}          | ${22} | ${20}     | ${2.01}        | ${1950} | ${9750}
      ${false}          | ${22} | ${22}     | ${2.01}        | ${1950} | ${11310}
      ${false}          | ${50} | ${1}      | ${1}           | ${1950} | ${0}
      ${false}          | ${50} | ${6}      | ${2}           | ${1950} | ${0}
      ${false}          | ${50} | ${6}      | ${2.01}        | ${1950} | ${1170}
      ${false}          | ${50} | ${20}     | ${2.01}        | ${1950} | ${14625}
      ${false}          | ${50} | ${22}     | ${2.01}        | ${1950} | ${16965}
      ${true}           | ${35} | ${1}      | ${1}           | ${1950} | ${0}
      ${true}           | ${35} | ${6}      | ${2}           | ${1950} | ${0}
      ${true}           | ${35} | ${6}      | ${2.01}        | ${1950} | ${1170}
      ${true}           | ${35} | ${20}     | ${2.01}        | ${1950} | ${9750}
      ${true}           | ${35} | ${22}     | ${2.01}        | ${1950} | ${11310}
      ${true}           | ${35} | ${25}     | ${2.01}        | ${1950} | ${11700}
    `(
      "avec $seniority ans d'ancienneté, age $age, isCollectifFiring $isCollectifFiring et sref : $salary => $expectedCompensation €",
      ({
        isCollectifFiring,
        seniority,
        salary,
        age,
        expectedCompensation,
        seniorityRight,
      }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0675'",
            "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie professionnelle": `'${CategoryPro675.agents}'`,
            "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie professionnelle . agents . licenciement collectif question":
              isCollectifFiring ? `'Oui'` : `'Non'`,
            "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie professionnelle . agents . autres licenciement . age":
              age,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
            "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle": `'Non'`,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(missingArgs).toEqual([]);
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.value).toEqual(expectedCompensation);
      }
    );

    test("Si l'inaptitude suite à un accident ou maladie professionnelle' alors pas de question pour motif eco", () => {
      const { result, missingArgs } = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC0675'",
          "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie professionnelle": `'${CategoryPro675.agents}'`,
          "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie professionnelle . agents . autres licenciement . age":
            "22",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            "22",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            "22",
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "1950",
          "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle": `'Oui'`,
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
      expect(missingArgs).toEqual([]);
      expect(result.unit?.numerators).toEqual(["€"]);
      expect(result.value).toEqual(11310);
    });
  });

  describe("Cadres", () => {
    test.each`
      isCollectifFiring | age   | seniority | seniorityRight | salary  | expectedCompensation
      ${false}          | ${35} | ${1.5}    | ${1.5}         | ${3132} | ${0}
      ${false}          | ${35} | ${4}      | ${2}           | ${3132} | ${0}
      ${false}          | ${35} | ${4}      | ${2.01}        | ${3132} | ${1252.8}
      ${false}          | ${35} | ${5}      | ${2.01}        | ${3132} | ${1566}
      ${false}          | ${35} | ${20}     | ${2.01}        | ${3132} | ${15660}
      ${false}          | ${5}  | ${1.5}    | ${1.5}         | ${3132} | ${0}
      ${false}          | ${50} | ${4}      | ${2}           | ${3132} | ${0}
      ${false}          | ${50} | ${4}      | ${2.01}        | ${3132} | ${1252.8}
      ${false}          | ${50} | ${5}      | ${2.01}        | ${3132} | ${1566}
      ${false}          | ${50} | ${20}     | ${2.01}        | ${3132} | ${23490}
      ${true}           | ${35} | ${1.5}    | ${1.5}         | ${3132} | ${0}
      ${true}           | ${35} | ${4}      | ${2}           | ${3132} | ${0}
      ${true}           | ${35} | ${4}      | ${2.01}        | ${3132} | ${1252.8}
      ${true}           | ${35} | ${5}      | ${2.01}        | ${3132} | ${1566}
      ${true}           | ${35} | ${20}     | ${2.01}        | ${3132} | ${15660}
    `(
      "Avec $seniority ans, age $age, isCollectifFiring $isCollectifFiring et sref : $salary => $expectedCompensation €",
      ({
        isCollectifFiring,
        seniority,
        salary,
        age,
        expectedCompensation,
        seniorityRight,
      }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0675'",
            "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie professionnelle": `'${CategoryPro675.cadres}'`,
            "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie professionnelle . cadres . licenciement collectif question":
              isCollectifFiring ? `'Oui'` : `'Non'`,
            "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie professionnelle . cadres . autres licenciement . age":
              age,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
            "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle": `'Non'`,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(missingArgs).toEqual([]);
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.value).toEqual(expectedCompensation);
      }
    );

    test("Si l'inaptitude suite à un accident ou maladie professionnelle' alors pas de question pour motif eco", () => {
      const { result, missingArgs } = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC0675'",
          "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie professionnelle": `'${CategoryPro675.cadres}'`,
          "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie professionnelle . cadres . autres licenciement . age":
            "35",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            "20",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            "20",
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "3132",
          "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle": `'Oui'`,
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
      expect(missingArgs).toEqual([]);
      expect(result.unit?.numerators).toEqual(["€"]);
      expect(result.value).toEqual(15660);
    });
  });
});
