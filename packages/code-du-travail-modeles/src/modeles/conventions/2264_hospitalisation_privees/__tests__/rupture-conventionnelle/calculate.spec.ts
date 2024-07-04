import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "2264"
);

describe("Un seul type de licenciement pour la CC 2264", () => {
  describe("Vérifier qu'il n'y a pas d'ancienneté conventionnelle requise", () => {
    test("Non-cadres", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC2264'",
        "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle":
          "'Non-cadres'",
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
      expect(result).toAgreementResultBeEqual(100, "€");
    });

    test("Cadres", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC2264'",
        "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle . cadre . non cadre durant une période":
          "'Non'",
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
      expect(result).toAgreementResultBeEqual(100, "€");
    });
  });
});
