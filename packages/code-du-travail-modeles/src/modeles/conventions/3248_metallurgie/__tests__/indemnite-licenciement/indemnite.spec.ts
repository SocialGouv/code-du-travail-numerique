import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "3248"
);

const expectedReferencesGroupeABBCDEFNonCadre = [
  {
    article: "Article 75.3.1.1",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314537?idConteneur=KALICONT000046993250#KALIARTI000046314537",
  },
];
const expectedReferencesGroupeABBCDEFCadre = [
  {
    article: "Article 75.3.1.1",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314537?idConteneur=KALICONT000046993250#KALIARTI000046314537",
  },
  {
    article: "Article 75.3.1.2",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314538?idConteneur=KALICONT000046993250&origin=list#KALIARTI000046314538",
  },
  {
    article: "Article 68",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046315224?idConteneur=KALICONT000046993250&origin=list#KALIARTI000046315224",
  },
];
const expectedReferencesGroupeABBCDEFCadreAvecMinoration = [
  {
    article: "Article 75.3.1.1",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314537?idConteneur=KALICONT000046993250#KALIARTI000046314537",
  },
  {
    article: "Article 75.3.1.2",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314538?idConteneur=KALICONT000046993250&origin=list#KALIARTI000046314538",
  },
  {
    article: "Article 68",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046315224?idConteneur=KALICONT000046993250&origin=list#KALIARTI000046315224",
  },
  {
    article: "Article 75.3.3",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314541?idConteneur=KALICONT000046993250&origin=list#KALIARTI000046314541",
  },
];

const expectedReferenceGroupeFGHIGeneral = [
  {
    article: "Article 75.3.1.2",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314538?idConteneur=KALICONT000046993250&origin=list#KALIARTI000046314538",
  },
];

const expectedReferenceGroupeFGHIAvecMinorationOuMajoration = [
  {
    article: "Article 75.3.1.2",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314538?idConteneur=KALICONT000046993250&origin=list#KALIARTI000046314538",
  },
  {
    article: "Article 75.3.3",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314541?idConteneur=KALICONT000046993250&origin=list#KALIARTI000046314541",
  },
];

