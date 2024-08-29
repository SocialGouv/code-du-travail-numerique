import PreavisLicenciementPublicodes from "../../../../publicodes/PreavisLicenciement/PreavisLicenciementPublicodes";

const engine = new PreavisLicenciementPublicodes(modelsPreavisLicenciement);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([
    {
      ancienneté: "'Moins de 6 mois'",
      expectedResult: 0,
    },
    {
      ancienneté: "'6 mois à moins de 2 ans'",
      expectedResult: 1,
    },
    {
      ancienneté: "'Plus de 2 ans'",
      expectedResult: 2,
    },
  ])(
    "Vérifier que pour le légal, l'ancienneté $ancienneté donne $expectedResult mois préavis",
    ({ ancienneté, expectedResult }) => {
      const result = engine.calculate({
        "contrat salarié . convention collective . ancienneté légal":
          ancienneté,
      });
      expect(result).toResultBeEqual(expectedResult, "mois");
    }
  );
});
