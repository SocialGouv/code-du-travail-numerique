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
      "contrat salarié . convention collective . commerce gros et detail alimentation . indemnité de licenciement . catégorie professionnelle":
        "'Employés et ouvriers, personnel de livraison'",
    };

    const { missingArgs } = engine.calculate(input);
    expect(missingArgs).toHaveNextMissingRule(
      "contrat salarié . convention collective . commerce gros et detail alimentation . rupture conventionnelle . licenciement économique age"
    );
  });

  test("No missing variables", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC2216'",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      "contrat salarié . convention collective . commerce gros et detail alimentation . indemnité de licenciement . catégorie professionnelle":
        "'Employés et ouvriers, personnel de livraison'",
      "contrat salarié . convention collective . commerce gros et detail alimentation . rupture conventionnelle . licenciement économique age":
        "40",
    };

    const { missingArgs } = engine.calculate(input);
    expect(missingArgs).toHaveNextMissingRule(null);
  });

  test("Employés et ouvriers, personnel de livraison - Autres licenciements plus favorable", () => {
    const { missingArgs, detail } = engine.calculate({
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
      "contrat salarié . convention collective . commerce gros et detail alimentation . rupture conventionnelle . licenciement économique age":
        "55",
      licenciementFauteGrave: "non",
      typeContratTravail: "cdi",
    });
    expect(missingArgs).toEqual([]);
    expect(detail?.agreementResult?.value).toEqual(15000);
    expect(detail?.agreementResult?.unit?.numerators).toEqual(["€"]);
  });

  test("Cadres - Autres licenciements plus favorable", () => {
    const { missingArgs, detail } = engine.calculate({
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
      "contrat salarié . convention collective . commerce gros et detail alimentation . rupture conventionnelle . licenciement économique age":
        "45",
      licenciementFauteGrave: "non",
      typeContratTravail: "cdi",
    });
    expect(missingArgs).toEqual([]);
    expect(detail?.agreementResult?.value).toEqual(19000);
    expect(detail?.agreementResult?.unit?.numerators).toEqual(["€"]);
  });
});
