import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "1486"
);

describe("Rupture conventionnelle pour la CC 1486", () => {
  describe("Missing variables", () => {
    test("Sans arguments", () => {
      const input = {
        "contrat salarié . convention collective": "'IDCC1486'",
      };

      const result = engine.calculate(input);
      expect(result).toNextMissingRuleBeEqual(
        "contrat-salarie-convention-collective-bureaux-etudes-techniques-indemnite-de-licenciement-categorie-professionnelle"
      );
    });

    test.each([
      "ETAM",
      "Ingénieurs et cadres",
      "Chargés d'enquête intermittents",
    ])("En étant %s", (catPro) => {
      const input = {
        "contrat salarié . convention collective": "'IDCC1486'",
        "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . catégorie professionnelle": `'${catPro}'`,
      };

      const result = engine.calculate(input);
      expect(result).toNextMissingRuleBeEqual(null);
    });
  });

  describe("Désactivation des anciennes règles", () => {
    test("Calcul pour les chargés d'enquête intermittents", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1486'",
        "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . catégorie professionnelle": `'Chargés d'enquête intermittents'`,
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2020",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/01/2024",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/01/2024",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        licenciementFauteGrave: "non",
        salaryPeriods:
          '[{"month":"décembre 2023","value":2266},{"month":"novembre 2023","value":2250},{"month":"octobre 2023","value":2203},{"month":"septembre 2023","value":2199},{"month":"août 2023","value":2100},{"month":"juillet 2023","value":2020},{"month":"juin 2023","value":2010},{"month":"mai 2023","value":2010},{"month":"avril 2023","value":1930},{"month":"mars 2023","value":1890},{"month":"février 2023","value":1900},{"month":"janvier 2023","value":1800}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(3277.07, "€");
    });
  });

  describe("Vérifier qu'il y a une ancienneté conventionnelle requise", () => {
    test("ETAM", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1486'",
        "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . catégorie professionnelle":
          "'ETAM'",
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
      expect(result).toAgreementResultBeEqual(0, "€");
    });

    test("Ingénieurs et cadres", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1486'",
        "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . catégorie professionnelle":
          "'Ingénieurs et cadres'",
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
      expect(result).toAgreementResultBeEqual(0, "€");
    });

    test("Chargés d'enquête intermittents", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1486'",
        "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . catégorie professionnelle":
          "'Chargés d'enquête intermittents'",
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
      expect(result).toAgreementResultBeEqual(0, "€");
    });
  });
});
