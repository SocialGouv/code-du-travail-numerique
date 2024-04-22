import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "1501"
);

describe("Gestion des licenciements pour la CC 1501", () => {
  describe("Missing variables", () => {
    test("Sans arguments", () => {
      const input = {
        "contrat salarié . convention collective": "'IDCC1501'",
      };

      const result = engine.calculate(input);
      expect(result).toNextMissingRuleBeEqual(
        "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . catégorie professionnelle"
      );
    });

    test.each(["Cadres", "Non-cadres"])("En étant %s", (catPro) => {
      const input = {
        "contrat salarié . convention collective": "'IDCC1501'",
        "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . catégorie professionnelle": `'${catPro}'`,
      };

      const result = engine.calculate(input);
      expect(result).toNextMissingRuleBeEqual(
        "contrat salarié . convention collective . restauration rapide . rupture conventionnelle . age"
      );
    });

    test.each(["Cadres", "Non-cadres"])(
      "En ayant tout complété + %s",
      (catPro) => {
        const input = {
          "contrat salarié . convention collective": "'IDCC1501'",
          "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . catégorie professionnelle": `'${catPro}'`,
          "contrat salarié . convention collective . restauration rapide . rupture conventionnelle . age": `50`,
        };

        const result = engine.calculate(input);
        expect(result).toNextMissingRuleBeEqual(null);
      }
    );
  });

  describe("Calcul de l'indemnité de licenciement", () => {
    test.each([
      {
        age: 49,
        catPro: "Cadres",
        dateEntree: "01/01/2000",
        dateSortie: "01/01/2001",
        result: 270,
      },
      {
        age: 49,
        catPro: "Cadres",
        dateEntree: "01/01/2000",
        dateSortie: "01/01/2010",
        result: 8100,
      },
      {
        age: 50,
        catPro: "Cadres",
        dateEntree: "01/01/2000",
        dateSortie: "01/01/2015",
        result: 10800,
      },
      {
        age: 49,
        catPro: "Non-cadres",
        dateEntree: "01/01/2000",
        dateSortie: "01/01/2003",
        result: 810,
      },
      {
        age: 52,
        catPro: "Non-cadres",
        dateEntree: "01/01/2000",
        dateSortie: "01/01/2011",
        result: 3150,
      },
      {
        age: 49,
        catPro: "Non-cadres",
        dateEntree: "01/01/2000",
        dateSortie: "01/01/2020",
        result: 9000,
      },
      {
        age: 52,
        catPro: "Non-cadres",
        dateEntree: "01/01/2000",
        dateSortie: "01/01/2020",
        result: 9000,
      },
    ])("Le moins favorable - cas licenciement économique", (value) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1501'",
        "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . catégorie professionnelle": `'${value.catPro}'`,
        "contrat salarié . convention collective . restauration rapide . rupture conventionnelle . age": `${value.age}`,
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

      expect(result).toAgreementResultBeEqual(value.result, "€");
    });

    test.each([
      {
        age: 49,
        catPro: "Non-cadres",
        dateEntree: "01/01/2000",
        dateSortie: "01/01/2001",
      },
    ])("Le moins favorable - cas licenciement économique", (value) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1501'",
        "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . catégorie professionnelle": `'${value.catPro}'`,
        "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . licenciement économique . age": `${value.age}`,
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
      expect(result).toAgreementResultBeEqual(null, null);
    });
  });
});
