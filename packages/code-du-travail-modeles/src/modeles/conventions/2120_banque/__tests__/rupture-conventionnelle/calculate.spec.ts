import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "2120"
);

describe("Un seul type de licenciement pour la CC 2120", () => {
  test("Missing variables", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC2120'",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
    };

    const { missingArgs } = engine.calculate(
      input,
      "contrat salarié . indemnité de licenciement . résultat conventionnel"
    );
    expect(missingArgs).toHaveNextMissingRule(
      "contrat salarié . convention collective . banque . catégorie professionnelle"
    );
  });

  test("No missing variables", () => {
    const input = {
      "contrat salarié . convention collective": "'IDCC2120'",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      "contrat salarié . convention collective . banque . catégorie professionnelle":
        "'Non-cadres'",
    };

    const { missingArgs } = engine.calculate(
      input,
      "contrat salarié . indemnité de licenciement . résultat conventionnel"
    );

    expect(missingArgs).toHaveNextMissingRule(null);
  });

  test("le résultat pour le Licenciement pour motif disciplinaire doit remonter", () => {
    const { missingArgs, detail } = engine.calculateResult({
      "contrat salarié . convention collective": "'IDCC2120'",
      "contrat salarié . convention collective . banque . catégorie professionnelle": `'Non-Cadres'`,

      "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
      "contrat salarié . indemnité de licenciement . date d'entrée":
        "01/01/2025",
      "contrat salarié . indemnité de licenciement . date de notification":
        "01/11/2025",
      "contrat salarié . indemnité de licenciement . date de sortie":
        "01/11/2025",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      licenciementFauteGrave: "non",
      salaryPeriods: `[{"month":"janvier 2024","value":"2000"}]`,
      typeContratTravail: "cdi",
    });

    expect(missingArgs).toEqual([]);
    expect(detail.agreementResult?.value).toEqual(300);
    expect(detail.agreementResult?.unit?.numerators).toEqual(["€"]);
  });

  test("le résultat pour le Licenciement pour motif disciplinaire doit remonter car ancienneté entre 8 mois et 1 an", () => {
    const { missingArgs, detail } = engine.calculateResult({
      "contrat salarié . convention collective": "'IDCC2120'",
      "contrat salarié . convention collective . banque . catégorie professionnelle": `'Non-Cadres'`,

      "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
      "contrat salarié . indemnité de licenciement . date d'entrée":
        "01/01/2024",
      "contrat salarié . indemnité de licenciement . date de notification":
        "01/11/2024",
      "contrat salarié . indemnité de licenciement . date de sortie":
        "01/11/2024",
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        "non",
      licenciementFauteGrave: "non",
      salaryPeriods: `[{"month":"janvier 2024","value":"2000"}]`,
      typeContratTravail: "cdi",
    });

    expect(missingArgs).toEqual([]);
    expect(detail.agreementResult?.value).toEqual(300);
    expect(detail.agreementResult?.unit?.numerators).toEqual(["€"]);
  });

  test.each`
    entryDate       | categoriePro    | seniority | salary  | expectedAgreement
    ${"01/01/1999"} | ${"Non-cadres"} | ${15}     | ${2000} | ${11889.66}
    ${"01/01/1999"} | ${"Non-cadres"} | ${12.5}   | ${1991} | ${11836.15}
    ${"01/01/1999"} | ${"Cadres"}     | ${12.5}   | ${3064} | ${18214.95}
    ${"01/01/2000"} | ${"Non-cadres"} | ${12.5}   | ${1991} | ${10943.63}
    ${"01/01/1999"} | ${"Non-cadres"} | ${20}     | ${2772} | ${16479.06}
    ${"01/01/2000"} | ${"Cadres"}     | ${24}     | ${2772} | ${15236.44}
  `(
    "$#) Le montant calculé avec le type de Licenciement pour motif disciplinaire doit être remonté avec: catégorie pro $categoriePro, entryDate $entryDate,  salaire: $salary => $expectedAgreement",
    ({
      categoriePro,

      salary,
      expectedAgreement,
      entryDate,
    }) => {
      console.log(`[{"month":"janvier 2024","value":${salary}]`);

      const { missingArgs, detail } = engine.calculateResult({
        "contrat salarié . convention collective": "'IDCC2120'",
        "contrat salarié . convention collective . banque . catégorie professionnelle": `'${categoriePro}'`,

        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          entryDate,
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/01/2025",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/01/2025",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        licenciementFauteGrave: "non",
        salaryPeriods: `[{"month":"janvier 2024","value":${salary}}]`,
        typeContratTravail: "cdi",
      });

      expect(missingArgs).toEqual([]);
      expect(detail.agreementResult?.value).toEqual(expectedAgreement);
      expect(detail.agreementResult?.unit?.numerators).toEqual(["€"]);
    }
  );
});
