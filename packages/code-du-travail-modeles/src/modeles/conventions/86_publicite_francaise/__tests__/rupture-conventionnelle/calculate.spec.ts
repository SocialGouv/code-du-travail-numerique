import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "86"
);

describe("Vérifier qu'il n'y a pas d'ancienneté conventionnelle requise", () => {
  test("Cas de base", () => {
    const result = engine.calculate({
      "contrat salarié . convention collective": "'IDCC0086'",
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
    expect(result).toAgreementResultBeEqual(165, "€");
  });
});
