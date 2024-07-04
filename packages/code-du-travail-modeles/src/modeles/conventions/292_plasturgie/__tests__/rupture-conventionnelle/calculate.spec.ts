import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "292"
);

describe("Vérifier qu'il n'y a pas d'ancienneté conventionnelle requise", () => {
  test("Cadres", () => {
    const result = engine.calculate({
      "contrat salarié . convention collective": "'IDCC0292'",
      "contrat salarié . convention collective . plasturgie . indemnité de licenciement . catégorie professionnelle":
        "'Cadres (Coefficient 900 et plus)'",
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
    expect(result).toAgreementResultBeEqual(125, "€");
  });

  test("non Cadres", () => {
    const result = engine.calculate({
      "contrat salarié . convention collective": "'IDCC0292'",
      "contrat salarié . convention collective . plasturgie . indemnité de licenciement . catégorie professionnelle":
        "'Non cadres (Coefficient 700 à 830)'",
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
    expect(result).toAgreementResultBeEqual(125, "€");
  });
});
