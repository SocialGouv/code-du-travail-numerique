import { RuptureConventionnellePublicodes } from "../../../../../publicodes";
import { CategoryPro44 } from "../../salary";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "44"
);

describe("Gestion des licenciements pour la CC 44", () => {
  describe("Missing variables", () => {
    test("Sans arguments", () => {
      const input = {
        "contrat salarié . convention collective": "'IDCC0044'",
      };

      const result = engine.calculate(input);
      expect(result).toNextMissingRuleBeEqual(
        "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle"
      );
    });
    test.each([
      CategoryPro44.ouvrier,
      CategoryPro44.techniciens,
      CategoryPro44.inge,
    ])("En étant %s", (catPro) => {
      const input = {
        "contrat salarié . convention collective": "'IDCC0044'",
        "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle": `'${catPro}'`,
      };

      const result = engine.calculate(input);
      expect(result).toNextMissingRuleBeEqual(null);
    });
  });

  describe("Calcul de l'indemnité de licenciement", () => {
    test("Le moins favorable - cas licenciement économique", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC0044'",
        "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle": `'${CategoryPro44.inge}'`,
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
      expect(result).toAgreementResultBeEqual(0, "€");
    });
  });
});
