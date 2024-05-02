import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "176"
);

describe("Gestion de la rupture co pour la CC 176", () => {
  describe("Missing args pro", () => {
    test("Demande l'age", () => {
      const input = {
        "contrat salarié . convention collective": "'IDCC0176'",
      };

      const result = engine.calculate(input);
      expect(result).toNextMissingRuleBeEqual(
        "contrat salarié . convention collective . industrie pharmaceutique . rupture conventionnelle . cadre age"
      );
    });

    test("Demande rien du tout", () => {
      const input = {
        "contrat salarié . convention collective": "'IDCC0176'",
        "contrat salarié . convention collective . industrie pharmaceutique . rupture conventionnelle . cadre age":
          "50",
      };

      const result = engine.calculate(input);
      expect(result).toNextMissingRuleBeEqual(null);
    });
  });

  describe("Calcul de la rupture co", () => {
    test("Si age 50 ans", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC0176'",
        "contrat salarié . convention collective . industrie pharmaceutique . rupture conventionnelle . cadre age":
          "50",
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2021",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/01/2024",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        licenciementFauteGrave: "non",
        salaryPeriods:
          '[{"month":"décembre 2024","value":2600},{"month":"novembre 2024","value":2600},{"month":"octobre 2024","value":2600},{"month":"septembre 2024","value":2600},{"month":"août 2024","value":2600},{"month":"juillet 2024","value":2600},{"month":"juin 2024","value":2600},{"month":"mai 2024","value":2600},{"month":"avril 2024","value":2600},{"month":"mars 2024","value":2600},{"month":"février 2024","value":2600},{"month":"janvier 2024","value":2600}]',
        typeContratTravail: "cdi",
      });
      console.log(result);
      expect(result).toAgreementResultBeEqual(1950, "€");
    });
  });
});
