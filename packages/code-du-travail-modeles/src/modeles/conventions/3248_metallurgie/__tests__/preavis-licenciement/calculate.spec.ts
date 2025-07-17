import { PreavisLicenciementPublicodes } from "../../../../../publicodes";

const engine = new PreavisLicenciementPublicodes(
  modelsPreavisLicenciement,
  "3248"
);

describe("Test de la fonctionnalité 'calculate' - Convention métallurgie 3248", () => {
  const expectedReferences = [
    {
      article: "Article 75.2.1",
      url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314530?idConteneur=KALICONT000046993250#KALIARTI000046314530",
    },
  ];

  describe("Âge : Moins de 50 ans", () => {
    describe("Position : A, B, C ou D", () => {
      test.each([
        {
          description: "Ancienneté moins de 2 ans",
          situation: {
            "contrat salarié . convention collective . métallurgie . âge":
              "'Moins de 50 ans'",
            "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position":
              "'A, B, C ou D'",
            "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position A, B, C ou D . ancienneté":
              "'Moins de 2 ans'",
          },
          expectedResult: { expectedValue: 1, unit: "mois" },
        },
        {
          description: "Ancienneté 2 ans ou plus",
          situation: {
            "contrat salarié . convention collective . métallurgie . âge":
              "'Moins de 50 ans'",
            "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position":
              "'A, B, C ou D'",
            "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position A, B, C ou D . ancienneté":
              "'2 ans ou plus'",
          },
          expectedResult: { expectedValue: 2, unit: "mois" },
        },
      ])(
        "Position A, B, C ou D - $description",
        ({ situation, expectedResult }) => {
          const result = engine.calculate({
            "contrat salarié . convention collective": "'IDCC3248'",
            "contrat salarié . convention collective . ancienneté légal":
              "'Moins de 6 mois'",
            ...situation,
          });

          expect(result).toResultBeEqual(
            expectedResult.expectedValue,
            expectedResult.unit
          );
          expect(result).toHaveReferencesBeEqual(expectedReferences);
        }
      );
    });

    describe("Position : E", () => {
      test.each([
        {
          description: "Ancienneté moins de 2 ans",
          situation: {
            "contrat salarié . convention collective . métallurgie . âge":
              "'Moins de 50 ans'",
            "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position":
              "'E'",
            "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position E . ancienneté":
              "'Moins de 2 ans'",
          },
          expectedResult: { expectedValue: 1, unit: "mois" },
        },
        {
          description: "Ancienneté entre 2 ans et moins de 3 ans",
          situation: {
            "contrat salarié . convention collective . métallurgie . âge":
              "'Moins de 50 ans'",
            "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position":
              "'E'",
            "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position E . ancienneté":
              "'Entre 2 ans et moins de 3 ans'",
          },
          expectedResult: { expectedValue: 2, unit: "mois" },
        },
        {
          description: "Ancienneté 3 ans ou plus",
          situation: {
            "contrat salarié . convention collective . métallurgie . âge":
              "'Moins de 50 ans'",
            "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position":
              "'E'",
            "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position E . ancienneté":
              "'3 ans ou plus'",
          },
          expectedResult: { expectedValue: 3, unit: "mois" },
        },
      ])("Position E - $description", ({ situation, expectedResult }) => {
        const result = engine.calculate({
          "contrat salarié . convention collective": "'IDCC3248'",
          "contrat salarié . convention collective . ancienneté légal":
            "'Moins de 6 mois'",
          ...situation,
        });

        expect(result).toResultBeEqual(
          expectedResult.expectedValue,
          expectedResult.unit
        );
        expect(result).toHaveReferencesBeEqual(expectedReferences);
      });
    });

    describe("Position : F, G, H ou I", () => {
      test.each([
        {
          description: "Ancienneté moins de 2 ans",
          situation: {
            "contrat salarié . convention collective . métallurgie . âge":
              "'Moins de 50 ans'",
            "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position":
              "'F, G, H ou I'",
            "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position F, G, H ou I . ancienneté":
              "'Moins de 2 ans'",
          },
          expectedResult: { expectedValue: 1, unit: "mois" },
        },
        {
          description: "Ancienneté entre 2 ans et moins de 3 ans",
          situation: {
            "contrat salarié . convention collective . métallurgie . âge":
              "'Moins de 50 ans'",
            "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position":
              "'F, G, H ou I'",
            "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position F, G, H ou I . ancienneté":
              "'Entre 2 ans et moins de 3 ans'",
          },
          expectedResult: { expectedValue: 2, unit: "mois" },
        },
        {
          description: "Ancienneté entre 3 ans et moins de 5 ans",
          situation: {
            "contrat salarié . convention collective . métallurgie . âge":
              "'Moins de 50 ans'",
            "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position":
              "'F, G, H ou I'",
            "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position F, G, H ou I . ancienneté":
              "'Entre 3 ans et moins de 5 ans'",
          },
          expectedResult: { expectedValue: 3, unit: "mois" },
        },
        {
          description: "Ancienneté 5 ans ou plus",
          situation: {
            "contrat salarié . convention collective . métallurgie . âge":
              "'Moins de 50 ans'",
            "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position":
              "'F, G, H ou I'",
            "contrat salarié . convention collective . métallurgie . âge Moins de 50 ans . position F, G, H ou I . ancienneté":
              "'5 ans ou plus'",
          },
          expectedResult: { expectedValue: 3, unit: "mois" },
        },
      ])(
        "Position F, G, H ou I - $description",
        ({ situation, expectedResult }) => {
          const result = engine.calculate({
            "contrat salarié . convention collective": "'IDCC3248'",
            "contrat salarié . convention collective . ancienneté légal":
              "'Moins de 6 mois'",
            ...situation,
          });

          expect(result).toResultBeEqual(
            expectedResult.expectedValue,
            expectedResult.unit
          );
          expect(result).toHaveReferencesBeEqual(expectedReferences);
        }
      );
    });
  });

  describe("Âge : 50 ans à 55 ans", () => {
    describe("Position : A, B, C ou D", () => {
      test.each([
        {
          description: "Ancienneté moins de 2 ans",
          situation: {
            "contrat salarié . convention collective . métallurgie . âge":
              "'50 ans à 55 ans'",
            "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position":
              "'A, B, C ou D'",
            "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position A, B, C ou D . ancienneté":
              "'Moins de 2 ans'",
          },
          expectedResult: { expectedValue: 1, unit: "mois" },
        },
        {
          description: "Ancienneté 2 ans ou plus",
          situation: {
            "contrat salarié . convention collective . métallurgie . âge":
              "'50 ans à 55 ans'",
            "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position":
              "'A, B, C ou D'",
            "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position A, B, C ou D . ancienneté":
              "'2 ans ou plus'",
          },
          expectedResult: { expectedValue: 2, unit: "mois" },
        },
      ])(
        "Position A, B, C ou D - $description",
        ({ situation, expectedResult }) => {
          const result = engine.calculate({
            "contrat salarié . convention collective": "'IDCC3248'",
            "contrat salarié . convention collective . ancienneté légal":
              "'Moins de 6 mois'",
            ...situation,
          });

          expect(result).toResultBeEqual(
            expectedResult.expectedValue,
            expectedResult.unit
          );
          expect(result).toHaveReferencesBeEqual(expectedReferences);
        }
      );
    });

    describe("Position : E", () => {
      test.each([
        {
          description: "Ancienneté moins de 2 ans",
          situation: {
            "contrat salarié . convention collective . métallurgie . âge":
              "'50 ans à 55 ans'",
            "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position":
              "'E'",
            "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position E . ancienneté":
              "'Moins de 2 ans'",
          },
          expectedResult: { expectedValue: 1, unit: "mois" },
        },
        {
          description: "Ancienneté entre 2 ans et moins de 3 ans",
          situation: {
            "contrat salarié . convention collective . métallurgie . âge":
              "'50 ans à 55 ans'",
            "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position":
              "'E'",
            "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position E . ancienneté":
              "'Entre 2 ans et moins de 3 ans'",
          },
          expectedResult: { expectedValue: 2, unit: "mois" },
        },
        {
          description: "Ancienneté 3 ans ou plus",
          situation: {
            "contrat salarié . convention collective . métallurgie . âge":
              "'50 ans à 55 ans'",
            "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position":
              "'E'",
            "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position E . ancienneté":
              "'3 ans ou plus'",
          },
          expectedResult: { expectedValue: 3, unit: "mois" },
        },
      ])("Position E - $description", ({ situation, expectedResult }) => {
        const result = engine.calculate({
          "contrat salarié . convention collective": "'IDCC3248'",
          "contrat salarié . convention collective . ancienneté légal":
            "'Moins de 6 mois'",
          ...situation,
        });

        expect(result).toResultBeEqual(
          expectedResult.expectedValue,
          expectedResult.unit
        );
        expect(result).toHaveReferencesBeEqual(expectedReferences);
      });
    });

    describe("Position : F, G, H ou I", () => {
      test.each([
        {
          description: "Ancienneté moins de 2 ans",
          situation: {
            "contrat salarié . convention collective . métallurgie . âge":
              "'50 ans à 55 ans'",
            "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position":
              "'F, G, H ou I'",
            "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position F, G, H ou I . ancienneté":
              "'Moins de 2 ans'",
          },
          expectedResult: { expectedValue: 1, unit: "mois" },
        },
        {
          description: "Ancienneté entre 2 ans et moins de 3 ans",
          situation: {
            "contrat salarié . convention collective . métallurgie . âge":
              "'50 ans à 55 ans'",
            "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position":
              "'F, G, H ou I'",
            "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position F, G, H ou I . ancienneté":
              "'Entre 2 ans et moins de 3 ans'",
          },
          expectedResult: { expectedValue: 2, unit: "mois" },
        },
        {
          description: "Ancienneté entre 3 ans et moins de 5 ans",
          situation: {
            "contrat salarié . convention collective . métallurgie . âge":
              "'50 ans à 55 ans'",
            "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position":
              "'F, G, H ou I'",
            "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position F, G, H ou I . ancienneté":
              "'Entre 3 ans et moins de 5 ans'",
          },
          expectedResult: { expectedValue: 4, unit: "mois" },
        },
        {
          description: "Ancienneté 5 ans ou plus",
          situation: {
            "contrat salarié . convention collective . métallurgie . âge":
              "'50 ans à 55 ans'",
            "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position":
              "'F, G, H ou I'",
            "contrat salarié . convention collective . métallurgie . âge 50 ans à 55 ans . position F, G, H ou I . ancienneté":
              "'5 ans ou plus'",
          },
          expectedResult: { expectedValue: 6, unit: "mois" },
        },
      ])(
        "Position F, G, H ou I - $description",
        ({ situation, expectedResult }) => {
          const result = engine.calculate({
            "contrat salarié . convention collective": "'IDCC3248'",
            "contrat salarié . convention collective . ancienneté légal":
              "'Moins de 6 mois'",
            ...situation,
          });

          expect(result).toResultBeEqual(
            expectedResult.expectedValue,
            expectedResult.unit
          );
          expect(result).toHaveReferencesBeEqual(expectedReferences);
        }
      );
    });
  });

  describe("Âge : 55 ans et plus", () => {
    describe("Position : A, B, C ou D", () => {
      test.each([
        {
          description: "Ancienneté moins de 2 ans",
          situation: {
            "contrat salarié . convention collective . métallurgie . âge":
              "'55 ans et plus'",
            "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position":
              "'A, B, C ou D'",
            "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position A, B, C ou D . ancienneté":
              "'Moins de 2 ans'",
          },
          expectedResult: { expectedValue: 1, unit: "mois" },
        },
        {
          description: "Ancienneté 2 ans ou plus",
          situation: {
            "contrat salarié . convention collective . métallurgie . âge":
              "'55 ans et plus'",
            "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position":
              "'A, B, C ou D'",
            "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position A, B, C ou D . ancienneté":
              "'2 ans ou plus'",
          },
          expectedResult: { expectedValue: 2, unit: "mois" },
        },
      ])(
        "Position A, B, C ou D - $description",
        ({ situation, expectedResult }) => {
          const result = engine.calculate({
            "contrat salarié . convention collective": "'IDCC3248'",
            "contrat salarié . convention collective . ancienneté légal":
              "'Moins de 6 mois'",
            ...situation,
          });

          expect(result).toResultBeEqual(
            expectedResult.expectedValue,
            expectedResult.unit
          );
          expect(result).toHaveReferencesBeEqual(expectedReferences);
        }
      );
    });

    describe("Position : E", () => {
      test.each([
        {
          description: "Ancienneté moins de 2 ans",
          situation: {
            "contrat salarié . convention collective . métallurgie . âge":
              "'55 ans et plus'",
            "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position":
              "'E'",
            "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position E . ancienneté":
              "'Moins de 2 ans'",
          },
          expectedResult: { expectedValue: 1, unit: "mois" },
        },
        {
          description: "Ancienneté entre 2 ans et moins de 3 ans",
          situation: {
            "contrat salarié . convention collective . métallurgie . âge":
              "'55 ans et plus'",
            "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position":
              "'E'",
            "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position E . ancienneté":
              "'Entre 2 ans et moins de 3 ans'",
          },
          expectedResult: { expectedValue: 2, unit: "mois" },
        },
        {
          description: "Ancienneté 3 ans ou plus",
          situation: {
            "contrat salarié . convention collective . métallurgie . âge":
              "'55 ans et plus'",
            "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position":
              "'E'",
            "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position E . ancienneté":
              "'3 ans ou plus'",
          },
          expectedResult: { expectedValue: 3, unit: "mois" },
        },
      ])("Position E - $description", ({ situation, expectedResult }) => {
        const result = engine.calculate({
          "contrat salarié . convention collective": "'IDCC3248'",
          "contrat salarié . convention collective . ancienneté légal":
            "'Moins de 6 mois'",
          ...situation,
        });

        expect(result).toResultBeEqual(
          expectedResult.expectedValue,
          expectedResult.unit
        );
        expect(result).toHaveReferencesBeEqual(expectedReferences);
      });
    });

    describe("Position : F, G, H ou I", () => {
      test.each([
        {
          description: "Ancienneté moins de 2 ans",
          situation: {
            "contrat salarié . convention collective . métallurgie . âge":
              "'55 ans et plus'",
            "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position":
              "'F, G, H ou I'",
            "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position F, G, H ou I . ancienneté":
              "'Moins de 2 ans'",
          },
          expectedResult: { expectedValue: 1, unit: "mois" },
        },
        {
          description: "Ancienneté entre 2 ans et moins de 3 ans",
          situation: {
            "contrat salarié . convention collective . métallurgie . âge":
              "'55 ans et plus'",
            "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position":
              "'F, G, H ou I'",
            "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position F, G, H ou I . ancienneté":
              "'Entre 2 ans et moins de 3 ans'",
          },
          expectedResult: { expectedValue: 2, unit: "mois" },
        },
        {
          description: "Ancienneté entre 3 ans et moins de 5 ans",
          situation: {
            "contrat salarié . convention collective . métallurgie . âge":
              "'55 ans et plus'",
            "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position":
              "'F, G, H ou I'",
            "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position F, G, H ou I . ancienneté":
              "'Entre 3 ans et moins de 5 ans'",
          },
          expectedResult: { expectedValue: 6, unit: "mois" },
        },
        {
          description: "Ancienneté 5 ans ou plus",
          situation: {
            "contrat salarié . convention collective . métallurgie . âge":
              "'55 ans et plus'",
            "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position":
              "'F, G, H ou I'",
            "contrat salarié . convention collective . métallurgie . âge 55 ans et plus . position F, G, H ou I . ancienneté":
              "'5 ans ou plus'",
          },
          expectedResult: { expectedValue: 6, unit: "mois" },
        },
      ])(
        "Position F, G, H ou I - $description",
        ({ situation, expectedResult }) => {
          const result = engine.calculate({
            "contrat salarié . convention collective": "'IDCC3248'",
            "contrat salarié . convention collective . ancienneté légal":
              "'Moins de 6 mois'",
            ...situation,
          });

          expect(result).toResultBeEqual(
            expectedResult.expectedValue,
            expectedResult.unit
          );
          expect(result).toHaveReferencesBeEqual(expectedReferences);
        }
      );
    });
  });
});
