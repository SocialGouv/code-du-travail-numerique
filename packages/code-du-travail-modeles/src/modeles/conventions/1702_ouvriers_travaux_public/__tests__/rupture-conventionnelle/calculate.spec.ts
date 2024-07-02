import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "1702"
);

describe("Un seul type de licenciement pour la CC 1702", () => {
  test("Missing variables", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC1702'",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
    };

    const result = engine.calculate(input);
    expect(result).toNextMissingRuleBeEqual(
      "contrat salarié . convention collective . ouvriers travaux public . rupture conventionnelle . age"
    );
  });

  test("No missing variables", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC1702'",
      "contrat salarié . convention collective . ouvriers travaux public . rupture conventionnelle . age":
        "40",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
    };

    const missingVars = engine.calculate(input);
    expect(missingVars).toNextMissingRuleBeEqual(null);
  });

  test("Autres licenciements est moins favorable que l'économique", () => {
    const result = engine.calculate({
      "contrat salarié . convention collective": "'IDCC1702'",
      "contrat salarié . convention collective . ouvriers travaux public . rupture conventionnelle . age":
        "65",
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
        "3000",
      licenciementFauteGrave: "non",
      typeContratTravail: "cdi",
    });
    expect(result).toAgreementResultBeEqual(14025, "€");
  });

  describe("Vérifier qu'il n'y a pas d'ancienneté conventionnelle requise", () => {
    test("Cas de base", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1702'",
        "contrat salarié . convention collective . ouvriers travaux public . rupture conventionnelle . age":
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
        salaryPeriods:
          '[{"month":"février 2024","value":3000},{"month":"janvier 2024","value":3000}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(50, "€");
    });
  });
});
