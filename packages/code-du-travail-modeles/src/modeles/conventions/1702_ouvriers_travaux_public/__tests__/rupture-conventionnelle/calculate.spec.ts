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

    const { missingArgs } = engine.calculate(input);
    expect(missingArgs).toHaveNextMissingRule(
      "contrat salarié . convention collective . ouvriers travaux public . indemnité de licenciement . age"
    );
  });

  test("No missing variables", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC1702'",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      "contrat salarié . convention collective . ouvriers travaux public . indemnité de licenciement . age":
        "40",
    };

    const { missingArgs } = engine.calculate(input);
    expect(missingArgs).toHaveNextMissingRule(null);
  });

  test("Autres licenciements est moins favorable que l'économique", () => {
    const { missingArgs, detail } = engine.calculate({
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
    expect(detail?.agreementResult?.value).toEqual(14025);
    expect(detail?.agreementResult?.unit?.numerators).toEqual(["€"]);
  });
});
