import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "2098"
);

describe("Gestion des licenciements pour la CC 2098", () => {
  describe("Missing variables", () => {
    test("Sans arguments", () => {
      const input = {
        "contrat salarié . convention collective": "'IDCC2098'",
      };

      const { missingArgs } = engine.calculate(input);
      expect(missingArgs).toHaveNextMissingRule(
        "contrat salarié . convention collective . personnel presta service tertiaire . autre licenciement . catégorie professionnelle"
      );
    });

    test("En étant Non-cadres", () => {
      const input = {
        "contrat salarié . convention collective": "'IDCC2098'",
        "contrat salarié . convention collective . personnel presta service tertiaire . autre licenciement . catégorie professionnelle": `'Non-cadres'`,
      };

      const { missingArgs } = engine.calculate(input);
      expect(missingArgs).toHaveNextMissingRule(null);
    });

    test("En étant Cadres", () => {
      const input = {
        "contrat salarié . convention collective": "'IDCC2098'",
        "contrat salarié . convention collective . personnel presta service tertiaire . autre licenciement . catégorie professionnelle": `'Cadres'`,
      };

      const { missingArgs } = engine.calculate(input);
      expect(missingArgs).toHaveNextMissingRule(
        "contrat salarié . convention collective . personnel presta service tertiaire . rupture conventionnelle . cadre age"
      );
    });

    test("En ayant tout complété en étant Cadres", () => {
      const input = {
        "contrat salarié . convention collective": "'IDCC2098'",
        "contrat salarié . convention collective . personnel presta service tertiaire . rupture conventionnelle . cadre age":
          "60",
        "contrat salarié . convention collective . personnel presta service tertiaire . autre licenciement . catégorie professionnelle": `'Cadres'`,
      };

      const { missingArgs } = engine.calculate(input);
      expect(missingArgs).toHaveNextMissingRule(null);
    });
  });

  describe("Calcul de l'indemnité de licenciement", () => {
    describe("Cadres", () => {
      test.each([
        {
          age: 45,
          catPro: "Cadres",
          dateEntree: "01/01/2000",
          dateSortie: "01/01/2001",
          result: 675,
        },
        {
          age: 45,
          catPro: "Cadres",
          dateEntree: "01/01/2000",
          dateSortie: "01/01/2023",
          result: 18450,
        },
        {
          age: 51,
          catPro: "Cadres",
          dateEntree: "01/01/2000",
          dateSortie: "01/01/2023",
          result: 18450,
        },
        {
          age: 56,
          catPro: "Cadres",
          dateEntree: "01/01/2000",
          dateSortie: "01/01/2023",
          result: 18450,
        },
      ])(
        "Licenciement pour inaptitude totale et définitive non consécutive à un accident du travail",
        (value) => {
          const { missingArgs, detail } = engine.calculate({
            "contrat salarié . convention collective": "'IDCC2098'",
            "contrat salarié . convention collective . personnel presta service tertiaire . rupture conventionnelle . cadre age": `${value.age}`,
            "contrat salarié . convention collective . personnel presta service tertiaire . autre licenciement . catégorie professionnelle": `'${value.catPro}'`,
            "contrat salarié . indemnité de licenciement . date d'entrée":
              value.dateEntree,
            "contrat salarié . indemnité de licenciement . date de notification":
              value.dateSortie,
            "contrat salarié . indemnité de licenciement . date de sortie":
              value.dateSortie,
            "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
              "non",
            licenciementFauteGrave: "non",
            salaryPeriods:
              '[{"month":"décembre 2024","value":2700},{"month":"novembre 2024","value":2700},{"month":"octobre 2024","value":2700},{"month":"septembre 2024","value":2700},{"month":"août 2024","value":2700},{"month":"juillet 2024","value":2700},{"month":"juin 2024","value":2700},{"month":"mai 2024","value":2700},{"month":"avril 2024","value":2700},{"month":"mars 2024","value":2700},{"month":"février 2024","value":2700},{"month":"janvier 2024","value":2700}]',
            typeContratTravail: "cdi",
          });
          expect(missingArgs).toEqual([]);
          expect(detail?.agreementResult?.value).toEqual(value.result);
          expect(detail?.agreementResult?.unit?.numerators).toEqual(["€"]);
        }
      );
    });

    describe("Non-cadres", () => {
      test.each([
        {
          catPro: "Non-cadres",
          dateEntree: "01/01/2000",
          dateSortie: "01/07/2000",
          result: undefined,
        },
        {
          catPro: "Non-cadres",
          dateEntree: "01/01/2000",
          dateSortie: "01/10/2000",
          result: 506.25,
        },
        {
          catPro: "Non-cadres",
          dateEntree: "01/01/2000",
          dateSortie: "01/10/2001",
          result: 1181.25,
        },
        {
          catPro: "Non-cadres",
          dateEntree: "01/01/2000",
          dateSortie: "01/10/2005",
          result: 1639.29,
        },
      ])(
        "Licenciement pour inaptitude totale et définitive non consécutive à un accident du travail",
        (value) => {
          const { missingArgs, detail } = engine.calculate({
            "contrat salarié . convention collective": "'IDCC2098'",
            "contrat salarié . convention collective . personnel presta service tertiaire . autre licenciement . catégorie professionnelle": `'${value.catPro}'`,
            "contrat salarié . indemnité de licenciement . date d'entrée":
              value.dateEntree,
            "contrat salarié . indemnité de licenciement . date de notification":
              value.dateSortie,
            "contrat salarié . indemnité de licenciement . date de sortie":
              value.dateSortie,
            "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
              "non",
            licenciementFauteGrave: "non",
            salaryPeriods:
              '[{"month":"décembre 2024","value":2700},{"month":"novembre 2024","value":2700},{"month":"octobre 2024","value":2700},{"month":"septembre 2024","value":2700},{"month":"août 2024","value":2700},{"month":"juillet 2024","value":2700},{"month":"juin 2024","value":2700},{"month":"mai 2024","value":2700},{"month":"avril 2024","value":2700},{"month":"mars 2024","value":2700},{"month":"février 2024","value":2700},{"month":"janvier 2024","value":2700}]',
            typeContratTravail: "cdi",
          });
          expect(missingArgs).toEqual([]);
          expect(detail?.agreementResult?.value).toEqual(value.result);
          expect(detail?.agreementResult?.unit?.numerators).toEqual(
            value.result ? ["€"] : undefined
          );
        }
      );
    });
  });
});
