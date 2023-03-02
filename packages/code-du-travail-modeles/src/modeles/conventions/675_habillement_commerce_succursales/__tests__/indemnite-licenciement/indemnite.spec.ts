import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";
import { CategoryPro675 } from "../../types";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "675"
);

describe("Indemnité conventionnel de licenciement pour la CC 675", () => {
  describe("Défaut", () => {
    test.each`
      category                  | isCollectifFiring | seniority | salary  | expectedCompensation
      ${CategoryPro675.employe} | ${false}          | ${0}      | ${2500} | ${0}
      ${CategoryPro675.agents}  | ${false}          | ${0}      | ${2500} | ${0}
      ${CategoryPro675.cadres}  | ${false}          | ${0}      | ${2500} | ${0}
    `(
      "Avec $seniority ans, catégorie $category, isCollectifFiring $isCollectifFiring et sref : $salary => $expectedCompensation €",
      ({
        category,
        seniority,
        salary,
        expectedCompensation,
        isCollectifFiring,
      }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0675'",
            "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie": `'${category}'`,
            "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie . agents . licenciement collectif":
              isCollectifFiring ? `'Oui'` : `'Non'`,
            "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie . cadres . licenciement collectif":
              isCollectifFiring ? `'Oui'` : `'Non'`,
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

  describe("Employés", () => {
    test.each`
      category                  | isCollectifFiring | seniority | salary  | expectedCompensation
      ${CategoryPro675.employe} | ${false}          | ${1}      | ${1488} | ${0}
      ${CategoryPro675.employe} | ${false}          | ${5}      | ${1488} | ${744}
      ${CategoryPro675.employe} | ${false}          | ${15}     | ${1488} | ${2976}
      ${CategoryPro675.employe} | ${false}          | ${20}     | ${1488} | ${5952}
    `(
      "Avec $seniority ans, catégorie $category, isCollectifFiring $isCollectifFiring et sref : $salary => $expectedCompensation €",
      ({ category, seniority, salary, expectedCompensation }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0675'",
            "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie": `'${category}'`,
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

  describe("Agents", () => {
    test.each`
      category                 | isCollectifFiring | age   | seniority | salary  | expectedCompensation
      ${CategoryPro675.agents} | ${false}          | ${22} | ${1}      | ${1950} | ${0}
      ${CategoryPro675.agents} | ${false}          | ${22} | ${6}      | ${1950} | ${1170}
      ${CategoryPro675.agents} | ${false}          | ${22} | ${20}     | ${1950} | ${9750}
      ${CategoryPro675.agents} | ${false}          | ${22} | ${22}     | ${1950} | ${11310}
      ${CategoryPro675.agents} | ${false}          | ${50} | ${1}      | ${1950} | ${0}
      ${CategoryPro675.agents} | ${false}          | ${50} | ${6}      | ${1950} | ${1170}
      ${CategoryPro675.agents} | ${false}          | ${50} | ${20}     | ${1950} | ${14625}
      ${CategoryPro675.agents} | ${false}          | ${50} | ${22}     | ${1950} | ${16965}
      ${CategoryPro675.agents} | ${true}           | ${35} | ${1}      | ${1950} | ${0}
      ${CategoryPro675.agents} | ${true}           | ${35} | ${6}      | ${1950} | ${1170}
      ${CategoryPro675.agents} | ${true}           | ${35} | ${20}     | ${1950} | ${9750}
      ${CategoryPro675.agents} | ${true}           | ${35} | ${22}     | ${1950} | ${11310}
      ${CategoryPro675.agents} | ${true}           | ${35} | ${25}     | ${1950} | ${11700}
    `(
      "Avec $seniority ans, catégorie $category, age $age,isCollectifFiring $isCollectifFiring et sref : $salary => $expectedCompensation €",
      ({
        category,
        isCollectifFiring,
        seniority,
        salary,
        age,
        expectedCompensation,
      }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0675'",
            "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie": `'${category}'`,
            "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie . agents . licenciement collectif":
              isCollectifFiring ? `'Oui'` : `'Non'`,
            "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie . agents . licenciement collectif . autres . age":
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

  describe("Cadres", () => {
    test.each`
      category                 | isCollectifFiring | age   | seniority | salary  | expectedCompensation
      ${CategoryPro675.cadres} | ${false}          | ${35} | ${1.5}    | ${3132} | ${0}
      ${CategoryPro675.cadres} | ${false}          | ${35} | ${4}      | ${3132} | ${1252.8}
      ${CategoryPro675.cadres} | ${false}          | ${35} | ${5}      | ${3132} | ${1566}
      ${CategoryPro675.cadres} | ${false}          | ${35} | ${20}     | ${3132} | ${15660}
      ${CategoryPro675.cadres} | ${false}          | ${5}  | ${1.5}    | ${3132} | ${0}
      ${CategoryPro675.cadres} | ${false}          | ${50} | ${4}      | ${3132} | ${1252.8}
      ${CategoryPro675.cadres} | ${false}          | ${50} | ${5}      | ${3132} | ${1566}
      ${CategoryPro675.cadres} | ${false}          | ${50} | ${20}     | ${3132} | ${23490}
      ${CategoryPro675.cadres} | ${true}           | ${35} | ${1.5}    | ${3132} | ${0}
      ${CategoryPro675.cadres} | ${true}           | ${35} | ${4}      | ${3132} | ${1252.8}
      ${CategoryPro675.cadres} | ${true}           | ${35} | ${5}      | ${3132} | ${1566}
      ${CategoryPro675.cadres} | ${true}           | ${35} | ${20}     | ${3132} | ${15660}
    `(
      "Avec $seniority ans, catégorie $category, age $age, isCollectifFiring $isCollectifFiring et sref : $salary => $expectedCompensation €",
      ({
        category,
        isCollectifFiring,
        seniority,
        salary,
        age,
        expectedCompensation,
      }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0675'",
            "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie": `'${category}'`,
            "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie . cadres . licenciement collectif":
              isCollectifFiring ? `'Oui'` : `'Non'`,
            "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie . cadres . licenciement collectif . autres . age":
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
});
