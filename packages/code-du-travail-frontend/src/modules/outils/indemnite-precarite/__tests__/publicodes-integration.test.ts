import { loadPublicodes } from "../../common/publicodes";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import { mapToPublicodesSituationForCalculationIndemnitePrecarite } from "../../common/publicodes/indemnite-precarite";

describe("Indemnité de précarité - Intégration Publicodes", () => {
  it("devrait pouvoir charger le publicodes pour l'indemnité de précarité", () => {
    const publicodes = loadPublicodes<PublicodesSimulator.INDEMNITE_PRECARITE>(
      PublicodesSimulator.INDEMNITE_PRECARITE
    );

    expect(publicodes).toBeDefined();
    expect(typeof publicodes.calculate).toBe("function");
  });

  it("devrait pouvoir charger le publicodes avec une convention collective", () => {
    const publicodes = loadPublicodes<PublicodesSimulator.INDEMNITE_PRECARITE>(
      PublicodesSimulator.INDEMNITE_PRECARITE,
      "1486" // IDCC exemple
    );

    expect(publicodes).toBeDefined();
    expect(typeof publicodes.calculate).toBe("function");
  });

  it("devrait pouvoir mapper une situation pour le calcul", () => {
    const situation = mapToPublicodesSituationForCalculationIndemnitePrecarite(
      1486,
      {
        "contrat salarié . rémunération . brut de base": "2000",
        "contrat salarié . CDD . motif": "remplacement",
      }
    );

    expect(situation).toBeDefined();
    expect(situation["contrat salarié . convention collective"]).toBe(
      "'IDCC1486'"
    );
    expect(situation["contrat salarié . rémunération . brut de base"]).toBe(
      "2000"
    );
    expect(situation["contrat salarié . CDD . motif"]).toBe("remplacement");
  });

  it("devrait pouvoir effectuer un calcul simple", () => {
    const publicodes = loadPublicodes<PublicodesSimulator.INDEMNITE_PRECARITE>(
      PublicodesSimulator.INDEMNITE_PRECARITE
    );

    const situation = mapToPublicodesSituationForCalculationIndemnitePrecarite(
      undefined, // Pas de convention collective
      {
        "contrat salarié . rémunération . brut de base": "2000",
      }
    );

    // Le calcul peut échouer selon les règles publicodes, mais il ne doit pas planter
    expect(() => {
      const result = publicodes.calculate(situation);
      expect(result).toBeDefined();
      expect(result.type).toBeDefined();
    }).not.toThrow();
  });
});
