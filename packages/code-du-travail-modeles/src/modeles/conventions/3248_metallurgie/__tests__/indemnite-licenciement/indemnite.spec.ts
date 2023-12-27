import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "3248"
);

const expectedReferencesLicenciementAbsencesProlongesOrRepetes = [
  {
    article: "Article 91.2",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314615#KALIARTI000046314615",
  },
];

const expectedReferencesGroupeABBCDEFNonCadre = [
  {
    article: "Article 75.3.1.1",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314537?idConteneur=KALICONT000046993250#KALIARTI000046314537",
  },
];

const expectedReferenceForfaitJour = {
  article: "Article 73",
  url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314519?idConteneur=KALICONT000046993250#KALIARTI000046314519",
};

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
        expectedCompensation: 0,
        expectedFormula: "",
        expectedReferences: [],
        notificationDate: "01/01/2024",
        refSalary: 2668,
        seniority: 6 / 12,
        seniorityRight: 6 / 12,
      },
      {
        expectedCompensation: 444.67,
        expectedFormula: "(1/4 * Sref * A1)",
        expectedReferences: expectedReferencesGroupeABBCDEFNonCadre,
        notificationDate: "01/01/2024",
        refSalary: 2668,
        seniority: 8 / 12,
        seniorityRight: 8 / 12,
      },
      {
        expectedCompensation: 611.42,
        expectedFormula: "(1/4 * Sref * A1)",
        expectedReferences: expectedReferencesGroupeABBCDEFNonCadre,
        notificationDate: "01/01/2024",
        refSalary: 2668,
        seniority: 11 / 12,
        seniorityRight: 11 / 12,
      },
    ])(
      "Salarié notifié le $notificationDate, ayant une ancienneté de $seniority ans avec un salaire de référence $refSalary € => une compensation de base de $expectedCompensation €",
      ({
        seniorityRight,
        notificationDate,
        expectedCompensation,
        expectedReferences,
        seniority,
        expectedFormula,
        refSalary,
      }) => {
        const { missingArgs, result } = engine.setSituation(
          {
            "contrat salarié - convention collective - métallurgie - indemnité de licenciement - licenciement pour motif absence prolongée ou répétées":
              "'Non'",
            "contrat salarié . convention collective": "'IDCC3248'",
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
              "'A, B, C, D ou E'",
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
        expect(references).toHaveLength(expectedReferences.length);
        expect(references).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });

  describe("Groupe A,B,C,D,E (jamais cadre) avec un licenciement pour le motif suivant : 'absence prolongée ou absences répétées justifiées perturbant le fonctionnement de l'entreprise'", () => {
    test.each([
      {
        absenceDuration: "'moins de 2 mois'",
        expectedCompensation: 0,
        expectedFormula: "",
        expectedReferences: [],
        notificationDate: "01/01/2024",
        refSalary: 2668,
        seniority: 6 / 12,
        seniorityRight: 6 / 12,
      },
      {
        absenceDuration: "'moins de 2 mois'",
        expectedCompensation: 444.67,
        expectedFormula: "(1/4 * Sref * A1)",
        expectedReferences: expectedReferencesGroupeABBCDEFNonCadre.concat(
          expectedReferencesLicenciementAbsencesProlongesOrRepetes
        ),
        notificationDate: "01/01/2024",
        refSalary: 2668,
        seniority: 8 / 12,
        seniorityRight: 8 / 12,
      },
      {
        absenceDuration: "'moins de 2 mois'",
        expectedCompensation: 1000.5,
        expectedFormula: "(1/4 * Sref * A1) * 1.5",
        expectedReferences: expectedReferencesGroupeABBCDEFNonCadre.concat(
          expectedReferencesLicenciementAbsencesProlongesOrRepetes
        ),
        notificationDate: "01/01/2024",
        refSalary: 2668,
        seniority: 1,
        seniorityRight: 8 / 12,
      },
      {
        absenceDuration: "'de 2 mois à moins de 4 mois'",
        expectedCompensation: 5002.5,
        expectedFormula: "(1/4 * Sref * A1) * 1.5",
        expectedReferences: expectedReferencesGroupeABBCDEFNonCadre.concat(
          expectedReferencesLicenciementAbsencesProlongesOrRepetes
        ),
        notificationDate: "01/01/2024",
        refSalary: 2668,
        seniority: 5,
        seniorityRight: 11 / 12,
      },
      {
        absenceDuration: "'de 4 mois à moins 6 mois'",
        expectedCompensation: 3335,
        expectedFormula: "(1/4 * Sref * A1)",
        expectedReferences: expectedReferencesGroupeABBCDEFNonCadre.concat(
          expectedReferencesLicenciementAbsencesProlongesOrRepetes
        ),
        notificationDate: "01/01/2024",
        refSalary: 2668,
        seniority: 5,
        seniorityRight: 11 / 12,
      },
      {
        absenceDuration: "'de 4 mois à moins 6 mois'",
        expectedCompensation: 10005,
        expectedFormula: "(1/4 * Sref * A1) * 1.5",
        expectedReferences: expectedReferencesGroupeABBCDEFNonCadre.concat(
          expectedReferencesLicenciementAbsencesProlongesOrRepetes
        ),
        notificationDate: "01/01/2024",
        refSalary: 2668,
        seniority: 10,
        seniorityRight: 11 / 12,
      },
      {
        absenceDuration: "'6 mois ou plus'",
        expectedCompensation: 6670,
        expectedFormula: "(1/4 * Sref * A1)",
        expectedReferences: expectedReferencesGroupeABBCDEFNonCadre.concat(
          expectedReferencesLicenciementAbsencesProlongesOrRepetes
        ),
        notificationDate: "01/01/2024",
        refSalary: 2668,
        seniority: 10,
        seniorityRight: 11 / 12,
      },
    ])(
      "Salarié licencié pour absences $absenceDuration, ayant une ancienneté de $seniority ans => une compensation de base de $expectedCompensation €",
      ({
        seniorityRight,
        notificationDate,
        expectedCompensation,
        expectedReferences,
        seniority,
        expectedFormula,
        refSalary,
        absenceDuration,
      }) => {
        const { missingArgs, result } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC3248'",
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
              "'A, B, C, D ou E'",
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . avant cadre":
              "'Non'",
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . forfait jour":
              "'Non'",
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . licenciement pour motif absence prolongée ou répétées":
              "'Oui'",
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . licenciement pour motif absence prolongée ou répétées durée":
              absenceDuration,
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

  describe("Groupe A,B,C,D,E (forfait jour - jamais cadre)", () => {
    test.each([
      {
        expectedCompensation: 0,
        expectedFormula: "",
        expectedReferences: [],
        notificationDate: "01/01/2024",
        refSalary: 2668,
        seniority: 6 / 12,
        seniorityRight: 6 / 12,
      },
      {
        expectedCompensation: 444.67,
        expectedFormula: "(1/4 * Sref * A1)",
        expectedReferences: expectedReferencesGroupeABBCDEFNonCadre.concat(
          expectedReferenceForfaitJour
        ),
        notificationDate: "01/01/2024",
        refSalary: 2668,
        seniority: 8 / 12,
        seniorityRight: 8 / 12,
      },
      {
        expectedCompensation: 611.42,
        expectedFormula: "(1/4 * Sref * A1)",
        expectedReferences: expectedReferencesGroupeABBCDEFNonCadre.concat(
          expectedReferenceForfaitJour
        ),
        notificationDate: "01/01/2024",
        refSalary: 2668,
        seniority: 11 / 12,
        seniorityRight: 11 / 12,
      },
    ])(
      "Salarié notifié le $notificationDate, ayant une ancienneté de $seniority ans avec un salaire de référence $refSalary € => une compensation de base de $expectedCompensation €",
      ({
        seniorityRight,
        notificationDate,
        expectedCompensation,
        expectedReferences,
        seniority,
        expectedFormula,
        refSalary,
      }) => {
        const { missingArgs, result } = engine.setSituation(
          {
            "contrat salarié - convention collective - métallurgie - indemnité de licenciement - licenciement pour motif absence prolongée ou répétées":
              "'Non'",
            "contrat salarié . convention collective": "'IDCC3248'",
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
              "'A, B, C, D ou E'",
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . avant cadre":
              "'Non'",
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . forfait jour":
              "'Oui'",
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . toujours au forfait jour":
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

  describe("Groupe A,B,C,D,E (cadre)", () => {
    test.each([
      {
        age: 30,
        expectedCompensation: 0,
        expectedFormula: "",
        expectedReferences: [],
        notificationDate: "01/01/2024",
        refSalary: 2668,
        seniority: 7 / 12,
        seniorityRight: 7 / 12,
      },
      {
        age: 30,
        expectedCompensation: 24545.6,
        expectedFormula: "(1/5 * Sref * A1) + (3/5 * Sref * A2)",
        expectedReferences: expectedReferencesGroupeABBCDEFCadre,
        notificationDate: "01/01/2024",
        refSalary: 2668,
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
      {
        age: 35,
        expectedCompensation: 10138.4,
        expectedFormula: "(1/5 * Sref * A1) + (3/5 * Sref * A2)",
        expectedReferences: expectedReferencesGroupeABBCDEFCadre,
        notificationDate: "31/12/2024",
        refSalary: 2668,
        seniority: 11,
        seniorityRight: 11,
      },
    ])(
      "Salarié notifié le $notificationDate, ayant une ancienneté de $seniority ans avec un salaire de référence $refSalary € => une compensation de base de $expectedCompensation €",
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
            "contrat salarié - convention collective - métallurgie - indemnité de licenciement - licenciement pour motif absence prolongée ou répétées":
              "'Non'",
            "contrat salarié . convention collective": "'IDCC3248'",
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
              "'A, B, C, D ou E'",
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

  describe("Groupe A,B,C,D,E (forfait jour - cadre)", () => {
    test.each([
      {
        age: 30,
        expectedCompensation: 0,
        expectedFormula: "",
        expectedReferences: [],
        notificationDate: "01/01/2024",
        refSalary: 2668,
        seniority: 7 / 12,
        seniorityRight: 7 / 12,
      },
      {
        age: 30,
        expectedCompensation: 24545.6,
        expectedFormula: "(1/5 * Sref * A1) + (3/5 * Sref * A2)",
        expectedReferences: expectedReferencesGroupeABBCDEFCadre.concat(
          expectedReferenceForfaitJour
        ),
        notificationDate: "01/01/2024",
        refSalary: 2668,
        seniority: 20,
        seniorityRight: 20,
      },
      {
        age: 64,
        expectedCompensation: 11666.67,
        expectedFormula: "(1/4 * Sref * A1) + (1/3 * Sref * A2)",
        expectedReferences:
          expectedReferencesGroupeABBCDEFCadreAvecMinoration.concat(
            expectedReferenceForfaitJour
          ),
        notificationDate: "01/01/2024",
        refSalary: 2000,
        seniority: 20,
        seniorityRight: 20,
      },
      {
        age: 35,
        expectedCompensation: 10138.4,
        expectedFormula: "(1/5 * Sref * A1) + (3/5 * Sref * A2)",
        expectedReferences: expectedReferencesGroupeABBCDEFCadre.concat(
          expectedReferenceForfaitJour
        ),
        notificationDate: "31/12/2024",
        refSalary: 2668,
        seniority: 11,
        seniorityRight: 11,
      },
    ])(
      "Salarié notifié le $notificationDate, ayant une ancienneté de $seniority ans avec un salaire de référence $refSalary € => une compensation de base de $expectedCompensation €",
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
            "contrat salarié - convention collective - métallurgie - indemnité de licenciement - licenciement pour motif absence prolongée ou répétées":
              "'Non'",
            "contrat salarié . convention collective": "'IDCC3248'",
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
              "'A, B, C, D ou E'",
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . avant cadre":
              "'Oui'",
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . forfait jour":
              "'Oui'",
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . toujours au forfait jour":
              "'Oui'",
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
        expectedCompensation: 0,
        expectedFormula: "",
        expectedFormulaExplanations: [],
        expectedRefs: [],
        notificationDate: "01/01/2024",
        refSalary: 2668,
        retirementRight: undefined,
        seniority: 4,
        seniorityRight: 7 / 12,
      },
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
            "contrat salarié - convention collective - métallurgie - indemnité de licenciement - licenciement pour motif absence prolongée ou répétées":
              "'Non'",
            "contrat salarié . convention collective": "'IDCC3248'",
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
              "'F, G, H ou I'",
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
