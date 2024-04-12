import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "675"
);

describe("Gestion des licenciements pour la CC675", () => {
  test("Sans arguments", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC0675'",
    };

    const { missingArgs } = engine.calculate(input);
    expect(missingArgs).toHaveNextMissingRule(
      "contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle"
    );
  });

  test("En étant Employé", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC0675'",
      "contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle": `'Employés'`,
    };

    const { missingArgs } = engine.calculate(input);
    expect(missingArgs).toHaveNextMissingRule(null);
  });

  test("En étant Cadre, il doit demandé l'age", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC0675'",
      "contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle": `'Cadres'`,
    };

    const { missingArgs } = engine.calculate(input);
    expect(missingArgs).toHaveNextMissingRule(
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

    const { missingArgs } = engine.calculate(input);
    expect(missingArgs).toHaveNextMissingRule(null);
  });

  test("En étant Agents de maîtrisen, il doit demandé l'age", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC0675'",
      "contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle": `'Agents de maîtrise'`,
    };

    const { missingArgs } = engine.calculate(input);
    expect(missingArgs).toHaveNextMissingRule(
      "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . agents . autres licenciement . age"
    );
  });

  test("En étant Agents de maîtrisen", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC0675'",
      "contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle": `'Agents de maîtrise'`,
      "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . agents . autres licenciement . age":
        "50",
    };

    const { missingArgs } = engine.calculate(input);
    expect(missingArgs).toHaveNextMissingRule(null);
  });
});
