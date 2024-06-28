import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "2216"
);

describe("Un seul type de licenciement pour la CC 2216", () => {
  test("Missing variables", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC2216'",
      "contrat salarié . convention collective . commerce gros et detail alimentation . indemnité de licenciement . catégorie professionnelle":
        "'Employés et ouvriers, personnel de livraison'",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
    };

    const result = engine.calculate(input);
    expect(result).toNextMissingRuleBeEqual(
      "contrat salarié . convention collective . commerce gros et detail alimentation . rupture conventionnelle . licenciement économique age"
    );
  });

  test("No missing variables", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC2216'",
      "contrat salarié . convention collective . commerce gros et detail alimentation . indemnité de licenciement . catégorie professionnelle":
        "'Employés et ouvriers, personnel de livraison'",
      "contrat salarié . convention collective . commerce gros et detail alimentation . rupture conventionnelle . licenciement économique age":
        "40",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
    };

    const result = engine.calculate(input);
    expect(result).toNextMissingRuleBeEqual(null);
  });

  test("Employés et ouvriers, personnel de livraison - Autres licenciements plus favorable", () => {
    const result = engine.calculate({
      "contrat salarié . convention collective": "'IDCC2216'",
      "contrat salarié . convention collective . commerce gros et detail alimentation . indemnité de licenciement . catégorie professionnelle":
        '"Employés et ouvriers, personnel de livraison"',
      "contrat salarié . convention collective . commerce gros et detail alimentation . rupture conventionnelle . licenciement économique age":
        "55",
      "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
      "contrat salarié . indemnité de licenciement . date d'entrée":
        "01/01/2000",
      "contrat salarié . indemnité de licenciement . date de notification":
        "01/01/2025",
      "contrat salarié . indemnité de licenciement . date de sortie":
        "01/01/2025",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      "contrat salarié . indemnité de licenciement . salaire de référence":
        "2000",
      "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
        "2000",
      licenciementFauteGrave: "non",
      typeContratTravail: "cdi",
    });
    expect(result).toAgreementResultBeEqual(15000, "€");
  });

  test("Cadres - Autres licenciements plus favorable", () => {
    const result = engine.calculate({
      "contrat salarié . convention collective": "'IDCC2216'",
      "contrat salarié . convention collective . commerce gros et detail alimentation . indemnité de licenciement . catégorie professionnelle":
        '"Cadres"',
      "contrat salarié . convention collective . commerce gros et detail alimentation . rupture conventionnelle . licenciement économique age":
        "45",
      "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
      "contrat salarié . indemnité de licenciement . date d'entrée":
        "01/01/2000",
      "contrat salarié . indemnité de licenciement . date de notification":
        "01/01/2025",
      "contrat salarié . indemnité de licenciement . date de sortie":
        "01/01/2025",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      "contrat salarié . indemnité de licenciement . salaire de référence":
        "2000",
      "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
        "2000",
      licenciementFauteGrave: "non",
      typeContratTravail: "cdi",
    });
    expect(result).toAgreementResultBeEqual(19000, "€");
  });

  describe("Vérifier qu'il n'y a pas d'ancienneté conventionnelle requise", () => {
    test("Employés et ouvriers, personnel de livraison", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC2216'",
        "contrat salarié . convention collective . commerce gros et detail alimentation . indemnité de licenciement . catégorie professionnelle":
          "'Employés et ouvriers, personnel de livraison'",
        "contrat salarié . convention collective . commerce gros et detail alimentation . rupture conventionnelle . licenciement économique age":
          "50",
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2024",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/03/2024",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/03/2024",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        hasCommission: "non",
        licenciementFauteGrave: "non",
        noticeSalaryPeriods: "[]",
        salariesVariablePart: "1000",
        salaryPeriods:
          '[{"month":"février 2024","value":3000},{"month":"janvier 2024","value":3000}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(125, "€");
    });

    test("Agents de maîtrise et techniciens", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC2216'",
        "contrat salarié . convention collective . commerce gros et detail alimentation . indemnité de licenciement . catégorie professionnelle":
          "'Agents de maîtrise et techniciens'",
        "contrat salarié . convention collective . commerce gros et detail alimentation . rupture conventionnelle . licenciement économique age":
          "50",
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2024",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/03/2024",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/03/2024",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        hasCommission: "non",
        licenciementFauteGrave: "non",
        noticeSalaryPeriods: "[]",
        salariesVariablePart: "1000",
        salaryPeriods:
          '[{"month":"février 2024","value":3000},{"month":"janvier 2024","value":3000}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(125, "€");
    });

    test("Cadres", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC2216'",
        "contrat salarié . convention collective . commerce gros et detail alimentation . indemnité de licenciement . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . commerce gros et detail alimentation . rupture conventionnelle . licenciement économique age":
          "50",
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2024",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/03/2024",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/03/2024",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        hasCommission: "non",
        licenciementFauteGrave: "non",
        noticeSalaryPeriods: "[]",
        salariesVariablePart: "1000",
        salaryPeriods:
          '[{"month":"février 2024","value":3000},{"month":"janvier 2024","value":3000}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(125, "€");
    });
  });
});
