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

    const result = engine.calculate(
      input,
      "contrat salarié . indemnité de licenciement . résultat conventionnel"
    );
    const missingArgs = result.missingArgs.filter((item) => item.rawNode.cdtn);
    expect(missingArgs.length).toEqual(1);
    expect(result.missingArgs).toHaveNextMissingRule(
      "contrat salarié . convention collective . banque . catégorie professionnelle"
    );
  });

  test.each`
    entryDate       | categoriePro    | seniority | salary  | expectedAgreement | expectedLegal
    ${"01/01/1999"} | ${"Non-cadres"} | ${15}     | ${2000} | ${11889.66}       | ${15666.67}
    ${"01/01/1999"} | ${"Non-cadres"} | ${12.5}   | ${1991} | ${11836.15}       | ${15596.17}
    ${"01/01/1999"} | ${"Cadres"}     | ${12.5}   | ${3064} | ${18214.95}       | ${24001.33}
    ${"01/01/2000"} | ${"Non-cadres"} | ${12.5}   | ${1991} | ${10943.63}       | ${14932.5}
    ${"01/01/1999"} | ${"Non-cadres"} | ${20}     | ${2772} | ${16479.06}       | ${21714}
    ${"01/01/2000"} | ${"Cadres"}     | ${24}     | ${2772} | ${15236.44}       | ${20790}
  `(
    "$#) Le légal est toujours plus favorable avec: catégorie pro $categoriePro, entryDate $entryDate,  salaire: $salary => $expectedAgreement",
    ({
      categoriePro,

      salary,
      expectedAgreement,
      expectedLegal,
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
      expect(detail.chosenResult).toEqual("LEGAL");
      expect(detail.legalResult.value).toEqual(expectedLegal);
      expect(detail.agreementResult?.value).toEqual(expectedAgreement);
      expect(detail.agreementResult?.unit?.numerators).toEqual(["€"]);
    }
  );
});
