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

      const result = engine.calculate(
        input,
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
      const missingArgs = result.missingArgs.filter(
        (item) => item.rawNode.cdtn
      );
      expect(missingArgs).toHaveLength(1);
      expect(missingArgs[0].name).toBe(
        "contrat salarié - convention collective - commerces de gros - catégorie professionnelle - agents - licenciement économique - age"
      );
    });

    test("No missing variables", () => {
      const input = {
        "contrat salarié . convention collective": "'IDCC0573'",
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${CatPro573.agents}'`,
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . agents . licenciement économique . age":
          "45",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
      };

      const result = engine.calculate(
        input,
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
      const missingArgs = result.missingArgs.filter(
        (item) => item.rawNode.cdtn
      );
      expect(missingArgs).toHaveLength(0);
    });

    test("Le moins favorable - cas licenciement économique", () => {
      const { missingArgs, detail } = engine.calculateResult({
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle":
          "'Agents de maîtrise, techniciens et assimilés'",
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . agents . licenciement économique . age":
          "56",
        salaryPeriods:
          '[{"month":"décembre 2024","value":2700},{"month":"novembre 2024","value":2700},{"month":"octobre 2024","value":2700},{"month":"septembre 2024","value":2700},{"month":"août 2024","value":2700},{"month":"juillet 2024","value":2700},{"month":"juin 2024","value":2700},{"month":"mai 2024","value":2700},{"month":"avril 2024","value":2700},{"month":"mars 2024","value":2700},{"month":"février 2024","value":2700},{"month":"janvier 2024","value":2700}]',
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/01/2025",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2000",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/01/2025",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . convention collective": "'IDCC0573'",
        licenciementFauteGrave: "non",
        typeContratTravail: "cdi",
      });
      expect(detail.agreementResult?.value).toEqual(16200);
      expect(missingArgs).toEqual([]);
      expect(detail.agreementResult?.unit?.numerators).toEqual(["€"]);
    });

    test("Le moins favorable - cas autres licenciements", () => {
      const { missingArgs, detail } = engine.calculateResult({
        "contrat salarié . convention collective": "'IDCC0573'",
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${CatPro573.agents}'`,
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . agents . licenciement économique . age":
          "55",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/01/2015",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2000",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/01/2015",
        salaryPeriods:
          '[{"month":"décembre 2024","value":2700},{"month":"novembre 2024","value":2700},{"month":"octobre 2024","value":2700},{"month":"septembre 2024","value":2700},{"month":"août 2024","value":2700},{"month":"juillet 2024","value":2700},{"month":"juin 2024","value":2700},{"month":"mai 2024","value":2700},{"month":"avril 2024","value":2700},{"month":"mars 2024","value":2700},{"month":"février 2024","value":2700},{"month":"janvier 2024","value":2700}]',
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        licenciementFauteGrave: "non",
        typeContratTravail: "cdi",
      });
      expect(detail.agreementResult?.value).toEqual(9900);
      expect(missingArgs).toEqual([]);
      expect(detail.agreementResult?.unit?.numerators).toEqual(["€"]);
    });
  });
});
