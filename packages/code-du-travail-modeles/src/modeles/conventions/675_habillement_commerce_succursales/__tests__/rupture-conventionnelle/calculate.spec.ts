import { RuptureConventionnellePublicodes } from "../../../../../publicodes";
import { CategoryPro675 } from "../../types";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "675"
);

describe("Gestion des licenciements pour la CC675", () => {
  test("Sans arguments", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC0675'",
    };

    const result = engine.calculate(input);
    expect(result).toNextMissingRuleBeEqual(
      "contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle"
    );
  });

  test("En étant Employé", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC0675'",
      "contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle": `'Employés'`,
    };

    const result = engine.calculate(input);
    expect(result).toNextMissingRuleBeEqual(null);
  });

  test("En étant Cadre, il doit demandé l'age", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC0675'",
      "contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle": `'Cadres'`,
    };

    const result = engine.calculate(input);
    expect(result).toNextMissingRuleBeEqual(
      "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . cadres . autres licenciement . age"
    );
  });

  test("En étant Cadre", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC0675'",
      "contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle": `'Cadres'`,
      "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . cadres . autres licenciement . age":
        "50",
    };

    const result = engine.calculate(input);
    expect(result).toNextMissingRuleBeEqual(null);
  });

  test("En étant Agents de maîtrise, il doit demandé l'age", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC0675'",
      "contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle": `'Agents de maîtrise'`,
    };

    const result = engine.calculate(input);
    expect(result).toNextMissingRuleBeEqual(
      "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . agents . autres licenciement . age"
    );
  });

  test("En étant Agents de maîtrise", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC0675'",
      "contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle": `'Agents de maîtrise'`,
      "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . agents . autres licenciement . age":
        "50",
    };

    const result = engine.calculate(input);
    expect(result).toNextMissingRuleBeEqual(null);
  });

  describe("Cadres", () => {
    test.each`
      age   | seniority | seniorityRight | salary  | expectedCompensation
      ${35} | ${1.5}    | ${1.5}         | ${3132} | ${undefined}
      ${35} | ${4}      | ${2}           | ${3132} | ${undefined}
      ${35} | ${4}      | ${2.01}        | ${3132} | ${1252.8}
      ${35} | ${5}      | ${2.01}        | ${3132} | ${1566}
      ${35} | ${20}     | ${2.01}        | ${3132} | ${15660}
      ${5}  | ${1.5}    | ${1.5}         | ${3132} | ${undefined}
      ${50} | ${4}      | ${2}           | ${3132} | ${undefined}
      ${50} | ${4}      | ${2.01}        | ${3132} | ${1252.8}
      ${50} | ${5}      | ${2.01}        | ${3132} | ${1566}
      ${50} | ${20}     | ${2.01}        | ${3132} | ${15660}
      ${35} | ${1.5}    | ${1.5}         | ${3132} | ${undefined}
      ${35} | ${4}      | ${2}           | ${3132} | ${undefined}
      ${35} | ${4}      | ${2.01}        | ${3132} | ${1252.8}
      ${35} | ${5}      | ${2.01}        | ${3132} | ${1566}
      ${35} | ${20}     | ${2.01}        | ${3132} | ${15660}
    `(
      "Rupture co avec $seniority ans, age $age et sref : $salary => $expectedCompensation €",
      ({ seniority, salary, age, expectedCompensation, seniorityRight }) => {
        const result = engine.calculate({
          "contrat salarié . convention collective": "'IDCC0675'",
          "contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle": `'${CategoryPro675.cadres}'`,
          "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . cadres . autres licenciement . age":
            age,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniorityRight,
          "contrat salarié . indemnité de licenciement . ancienneté en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté requise en année":
            seniorityRight,
          "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
            "non",
          "contrat salarié . indemnité de licenciement . salaire de référence":
            salary,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            salary,
        });
        expect(result).toAgreementResultBeEqual(expectedCompensation);
      }
    );
  });
  describe("Agents", () => {
    test.each`
      age   | seniority | seniorityRight | salary  | expectedCompensation
      ${22} | ${1}      | ${1}           | ${1950} | ${undefined}
      ${22} | ${6}      | ${2}           | ${1950} | ${undefined}
      ${22} | ${6}      | ${2.01}        | ${1950} | ${1170}
      ${22} | ${20}     | ${2.01}        | ${1950} | ${9750}
      ${22} | ${22}     | ${2.01}        | ${1950} | ${11310}
      ${50} | ${1}      | ${1}           | ${1950} | ${undefined}
      ${50} | ${6}      | ${2}           | ${1950} | ${undefined}
      ${50} | ${6}      | ${2.01}        | ${1950} | ${1170}
      ${50} | ${20}     | ${2.01}        | ${1950} | ${9750}
      ${50} | ${22}     | ${2.01}        | ${1950} | ${11310}
      ${35} | ${1}      | ${1}           | ${1950} | ${undefined}
      ${35} | ${6}      | ${2}           | ${1950} | ${undefined}
      ${35} | ${6}      | ${2.01}        | ${1950} | ${1170}
      ${35} | ${20}     | ${2.01}        | ${1950} | ${9750}
      ${35} | ${22}     | ${2.01}        | ${1950} | ${11310}
      ${35} | ${25}     | ${2.01}        | ${1950} | ${11700}
    `(
      "avec $seniority ans d'ancienneté, age $age et sref : $salary => $expectedCompensation €",
      ({ seniority, salary, age, expectedCompensation, seniorityRight }) => {
        const result = engine.calculate({
          "contrat salarié . convention collective": "'IDCC0675'",
          "contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle": `'${CategoryPro675.agents}'`,
          "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . agents . autres licenciement . age":
            age,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniorityRight,
          "contrat salarié . indemnité de licenciement . ancienneté en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté requise en année":
            seniorityRight,
          "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
            "non",
          "contrat salarié . indemnité de licenciement . salaire de référence":
            salary,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            salary,
        });
        expect(result).toAgreementResultBeEqual(expectedCompensation);
      }
    );
  });
});