describe("Calcul de l'indemnité de licenciement pour CC 3248", () => {
  describe("Groupe A,B,C,D,E (jamais cadre)", () => {
    test.each([
      {
        expectedCompensation: 416.67,
        expectedFormula: "(1/4 * Sref * A1) + (1/3 * Sref * A2)",
        notificationDate: "01/01/2024",
        refSalary: 2500,
        seniority: 8 / 12,
        seniorityRight: 8 / 12,
      },
    ])(
      "Salarié notifié le $notificationDate, ayant une ancienneté de $seniority ans avec un salaire de référence $refSalary € (a été cadre: $hasBeenExecutive) => une compensation de base de $expectedCompensation €",
      ({
        seniorityRight,
        notificationDate,
        expectedCompensation,
        seniority,
        expectedFormula,
        refSalary,
      }) => {
        const { missingArgs, result } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC3248'",
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
              "'ABCDE'",
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . avant cadre":
              "'Non'",
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . forfait jour":
              "'Non'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority.toString(),
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight.toString(),
            "contrat salarié . indemnité de licenciement . date de notification":
              notificationDate,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              refSalary.toString(),
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );

        expect(missingArgs).toEqual([]);
        expect(result.value).toEqual(expectedCompensation);
        expect(result.unit?.numerators).toEqual(["€"]);

        const formule = engine.getFormule();
        expect(formule.formula).toEqual(expectedFormula);

        const references = engine.getReferences("résultat conventionnel");
        expect(references).toHaveLength(
          expectedReferencesGroupeABBCDEFNonCadre.length
        );
        expect(references).toEqual(
          expect.arrayContaining(expectedReferencesGroupeABBCDEFNonCadre)
        );
      }
    );
  });

  describe("Groupe A,B,C,D,E (cadre)", () => {
    test.each([
      {
        age: 30,
        expectedCompensation: 18400,
        expectedFormula: "(1/5 * Sref * A1) + (3/5 * Sref * A2)",
        expectedReferences: expectedReferencesGroupeABBCDEFCadre,
        notificationDate: "01/01/2024",
        refSalary: 2000,
        seniority: 20,
        seniorityRight: 20,
      },
      {
        age: 64,
        expectedCompensation: 11666.67,
        expectedFormula: "(1/4 * Sref * A1) + (1/3 * Sref * A2)",
        expectedReferences: expectedReferencesGroupeABBCDEFCadreAvecMinoration,
        notificationDate: "01/01/2024",
        refSalary: 2000,
        seniority: 20,
        seniorityRight: 20,
      },
    ])(
      "Salarié notifié le $notificationDate, ayant une ancienneté de $seniority ans avec un salaire de référence $refSalary € (a été cadre: $hasBeenExecutive) => une compensation de base de $expectedCompensation €",
      ({
        seniorityRight,
        notificationDate,
        expectedCompensation,
        seniority,
        expectedFormula,
        refSalary,
        age,
        expectedReferences,
      }) => {
        const { missingArgs, result } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC3248'",
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
              "'ABCDE'",
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . avant cadre":
              "'Oui'",
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . forfait jour":
              "'Non'",
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . FGHI . age":
              age.toString(),
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . FGHI . remplit conditions pour la retraite":
              "'Oui'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority.toString(),
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight.toString(),
            "contrat salarié . indemnité de licenciement . date de notification":
              notificationDate,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              refSalary.toString(),
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );

        expect(missingArgs).toEqual([]);
        expect(result.value).toEqual(expectedCompensation);
        expect(result.unit?.numerators).toEqual(["€"]);

        const formule = engine.getFormule();
        expect(formule.formula).toEqual(expectedFormula);

        const references = engine.getReferences("résultat conventionnel");
        expect(references).toHaveLength(expectedReferences.length);
        expect(references).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });

  describe("Groupe FGHI", () => {
    test.each([
      {
        age: 30,
        expectedCompensation: 2000,
        expectedFormula: "1/4 * Sref * A",
        expectedFormulaExplanations: [
          "A : années d'ancienneté (4 ans)",
          "Sref : Salaire de référence (2000 €)",
        ],
        expectedRefs: expectedReferenceGroupeFGHIGeneral,
        notificationDate: "01/01/2024",
        refSalary: 2000,
        retirementRight: undefined,
        seniority: 4,
        seniorityRight: 8 / 12,
      },
      {
        age: 30,
        expectedCompensation: 3000,
        expectedFormula: "1/4 * Sref * A",
        expectedFormulaExplanations: [
          "A : années d'ancienneté (6 ans)",
          "Sref : Salaire de référence (2000 €)",
        ],
        expectedRefs: expectedReferenceGroupeFGHIGeneral,
        notificationDate: "01/01/2024",
        refSalary: 2000,
        retirementRight: undefined,
        seniority: 6,
        seniorityRight: 6,
      },
      {
        age: 50,
        expectedCompensation: 6000,
        expectedFormula: "3 * Sref",
        expectedFormulaExplanations: ["Sref : Salaire de référence (2000 €)"],
        expectedRefs: expectedReferenceGroupeFGHIAvecMinorationOuMajoration,
        notificationDate: "01/01/2024",
        refSalary: 2000,
        retirementRight: undefined,
        seniority: 6,
        seniorityRight: 6,
      },
      {
        age: 55,
        expectedCompensation: 12000,
        expectedFormula: "6 * Sref",
        expectedFormulaExplanations: ["Sref : Salaire de référence (2000 €)"],
        expectedRefs: expectedReferenceGroupeFGHIAvecMinorationOuMajoration,
        notificationDate: "01/01/2024",
        refSalary: 2000,
        retirementRight: undefined,
        seniority: 6,
        seniorityRight: 6,
      },
      {
        age: 50,
        expectedCompensation: 30720,
        expectedFormula: "((1/5 * Sref * A1) + (3/5 * Sref * A2)) * 20 %",
        expectedFormulaExplanations: [
          "A1 : 1 à 7 ans d'ancienneté (7 ans)",
          "A2 : au-delà de 7 ans d'ancienneté (19 ans)",
          "Sref : Salaire de référence (2000 €)",
        ],
        expectedRefs: expectedReferenceGroupeFGHIAvecMinorationOuMajoration,
        notificationDate: "01/01/2024",
        refSalary: 2000,
        retirementRight: undefined,
        seniority: 26,
        seniorityRight: 6,
      },
      {
        age: 55,
        expectedCompensation: 33280,
        expectedFormula: "((1/5 * Sref * A1) + (3/5 * Sref * A2)) * 30 %",
        expectedFormulaExplanations: [
          "A1 : 1 à 7 ans d'ancienneté (7 ans)",
          "A2 : au-delà de 7 ans d'ancienneté (19 ans)",
          "Sref : Salaire de référence (2000 €)",
        ],
        expectedRefs: expectedReferenceGroupeFGHIAvecMinorationOuMajoration,
        notificationDate: "01/01/2024",
        refSalary: 2000,
        retirementRight: undefined,
        seniority: 26,
        seniorityRight: 6,
      },
      {
        age: 30,
        expectedCompensation: 4000,
        expectedFormula: "(1/5 * Sref * A1) + (3/5 * Sref * A2)",
        expectedFormulaExplanations: [
          "A1 : 1 à 7 ans d'ancienneté (7 ans)",
          "A2 : au-delà de 7 ans d'ancienneté (1 an)",
          "Sref : Salaire de référence (2000 €)",
        ],
        expectedRefs: expectedReferenceGroupeFGHIGeneral,
        notificationDate: "01/01/2024",
        refSalary: 2000,
        retirementRight: undefined,
        seniority: 8,
        seniorityRight: 8 / 12,
      },
      {
        age: 30,
        expectedCompensation: 36000,
        expectedFormula: "18 * Sref",
        expectedFormulaExplanations: ["Sref : Salaire de référence (2000 €)"],
        expectedRefs: expectedReferenceGroupeFGHIGeneral,
        notificationDate: "01/01/2024",
        refSalary: 2000,
        retirementRight: undefined,
        seniority: 40,
        seniorityRight: 8 / 12,
      },
      {
        age: 61,
        expectedCompensation: 1900,
        expectedFormula: "(1/4 * Sref * A) * 0.95",
        expectedFormulaExplanations: [
          "A : années d'ancienneté (4 ans)",
          "Sref : Salaire de référence (2000 €)",
        ],
        expectedRefs: expectedReferenceGroupeFGHIAvecMinorationOuMajoration,
        notificationDate: "01/01/2024",
        refSalary: 2000,
        retirementRight: true,
        seniority: 4,
        seniorityRight: 8 / 12,
      },
      {
        age: 61,
        expectedCompensation: 2000,
        expectedFormula: "1/4 * Sref * A",
        expectedFormulaExplanations: [
          "A : années d'ancienneté (4 ans)",
          "Sref : Salaire de référence (2000 €)",
        ],
        expectedRefs: expectedReferenceGroupeFGHIGeneral,
        notificationDate: "01/01/2024",
        refSalary: 2000,
        retirementRight: false,
        seniority: 4,
        seniorityRight: 8 / 12,
      },
      {
        age: 62,
        expectedCompensation: 1800,
        expectedFormula: "(1/4 * Sref * A) * 0.90",
        expectedFormulaExplanations: [
          "A : années d'ancienneté (4 ans)",
          "Sref : Salaire de référence (2000 €)",
        ],
        expectedRefs: expectedReferenceGroupeFGHIAvecMinorationOuMajoration,
        notificationDate: "01/01/2024",
        refSalary: 2000,
        retirementRight: true,
        seniority: 4,
        seniorityRight: 8 / 12,
      },
      {
        age: 62,
        expectedCompensation: 2000,
        expectedFormula: "1/4 * Sref * A",
        expectedFormulaExplanations: [
          "A : années d'ancienneté (4 ans)",
          "Sref : Salaire de référence (2000 €)",
        ],
        expectedRefs: expectedReferenceGroupeFGHIGeneral,
        notificationDate: "01/01/2024",
        refSalary: 2000,
        retirementRight: false,
        seniority: 4,
        seniorityRight: 8 / 12,
      },
      {
        age: 63,
        expectedCompensation: 14720,
        expectedFormula: "((1/5 * Sref * A1) + (3/5 * Sref * A2)) * 0.80",
        expectedFormulaExplanations: [
          "A1 : 1 à 7 ans d'ancienneté (7 ans)",
          "A2 : au-delà de 7 ans d'ancienneté (13 ans)",
          "Sref : Salaire de référence (2000 €)",
        ],
        expectedRefs: expectedReferenceGroupeFGHIAvecMinorationOuMajoration,
        notificationDate: "01/01/2024",
        refSalary: 2000,
        retirementRight: true,
        seniority: 20,
        seniorityRight: 8 / 12,
      },
      {
        age: 63,
        expectedCompensation: 18400,
        expectedFormula: "(1/5 * Sref * A1) + (3/5 * Sref * A2)",
        expectedFormulaExplanations: [
          "A1 : 1 à 7 ans d'ancienneté (7 ans)",
          "A2 : au-delà de 7 ans d'ancienneté (13 ans)",
          "Sref : Salaire de référence (2000 €)",
        ],
        expectedRefs: expectedReferenceGroupeFGHIGeneral,
        notificationDate: "01/01/2024",
        refSalary: 2000,
        retirementRight: false,
        seniority: 20,
        seniorityRight: 8 / 12,
      },
      {
        age: 64,
        expectedCompensation: 1200,
        expectedFormula: "(1/4 * Sref * A) * 0.60",
        expectedFormulaExplanations: [
          "A : années d'ancienneté (4 ans)",
          "Sref : Salaire de référence (2000 €)",
        ],
        expectedRefs: expectedReferenceGroupeFGHIAvecMinorationOuMajoration,
        notificationDate: "01/01/2024",
        refSalary: 2000,
        retirementRight: true,
        seniority: 4,
        seniorityRight: 8 / 12,
      },
      {
        age: 64,
        expectedCompensation: 2000,
        expectedFormula: "1/4 * Sref * A",
        expectedFormulaExplanations: [
          "A : années d'ancienneté (4 ans)",
          "Sref : Salaire de référence (2000 €)",
        ],
        expectedRefs: expectedReferenceGroupeFGHIGeneral,
        notificationDate: "01/01/2024",
        refSalary: 2000,
        retirementRight: false,
        seniority: 4,
        seniorityRight: 8 / 12,
      },
      {
        age: 65,
        expectedCompensation: 1200,
        expectedFormula: "(1/4 * Sref * A) * 0.60",
        expectedFormulaExplanations: [
          "A : années d'ancienneté (4 ans)",
          "Sref : Salaire de référence (2000 €)",
        ],
        expectedRefs: expectedReferenceGroupeFGHIAvecMinorationOuMajoration,
        notificationDate: "01/01/2024",
        refSalary: 2000,
        retirementRight: true,
        seniority: 4,
        seniorityRight: 8 / 12,
      },
      {
        age: 65,
        expectedCompensation: 2000,
        expectedFormula: "1/4 * Sref * A",
        expectedFormulaExplanations: [
          "A : années d'ancienneté (4 ans)",
          "Sref : Salaire de référence (2000 €)",
        ],
        expectedRefs: expectedReferenceGroupeFGHIGeneral,
        notificationDate: "01/01/2024",
        refSalary: 2000,
        retirementRight: false,
        seniority: 4,
        seniorityRight: 8 / 12,
      },
    ])(
      "Salarié notifié le $notificationDate, ayant une ancienneté de $seniority ans avec un salaire de référence $refSalary € (age: $age ($retirementRight)) => une compensation de base de $expectedCompensation €",
      ({
        age,
        seniorityRight,
        notificationDate,
        expectedCompensation,
        seniority,
        expectedFormula,
        refSalary,
        retirementRight,
        expectedRefs,
        expectedFormulaExplanations,
      }) => {
        const { missingArgs, result } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC3248'",
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
              "'FGHI'",
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . FGHI . age":
              age.toString(),
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority.toString(),
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight.toString(),
            "contrat salarié . indemnité de licenciement . date de notification":
              notificationDate,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              refSalary.toString(),
            ...(retirementRight !== undefined
              ? {
                  "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . FGHI . remplit conditions pour la retraite":
                    retirementRight ? "'Oui'" : "'Non'",
                }
              : {}),
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        const formule = engine.getFormule();
        expect(formule.formula).toEqual(expectedFormula);
        expect(formule.explanations).toEqual(expectedFormulaExplanations);

        expect(missingArgs).toEqual([]);
        expect(result.value).toEqual(expectedCompensation);
        expect(result.unit?.numerators).toEqual(["€"]);

        const references = engine.getReferences("résultat conventionnel");
        expect(references).toHaveLength(expectedRefs.length);
        expect(references).toEqual(expect.arrayContaining(expectedRefs));
      }
    );
  });
});
