import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "1518"
);

describe("Calcul de l'indemnité de rupture conventionnelle pour la CC 1518", () => {
  test.each`
    startDate       | endDate         | referenceSalary | referenceAgreementSalary | expectedCompensationAgreement | expectedCompensationLegal
    ${"01/01/2000"} | ${"01/01/2025"} | ${2500}         | ${2500}                  | ${0}                          | ${18750}
    ${"01/06/2024"} | ${"01/01/2025"} | ${2500}         | ${2500}                  | ${0}                          | ${364.58}
    ${"01/01/2024"} | ${"01/01/2025"} | ${2500}         | ${2500}                  | ${0}                          | ${625}
  `(
    "avec une date de début $startDate et de fin $endDate",
    ({
      endDate,
      startDate,
      referenceSalary,
      referenceAgreementSalary,
      expectedCompensationLegal,
      expectedCompensationAgreement,
    }) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1518'",
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          startDate,
        "contrat salarié . indemnité de licenciement . date de notification":
          endDate,
        "contrat salarié . indemnité de licenciement . date de sortie": endDate,
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        "contrat salarié . indemnité de licenciement . salaire de référence":
          referenceSalary,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          referenceAgreementSalary,
        licenciementFauteGrave: "non",
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(
        expectedCompensationAgreement,
        "€"
      );
      expect(result).toLegalResultBeEqual(expectedCompensationLegal, "€");
    }
  );

  describe("Vérifier qu'il y a ancienneté conventionnelle requise (HORS ANI)", () => {
    test("Cas de base", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1518'",
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
        noticeSalaryPeriods: "[]",
        salaryPeriods:
          '[{"month":"février 2024","value":3000},{"month":"janvier 2024","value":3000}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(0, "€");
    });
  });
});
