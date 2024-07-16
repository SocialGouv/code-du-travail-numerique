import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1517"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test("Vérifier que l'ancienneté peut être remplacée par les dates en input", () => {
    const result = engine.calculate({
      "contrat salarié . convention collective": "'IDCC1517'",
      "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
      "contrat salarié . indemnité de licenciement . date d'entrée":
        "01/01/2024",
      "contrat salarié . indemnité de licenciement . date de notification":
        "01/06/2024",
      "contrat salarié . indemnité de licenciement . date de sortie":
        "01/09/2024",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      licenciementFauteGrave: "non",
      salaryPeriods:
        '[{"month":"mai 2024","value":3000},{"month":"avril 2024","value":3000},{"month":"mars 2024","value":3000},{"month":"février 2024","value":3000},{"month":"janvier 2024","value":3000}]',
      typeContratTravail: "cdi",
    });
    expect(result).toAgreementResultBeEqual(500, "€");
    expect(result).toLegalResultBeEqual(0, "€");
  });
});
