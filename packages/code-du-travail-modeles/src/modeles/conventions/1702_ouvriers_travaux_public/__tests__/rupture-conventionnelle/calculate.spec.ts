import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "1702"
);

describe("Un seul type de licenciement pour la CC 1702", () => {
  test("Missing variables", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC1702'",
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
      "contrat salarié . convention collective . ouvriers travaux public . indemnité de licenciement . age"
    );
  });

  test("Le legal est toujours plus favorable", () => {
    const { missingArgs, detail } = engine.calculateResult({
      "contrat salarié . convention collective": "'IDCC1702'",
      "contrat salarié . convention collective . ouvriers travaux public . indemnité de licenciement . age":
        "65",
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
        "3000",
      licenciementFauteGrave: "non",
      typeContratTravail: "cdi",
    });
    expect(missingArgs).toEqual([]);
    expect(detail.chosenResult).toEqual("LEGAL");
    expect(detail.legalResult.value).toEqual(15000);
    expect(detail.agreementResult?.value).toEqual(14025);
    expect(detail.agreementResult?.unit?.numerators).toEqual(["€"]);
  });
});
