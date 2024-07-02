import { RuptureConventionnellePublicodes } from "../../../../../publicodes";
import { CatPro573 } from "../../salary";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "573"
);

describe("Gestion des multiples types de licenciement pour la CC 573", () => {
  describe("Catégorie pro : Agents", () => {
    test("Missing variables", () => {
      const input = {
        "contrat salarié . convention collective": "'IDCC0573'",
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${CatPro573.agents}'`,
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
      };

      const result = engine.calculate(input);
      expect(result).toNextMissingRuleBeEqual(
        "contrat salarié . convention collective . commerces de gros . rupture conventionnelle . licenciement économique agents age"
      );
    });

    test("No missing variables", () => {
      const input = {
        "contrat salarié . convention collective": "'IDCC0573'",
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${CatPro573.agents}'`,
        "contrat salarié . convention collective . commerces de gros . rupture conventionnelle . licenciement économique agents age":
          "45",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
      };

      const result = engine.calculate(input);
      expect(result).toNextMissingRuleBeEqual(null);
    });

    test("Le moins favorable - cas licenciement économique", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC0573'",
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle":
          "'Agents de maîtrise, techniciens et assimilés'",
        "contrat salarié . convention collective . commerces de gros . rupture conventionnelle . licenciement économique agents age":
          "56",
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2000",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/01/2025",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/01/2025",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        licenciementFauteGrave: "non",
        salaryPeriods:
          '[{"month":"décembre 2024","value":2700},{"month":"novembre 2024","value":2700},{"month":"octobre 2024","value":2700},{"month":"septembre 2024","value":2700},{"month":"août 2024","value":2700},{"month":"juillet 2024","value":2700},{"month":"juin 2024","value":2700},{"month":"mai 2024","value":2700},{"month":"avril 2024","value":2700},{"month":"mars 2024","value":2700},{"month":"février 2024","value":2700},{"month":"janvier 2024","value":2700}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(16200, "€");
    });

    test("Le moins favorable - cas autres licenciements", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC0573'",
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${CatPro573.agents}'`,
        "contrat salarié . convention collective . commerces de gros . rupture conventionnelle . licenciement économique agents age":
          "55",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2000",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/01/2015",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/01/2015",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        licenciementFauteGrave: "non",
        salaryPeriods:
          '[{"month":"décembre 2024","value":2700},{"month":"novembre 2024","value":2700},{"month":"octobre 2024","value":2700},{"month":"septembre 2024","value":2700},{"month":"août 2024","value":2700},{"month":"juillet 2024","value":2700},{"month":"juin 2024","value":2700},{"month":"mai 2024","value":2700},{"month":"avril 2024","value":2700},{"month":"mars 2024","value":2700},{"month":"février 2024","value":2700},{"month":"janvier 2024","value":2700}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(9900, "€");
    });
  });

  describe("Vérifier qu'il n'y a pas d'ancienneté conventionnelle requise", () => {
    test("Cadres", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC0573'",
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . cadres . cadre durant au moins de 15 ans question":
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
        licenciementFauteGrave: "non",
        salaryPeriods:
          '[{"month":"février 2024","value":3000},{"month":"janvier 2024","value":3000}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(100, "€");
    });

    test("Agents de maitrise", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC0573'",
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle":
          "'Agents de maîtrise, techniciens et assimilés'",
        "contrat salarié . convention collective . commerces de gros . rupture conventionnelle . licenciement économique agents age":
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
        licenciementFauteGrave: "non",
        salaryPeriods:
          '[{"month":"février 2024","value":3000},{"month":"janvier 2024","value":3000}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(100, "€");
    });

    test("Autres", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC0573'",
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle":
          "'Autres salariés'",
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
        salaryPeriods:
          '[{"month":"février 2024","value":3000},{"month":"janvier 2024","value":3000}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(100, "€");
    });
  });
});
