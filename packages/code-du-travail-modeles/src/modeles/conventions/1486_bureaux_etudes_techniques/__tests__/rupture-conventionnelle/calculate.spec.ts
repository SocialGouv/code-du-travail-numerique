import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "1486"
);

describe("Gestion des licenciements pour la CC 1486", () => {
  describe("Missing variables", () => {
    test("Sans arguments", () => {
      const input = {
        "contrat salarié . convention collective": "'IDCC1486'",
      };

      const result = engine.calculate(input);
      expect(result).toNextMissingRuleBeEqual(
        "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . catégorie professionnelle"
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

  describe("Calcul de l'indemnité de licenciement", () => {
    test.each([
      {
        catPro: "ETAM",
        dateEntree: "01/01/2000",
        dateSortie: "01/09/2000",
        result: 450,
      },
      {
        catPro: "ETAM",
        dateEntree: "01/01/2000",
        dateSortie: "01/01/2006",
        result: 4050,
      },
      {
        catPro: "ETAM",
        dateEntree: "01/01/2000",
        dateSortie: "01/01/2011",
        result: 7425,
      },
      {
        catPro: "ETAM",
        dateEntree: "01/01/2000",
        dateSortie: "01/01/2025",
        result: 22500,
      },
      {
        catPro: "Ingénieurs et cadres",
        dateEntree: "01/01/2000",
        dateSortie: "01/09/2000",
        result: 450,
      },
      {
        catPro: "Ingénieurs et cadres",
        dateEntree: "01/01/2000",
        dateSortie: "01/01/2001",
        result: 675,
      },
      {
        catPro: "Ingénieurs et cadres",
        dateEntree: "01/01/2000",
        dateSortie: "01/01/2006",
        result: 4050,
      },
      {
        catPro: "Chargés d'enquête intermittents",
        dateEntree: "01/01/2000",
        dateSortie: "01/09/2000",
        result: 450,
      },
      {
        catPro: "Chargés d'enquête intermittents",
        dateEntree: "01/01/2000",
        dateSortie: "01/01/2002",
        result: 1350,
      },
      {
        catPro: "Chargés d'enquête intermittents",
        dateEntree: "01/01/2000",
        dateSortie: "01/01/2005",
        result: 3375,
      },
    ])(
      "Le licenciement fait suite au refus d'une clause de mobilité",
      (value) => {
        const result = engine.calculate({
          "contrat salarié . convention collective": "'IDCC1486'",
          "contrat salarié . convention collective . bureaux études techniques . indemnité de licenciement . catégorie professionnelle": `'${value.catPro}'`,
          "contrat salarié . indemnité de licenciement . date d'entrée":
            value.dateEntree,
          "contrat salarié . indemnité de licenciement . date de notification":
            value.dateSortie,
          "contrat salarié . indemnité de licenciement . date de sortie":
            value.dateSortie,
          "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
            "non",
          licenciementFauteGrave: "non",
          salaryPeriods:
            '[{"month":"décembre 2024","value":2700},{"month":"novembre 2024","value":2700},{"month":"octobre 2024","value":2700},{"month":"septembre 2024","value":2700},{"month":"août 2024","value":2700},{"month":"juillet 2024","value":2700},{"month":"juin 2024","value":2700},{"month":"mai 2024","value":2700},{"month":"avril 2024","value":2700},{"month":"mars 2024","value":2700},{"month":"février 2024","value":2700},{"month":"janvier 2024","value":2700}]',
          typeContratTravail: "cdi",
        });
        expect(result).toAgreementResultBeEqual(value.result, "€");
      }
    );
  });

  describe("Vérifier qu'il n'y a pas d'ancienneté conventionnelle requise", () => {
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
      expect(result).toAgreementResultBeEqual(125, "€");
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
      expect(result).toAgreementResultBeEqual(125, "€");
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
      expect(result).toAgreementResultBeEqual(100, "€");
    });
  });
});
