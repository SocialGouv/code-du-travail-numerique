import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "650"
);

describe("Vérifier qu'il n'y a pas d'ancienneté conventionnelle requise", () => {
  test("Cadres", () => {
    const result = engine.calculate({
      "contrat salarié . convention collective": "'IDCC0650'",
      "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
        "'A, B, C, D ou E'",
      "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . avant cadre":
        "'Oui'",
      "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . forfait jour":
        "'Non'",
      "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . FGHI . age":
        "50",
      "contrat salarié . convention collective . métallurgie . indemnité de licenciement . licenciement pour motif absence prolongée ou répétées":
        "'Non'",
      "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . notifier avant le 1er janvier 2024":
        "'Non'",
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
