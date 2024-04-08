import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "2216"
);

describe("Un seul type de licenciement pour la CC 2216", () => {
  test("Missing variables", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC2216'",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
    };

    const result = engine.calculate(
      input,
      "contrat salarié . indemnité de licenciement . résultat conventionnel"
    );
    const missingArgs = result.missingArgs.filter((item) => item.rawNode.cdtn);
    expect(missingArgs.length).toEqual(1);
    expect(result.missingArgs).toHaveNextMissingRule(
      "contrat salarié . convention collective . commerce gros et detail alimentation . indemnité de licenciement . catégorie professionnelle"
    );
  });

  test("Employés et ouvriers, personnel de livraison est identique au légal", () => {
    const { missingArgs, detail } = engine.calculateResult({
      "contrat salarié . convention collective": "'IDCC2216'",
      "contrat salarié . convention collective . commerce gros et detail alimentation . indemnité de licenciement . catégorie professionnelle":
        '"Employés et ouvriers, personnel de livraison"',
      "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
      "contrat salarié . indemnité de licenciement . date d'entrée":
        "01/01/2000",
      "contrat salarié . indemnité de licenciement . date de notification":
        "01/01/2025",
      "contrat salarié . indemnité de licenciement . date de sortie":
        "01/01/2025",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      "contrat salarié . indemnité de licenciement . salaire de référence":
        "2000",
      "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
        "2000",
      licenciementFauteGrave: "non",
      typeContratTravail: "cdi",
    });
    expect(missingArgs).toEqual([]);
    expect(detail.chosenResult).toEqual("SAME");
    expect(detail.legalResult.value).toEqual(15000);
    expect(detail.agreementResult?.value).toEqual(15000);
    expect(detail.agreementResult?.unit?.numerators).toEqual(["€"]);
  });

  test("Cadres est plus favorable que le légal", () => {
    const { missingArgs, detail } = engine.calculateResult({
      "contrat salarié . convention collective": "'IDCC2216'",
      "contrat salarié . convention collective . commerce gros et detail alimentation . indemnité de licenciement . catégorie professionnelle":
        '"Cadres"',
      "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
      "contrat salarié . indemnité de licenciement . date d'entrée":
        "01/01/2000",
      "contrat salarié . indemnité de licenciement . date de notification":
        "01/01/2025",
      "contrat salarié . indemnité de licenciement . date de sortie":
        "01/01/2025",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      "contrat salarié . indemnité de licenciement . salaire de référence":
        "2000",
      "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
        "2000",
      licenciementFauteGrave: "non",
      typeContratTravail: "cdi",
    });
    expect(missingArgs).toEqual([]);
    expect(detail.chosenResult).toEqual("AGREEMENT");
    expect(detail.legalResult.value).toEqual(15000);
    expect(detail.agreementResult?.value).toEqual(19000);
    expect(detail.agreementResult?.unit?.numerators).toEqual(["€"]);
  });
});
