import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "2148"
);

describe("Gestion des licenciements pour la CC 2148", () => {
  test("Vérifier qu'il n'y a pas d'ancienneté conventionnelle requise", () => {
    const result = engine.calculate({
      "contrat salarié . convention collective": "'IDCC2148'",
      "contrat salarié . convention collective . télécommunications . rupture conventionnelle . cadre age":
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
      hasCommission: "non",
      licenciementFauteGrave: "non",
      noticeSalaryPeriods: "[]",
      salariesVariablePart: "1000",
      salaryPeriods:
        '[{"month":"février 2024","value":3000},{"month":"janvier 2024","value":3000}]',
      typeContratTravail: "cdi",
    });
    expect(result).toAgreementResultBeEqual(30, "€");
  });
});
