import { RuptureConventionnellePublicodes } from "../../../../publicodes";

describe("calculate", () => {
  test("si pas d'idcc", () => {
    const engine = new RuptureConventionnellePublicodes(
      modelsRuptureConventionnel
    );
    const result = engine.calculate({
      absencePeriods: "[]",
      "contrat salarié . indemnité de licenciement . date d'entrée":
        "01/01/2022",
      "contrat salarié . indemnité de licenciement . date de notification":
        "01/01/2024",
      "contrat salarié . indemnité de licenciement . date de sortie":
        "01/01/2024",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      "contrat salarié . indemnité de licenciement . salaire de référence":
        "2000",
      licenciementFauteGrave: "non",
      typeContratTravail: "cdi",
    });
    expect(result).toChosenResultBeEqual("LEGAL");
    expect(result).toLegalResultBeEqual(1000, "€");
    expect(result).toResultBeEqual(1000, "€");
    expect(result).toFormulaBeEqual("1/4 * Sref * A", [
      "A : Ancienneté totale (2 ans)",
      "Sref : Salaire de référence (2000 €)",
    ]);
  });

  test("avec une idcc quand le legal est meilleur", () => {
    const engine = new RuptureConventionnellePublicodes(
      modelsRuptureConventionnel,
      "1606"
    );

    const result = engine.calculate({
      absencePeriods: "[]",
      "contrat salarié . convention collective": "'IDCC1606'",
      "contrat salarié . convention collective . bricolage . catégorie professionnelle": `'Non-Cadres'`,
      "contrat salarié . indemnité de licenciement . date d'entrée":
        "01/01/2022",
      "contrat salarié . indemnité de licenciement . date de notification":
        "01/01/2024",
      "contrat salarié . indemnité de licenciement . date de sortie":
        "01/01/2024",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      "contrat salarié . indemnité de licenciement . salaire de référence":
        "2000",
      "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
        "2000",
      licenciementFauteGrave: "non",
      typeContratTravail: "cdi",
    });
    expect(result).toChosenResultBeEqual("LEGAL");
    expect(result).toLegalResultBeEqual(1000, "€");
    expect(result).toResultBeEqual(1000, "€");
    expect(result).toAgreementResultBeEqual(80, "€");
    expect(result).toFormulaBeEqual("1/4 * Sref * A", [
      "A : Ancienneté totale (2 ans)",
      "Sref : Salaire de référence (2000 €)",
    ]);
  });

  test("avec une idcc quand le legal et le conventionnelle sont identiques", () => {
    const engine = new RuptureConventionnellePublicodes(
      modelsRuptureConventionnel,
      "1527"
    );

    const result = engine.calculate({
      absencePeriods: "[]",
      "contrat salarié . convention collective": "'IDCC1527'",
      "contrat salarié . indemnité de licenciement . date d'entrée":
        "01/01/2012",
      "contrat salarié . indemnité de licenciement . date de notification":
        "01/01/2024",
      "contrat salarié . indemnité de licenciement . date de sortie":
        "01/01/2024",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      "contrat salarié . indemnité de licenciement . salaire de référence":
        "2000",
      "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
        "2000",
      licenciementFauteGrave: "non",
      typeContratTravail: "cdi",
    });
    expect(result).toChosenResultBeEqual("SAME");
    expect(result).toLegalResultBeEqual(6333.33, "€");
    expect(result).toResultBeEqual(6333.33, "€");
    expect(result).toAgreementResultBeEqual(6333.33, "€");
    expect(result).toFormulaBeEqual("(1/4 * Sref * A1) + (1/3 * Sref * A2)", [
      "A1 : Ancienneté de 10 ans ou moins (10 ans)",
      "A2 : Ancienneté au-delà de 10 ans (2 ans)",
      "Sref : Salaire de référence (2000 €)",
    ]);
  });
  test("avec une idcc quand le conventionnelle est meilleur", () => {
    const engine = new RuptureConventionnellePublicodes(
      modelsRuptureConventionnel,
      "1672"
    );

    const result = engine.calculate({
      absencePeriods: "[]",
      "contrat salarié . convention collective": "'IDCC1672'",
      "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
        "'Cadres (Classes 5 à 7)'",
      "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . avant non cadres":
        "'Non'",

      "contrat salarié . convention collective . sociétés d'assurances . rupture conventionnelle . age":
        "65",
      "contrat salarié . indemnité de licenciement . date d'entrée":
        "01/01/2012",
      "contrat salarié . indemnité de licenciement . date de notification":
        "01/01/2024",
      "contrat salarié . indemnité de licenciement . date de sortie":
        "01/01/2024",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      "contrat salarié . indemnité de licenciement . salaire de référence":
        "2000",
      "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
        "24000",
      licenciementFauteGrave: "non",
      typeContratTravail: "cdi",
    });
    expect(result).toChosenResultBeEqual("AGREEMENT");
    expect(result).toLegalResultBeEqual(6333.33, "€");
    expect(result).toResultBeEqual(15120, "€");
    expect(result).toAgreementResultBeEqual(15120, "€");
    expect(result).toFormulaBeEqual(
      "(4.5% * Sref * A2) + (0.75% * Sref * A2)",
      [
        "A2 : Années de présence dans l'entreprise en tant que cadre (12 ans)",
        "Sref : Salaire de référence (24000 €)",
      ]
    );
  });
});
