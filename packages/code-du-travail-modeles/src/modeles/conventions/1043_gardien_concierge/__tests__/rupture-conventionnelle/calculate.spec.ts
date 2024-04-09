import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "1043"
);

describe("Calcul de l'indemnité de rupture conventionnelle pour la CC 1043", () => {
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
      const { result, missingArgs, detail } = engine.calculateResult({
        "contrat salarié . convention collective": "'IDCC1043'",
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
      expect(missingArgs).toEqual([]);
      expect(detail.agreementResult?.value).toEqual(
        expectedCompensationAgreement
      );
      expect(detail.legalResult.value).toEqual(expectedCompensationLegal);
      expect(result.value).toEqual(expectedCompensationLegal);
      expect(result.unit?.numerators).toEqual(["€"]);
    }
  );
});
