import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "2596"
);

describe("Calcul de l'indemnité de rupture conventionnelle pour la CC 2596", () => {
  describe("Vérifier qu'il n'y a pas d'ancienneté conventionnelle requise", () => {
    test("Emplois techniques et de coiffeurs", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC2596'",
        "contrat salarié . convention collective . coiffure . indemnité de licenciement . catégorie professionnelle":
          "'Emplois techniques et de coiffeurs'",
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2024",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/03/2024",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/03/2024",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        licenciementFauteGrave: "non",
        noticeSalaryPeriods: "[]",
        salaryPeriods:
          '[{"month":"février 2024","value":3000},{"month":"janvier 2024","value":3000}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(125, "€");
    });

    test("Emplois de l'esthétique-cosmétique", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC2596'",
        "contrat salarié . convention collective . coiffure . indemnité de licenciement . catégorie professionnelle":
          "'Emplois de l'esthétique-cosmétique'",
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2024",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/03/2024",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/03/2024",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        licenciementFauteGrave: "non",
        noticeSalaryPeriods: "[]",
        salaryPeriods:
          '[{"month":"février 2024","value":3000},{"month":"janvier 2024","value":3000}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(125, "€");
    });

    test("Emplois non techniques", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC2596'",
        "contrat salarié . convention collective . coiffure . indemnité de licenciement . catégorie professionnelle":
          "'Emplois non techniques'",
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2024",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/03/2024",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/03/2024",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        licenciementFauteGrave: "non",
        noticeSalaryPeriods: "[]",
        salaryPeriods:
          '[{"month":"février 2024","value":3000},{"month":"janvier 2024","value":3000}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(125, "€");
    });

    test("Agents de maîtrise", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC2596'",
        "contrat salarié . convention collective . coiffure . indemnité de licenciement . catégorie professionnelle":
          "'Agents de maîtrise'",
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2024",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/03/2024",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/03/2024",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        licenciementFauteGrave: "non",
        noticeSalaryPeriods: "[]",
        salaryPeriods:
          '[{"month":"février 2024","value":3000},{"month":"janvier 2024","value":3000}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(125, "€");
    });

    test("Cadres", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC2596'",
        "contrat salarié . convention collective . coiffure . indemnité de licenciement . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2024",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/03/2024",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/03/2024",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        licenciementFauteGrave: "non",
        noticeSalaryPeriods: "[]",
        salaryPeriods:
          '[{"month":"février 2024","value":3000},{"month":"janvier 2024","value":3000}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(125, "€");
    });
  });
});
