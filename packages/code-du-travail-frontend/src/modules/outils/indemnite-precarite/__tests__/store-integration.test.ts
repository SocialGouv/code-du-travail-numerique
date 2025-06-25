import { loadPublicodes } from "../../common/publicodes";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import { mapToPublicodesSituationForCalculationIndemnitePrecarite } from "../../common/publicodes/indemnite-precarite";

describe("Indemnité de précarité - Intégration Store", () => {
  it("devrait pouvoir charger publicodes sans erreur", () => {
    const publicodes = loadPublicodes<PublicodesSimulator.INDEMNITE_PRECARITE>(
      PublicodesSimulator.INDEMNITE_PRECARITE
    );

    expect(publicodes).toBeDefined();
    expect(typeof publicodes.calculate).toBe("function");
  });

  it("devrait pouvoir charger publicodes avec une convention collective", () => {
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
        "contrat salarié . salaire de référence": "2000",
        "contrat salarié . contractType": "'CDD'",
      }
    );

    expect(situation).toBeDefined();
    expect(situation["contrat salarié . convention collective"]).toBe(
      "'IDCC1486'"
    );
    expect(situation["contrat salarié . salaire de référence"]).toBe("2000");
    expect(situation["contrat salarié . contractType"]).toBe("'CDD'");
  });

  it("devrait pouvoir effectuer un calcul simple", () => {
    const publicodes = loadPublicodes<PublicodesSimulator.INDEMNITE_PRECARITE>(
      PublicodesSimulator.INDEMNITE_PRECARITE
    );

    const situation = mapToPublicodesSituationForCalculationIndemnitePrecarite(
      undefined, // Pas de convention collective
      {
        "contrat salarié . salaire de référence": "2000",
        "contrat salarié . contractType": "'CDD'",
        "contrat salarié . type de cdd": "'Autres'",
        "contrat salarié . finContratPeriodeDessai": "non",
        "contrat salarié . propositionCDIFindeContrat": "non",
        "contrat salarié . refusCDIFindeContrat": "non",
        "contrat salarié . interruptionFauteGrave": "non",
        "contrat salarié . refusRenouvellementAuto": "non",
        "contrat salarié . cttFormation": "non",
        "contrat salarié . ruptureContratFauteGrave": "non",
        "contrat salarié . propositionCDIFinContrat": "non",
        "contrat salarié . refusSouplesse": "non",
      }
    );

    // Le calcul peut échouer selon les règles publicodes, mais il ne doit pas planter
    expect(() => {
      const result = publicodes.calculate(situation);
      expect(result).toBeDefined();
      expect(result.type).toBeDefined();
    }).not.toThrow();
  });

  it("devrait gérer les erreurs de calcul gracieusement", () => {
    const publicodes = loadPublicodes<PublicodesSimulator.INDEMNITE_PRECARITE>(
      PublicodesSimulator.INDEMNITE_PRECARITE
    );

    const situation = mapToPublicodesSituationForCalculationIndemnitePrecarite(
      undefined,
      {
        invalid_field: "invalid_value",
      }
    );

    // Le calcul ne devrait pas planter même avec des données invalides
    expect(() => {
      const result = publicodes.calculate(situation);
      expect(result).toBeDefined();
    }).not.toThrow();
  });
});
