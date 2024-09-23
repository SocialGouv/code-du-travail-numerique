import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "1996"
);

describe("Gestion des licenciements pour la CC 1996", () => {
  describe("Missing variables", () => {
    test("Sans arguments", () => {
      const input = {
        "contrat salarié . convention collective": "'IDCC1996'",
      };

      const result = engine.calculate(input);
      expect(result).toNextMissingRuleBeEqual(
        "contrat salarié . convention collective . pharmacie . indemnité de licenciement . catégorie professionnelle"
      );
    });

    test.each(["Cadres", "Non-cadres"])("En étant %s", (catPro) => {
      const input = {
        "contrat salarié . convention collective": "'IDCC1996'",
        "contrat salarié . convention collective . pharmacie . indemnité de licenciement . catégorie professionnelle": `'${catPro}'`,
      };

      const result = engine.calculate(input);
      expect(result).toNextMissingRuleBeEqual(null);
    });
  });

  describe("Calcul de l'indemnité de licenciement", () => {
    test.each([
      {
        catPro: "Cadres",
        dateEntree: "01/01/2000",
        dateSortie: "01/09/2000",
        result: 450,
      },
      {
        catPro: "Cadres",
        dateEntree: "01/01/2000",
        dateSortie: "01/01/2006",
        result: 4860,
      },
      {
        catPro: "Cadres",
        dateEntree: "01/01/2000",
        dateSortie: "01/01/2015",
        result: 12150,
      },
      {
        catPro: "Non-cadres",
        dateEntree: "01/01/2000",
        dateSortie: "01/01/2015",
        result: 11259,
      },
      {
        catPro: "Non-cadres",
        dateEntree: "01/01/2000",
        dateSortie: "01/01/2001",
        result: 675,
      },
    ])("Le moins favorable - cas licenciement économique", (value) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1996'",
        "contrat salarié . convention collective . pharmacie . indemnité de licenciement . catégorie professionnelle": `'${value.catPro}'`,
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
    });

    test.each([
      {
        catPro: "Cadres",
        dateEntree: "01/01/2000",
        dateSortie: "01/06/2000",
      },
      {
        catPro: "Non-cadres",
        dateEntree: "01/01/2000",
        dateSortie: "01/06/2000",
      },
    ])("Le moins favorable - cas licenciement économique", (value) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1996'",
        "contrat salarié . convention collective . pharmacie . indemnité de licenciement . catégorie professionnelle": `'${value.catPro}'`,
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
      expect(result).toAgreementResultBeEqual(281.25);
    });
  });

  describe("Vérifier qu'il n'y a pas d'ancienneté conventionnelle requise", () => {
    test("Cadres", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1996'",
        "contrat salarié . convention collective . pharmacie . indemnité de licenciement . catégorie professionnelle":
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
        hasCommission: "non",
        licenciementFauteGrave: "non",
        noticeSalaryPeriods: "[]",
        salaryPeriods:
          '[{"month":"février 2024","value":3000},{"month":"janvier 2024","value":3000}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(125, "€");
    });

    test("Non-cadres", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1996'",
        "contrat salarié . convention collective . pharmacie . indemnité de licenciement . catégorie professionnelle":
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
        salaryPeriods:
          '[{"month":"février 2024","value":3000},{"month":"janvier 2024","value":3000}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(125, "€");
    });
  });
});
