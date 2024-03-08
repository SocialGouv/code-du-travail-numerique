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
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . agents . licenciement économique . age":
          "45",
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
      const { result, missingArgs } = engine.calculate(
        {
          "contrat salarié . convention collective": "'IDCC0573'",
          "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${CatPro573.agents}'`,
          "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . agents . licenciement économique . age":
            "56",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            "25",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            "2",
          "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
            "non",
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "2700",
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
      expect(result.value).toEqual(16200);
      expect(missingArgs).toEqual([]);
      expect(result.unit?.numerators).toEqual(["€"]);
    });

    test("Le moins favorable - cas autres licenciements", () => {
      const { result, missingArgs } = engine.calculate(
        {
          "contrat salarié . convention collective": "'IDCC0573'",
          "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${CatPro573.agents}'`,
          "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . agents . licenciement économique . age":
            "55",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            "15",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            "1",
          "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
            "non",
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "2700",
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
      expect(result.value).toEqual(9900);
      expect(missingArgs).toEqual([]);
      expect(result.unit?.numerators).toEqual(["€"]);
    });
  });
});
