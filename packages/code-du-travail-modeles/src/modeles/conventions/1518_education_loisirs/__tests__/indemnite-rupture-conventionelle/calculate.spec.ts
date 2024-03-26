import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "1518"
);

describe("Calcul de l'indemnité de rupture conventionnelle pour la CC 1518", () => {
  test.each`
    endDate         | expectedCompensation
    ${"01/01/2025"} | ${0}
  `("avec une date de fin $endDate", ({ endDate, expectedCompensation }) => {
    const { result, missingArgs } = engine.calculate(
      {
        "contrat salarié . convention collective": "'IDCC1518'",
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2000",
        "contrat salarié . indemnité de licenciement . date de notification":
          endDate,
        "contrat salarié . indemnité de licenciement . date de sortie": endDate,
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        "contrat salarié . indemnité de licenciement . salaire de référence":
          "2500",
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "2500",
        licenciementFauteGrave: "non",
        typeContratTravail: "cdi",
      },
      "contrat salarié . indemnité de licenciement . résultat conventionnel"
    );
    expect(missingArgs).toEqual([]);
    expect(result.value).toEqual(expectedCompensation);
    expect(result.unit?.numerators).toEqual(["€"]);
  });
});
