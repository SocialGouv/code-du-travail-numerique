import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "650"
);

describe("Indemnité conventionnel de licenciement pour la CC 650", () => {
  describe("35 ans", () => {
    test.each`
      age   | seniorityRight | seniority | salary  | expectedCompensation
      ${35} | ${0.91}        | ${0.91}   | ${2562} | ${0}
      ${35} | ${0.91}        | ${1}      | ${2562} | ${0}
      ${35} | ${1}           | ${1}      | ${2562} | ${512.4}
      ${35} | ${1}           | ${7.91}   | ${2562} | ${4985.65}
      ${35} | ${1}           | ${8}      | ${2668} | ${5336}
      ${35} | ${1}           | ${19}     | ${2668} | ${22944.8}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary => $expectedCompensation €",
      ({ seniority, seniorityRight, salary, expectedCompensation, age }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0650'",
            "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age":
              age,
            "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . notifier avant le 1er janvier 2024":
              "'Oui'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(missingArgs).toEqual([]);
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.value).toEqual(expectedCompensation);
      }
    );
  });

  describe("54 ans", () => {
    test.each`
      age   | seniorityRight | seniority | salary  | expectedCompensation
      ${54} | ${0.91}        | ${0.91}   | ${2562} | ${0}
      ${54} | ${0.91}        | ${1}      | ${2562} | ${0}
      ${54} | ${1}           | ${1}      | ${2562} | ${512.4}
      ${54} | ${1}           | ${5}      | ${2562} | ${7686}
      ${54} | ${1}           | ${7.91}   | ${2562} | ${7686}
      ${54} | ${1}           | ${8}      | ${2668} | ${8004}
      ${54} | ${1}           | ${19}     | ${2668} | ${27533.76}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary => $expectedCompensation €",
      ({ seniority, seniorityRight, salary, expectedCompensation, age }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0650'",
            "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age":
              age,
            "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . notifier avant le 1er janvier 2024":
              "'Oui'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(missingArgs).toEqual([]);
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.value).toEqual(expectedCompensation);
      }
    );
  });

  describe("54 ans et oui", () => {
    test.each`
      age   | seniorityRight | seniority | salary  | expectedCompensation
      ${55} | ${0.91}        | ${0.91}   | ${2562} | ${0}
      ${55} | ${0.91}        | ${1}      | ${2562} | ${0}
      ${55} | ${1}           | ${1}      | ${2562} | ${512.4}
      ${55} | ${1}           | ${2}      | ${2562} | ${5124}
      ${55} | ${1}           | ${5}      | ${2562} | ${15372}
      ${55} | ${1}           | ${7.91}   | ${2562} | ${15372}
      ${55} | ${1}           | ${8}      | ${2668} | ${16008}
      ${55} | ${1}           | ${19}     | ${2668} | ${29828.24}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary => $expectedCompensation €",
      ({ seniority, salary, seniorityRight, expectedCompensation, age }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0650'",
            "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age":
              age,
            "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . notifier avant le 1er janvier 2024":
              "'Oui'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(missingArgs).toEqual([]);
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.value).toEqual(expectedCompensation);
      }
    );
  });

  describe("55 ans", () => {
    test.each`
      age   | seniorityRight | seniority | salary  | expectedCompensation
      ${55} | ${0.91}        | ${0.91}   | ${2562} | ${0}
      ${55} | ${0.91}        | ${1}      | ${2562} | ${0}
      ${55} | ${1}           | ${1}      | ${2562} | ${512.4}
      ${55} | ${1}           | ${2}      | ${2562} | ${5124}
      ${55} | ${1}           | ${5}      | ${2562} | ${15372}
      ${55} | ${1}           | ${7.91}   | ${2562} | ${15372}
      ${55} | ${1}           | ${8}      | ${2668} | ${16008}
      ${55} | ${1}           | ${19}     | ${2668} | ${29828.24}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary => $expectedCompensation €",
      ({ seniority, seniorityRight, salary, expectedCompensation, age }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0650'",
            "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age":
              age,
            "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . notifier avant le 1er janvier 2024":
              "'Oui'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(missingArgs).toEqual([]);
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.value).toEqual(expectedCompensation);
      }
    );
  });

  describe("61 ans", () => {
    test.each`
      age   | seniorityRight | seniority | salary  | expectedCompensation
      ${61} | ${0.91}        | ${0.91}   | ${2562} | ${0}
      ${61} | ${0.91}        | ${1}      | ${2562} | ${0}
      ${61} | ${1}           | ${1}      | ${2562} | ${486.78}
      ${61} | ${1}           | ${2}      | ${2562} | ${973.56}
      ${61} | ${1}           | ${5}      | ${2562} | ${2433.9}
      ${61} | ${1}           | ${7.91}   | ${2562} | ${4736.37}
      ${61} | ${1}           | ${8}      | ${2668} | ${5069.2}
      ${61} | ${1}           | ${19}     | ${2668} | ${21797.56}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary => $expectedCompensation €",
      ({ seniority, seniorityRight, salary, expectedCompensation, age }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0650'",
            "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age":
              age,
            "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age plus de 60 ans":
              "'Oui'",
            "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . notifier avant le 1er janvier 2024":
              "'Oui'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(missingArgs).toEqual([]);
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.value).toEqual(expectedCompensation);
      }
    );
  });

  describe("62 ans", () => {
    test.each`
      age   | seniorityRight | seniority | salary  | expectedCompensation
      ${62} | ${0.91}        | ${0.91}   | ${2562} | ${0}
      ${62} | ${0.91}        | ${1}      | ${2562} | ${0}
      ${62} | ${1}           | ${1}      | ${2562} | ${461.16}
      ${62} | ${1}           | ${2}      | ${2562} | ${922.32}
      ${62} | ${1}           | ${5}      | ${2562} | ${2305.8}
      ${62} | ${1}           | ${7.91}   | ${2562} | ${4487.09}
      ${62} | ${1}           | ${8}      | ${2668} | ${4802.4}
      ${62} | ${1}           | ${19}     | ${2668} | ${20650.32}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary => $expectedCompensation €",
      ({ seniority, seniorityRight, salary, expectedCompensation, age }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0650'",
            "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age":
              age,
            "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age plus de 60 ans":
              "'Oui'",
            "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . notifier avant le 1er janvier 2024":
              "'Oui'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(missingArgs).toEqual([]);
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.value).toEqual(expectedCompensation);
      }
    );
  });

  describe("63 ans", () => {
    test.each`
      age   | seniorityRight | seniority | salary  | expectedCompensation
      ${63} | ${0.91}        | ${0.91}   | ${2562} | ${0}
      ${63} | ${0.91}        | ${1}      | ${2562} | ${0}
      ${63} | ${1}           | ${1}      | ${2562} | ${409.92}
      ${63} | ${1}           | ${2}      | ${2562} | ${819.84}
      ${63} | ${1}           | ${5}      | ${2562} | ${2049.6}
      ${63} | ${1}           | ${7.91}   | ${2562} | ${3988.52}
      ${63} | ${1}           | ${8}      | ${2668} | ${4268.8}
      ${63} | ${1}           | ${19}     | ${2668} | ${18355.84}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary => $expectedCompensation €",
      ({ seniority, seniorityRight, salary, expectedCompensation, age }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0650'",
            "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age":
              age,
            "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age plus de 60 ans":
              "'Oui'",
            "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . notifier avant le 1er janvier 2024":
              "'Oui'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(missingArgs).toEqual([]);
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.value).toEqual(expectedCompensation);
      }
    );
  });

  describe("64 ans", () => {
    test.each`
      age   | seniorityRight | seniority | salary  | expectedCompensation
      ${64} | ${0.91}        | ${0.91}   | ${2562} | ${0}
      ${64} | ${0.91}        | ${1}      | ${2562} | ${0}
      ${64} | ${1}           | ${1}      | ${2562} | ${307.44}
      ${64} | ${1}           | ${2}      | ${2562} | ${614.88}
      ${64} | ${1}           | ${5}      | ${2562} | ${1537.2}
      ${64} | ${1}           | ${7.91}   | ${2562} | ${2991.39}
      ${64} | ${1}           | ${8}      | ${2668} | ${3201.6}
      ${64} | ${1}           | ${19}     | ${2668} | ${13766.88}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary => $expectedCompensation €",
      ({ seniority, seniorityRight, salary, expectedCompensation, age }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0650'",
            "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age":
              age,
            "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age plus de 60 ans":
              "'Oui'",
            "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . notifier avant le 1er janvier 2024":
              "'Oui'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(missingArgs).toEqual([]);
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.value).toEqual(expectedCompensation);
      }
    );
  });

  describe("Test avec fallback sur la 3248", () => {
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
        "Salarié notifié le $notificationDate, ayant une ancienneté de $seniority ans avec un salaire de référence $refSalary € (a été cadre: $hasBeenExecutive) => une compensation de base de $expectedCompensation €",
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
              "contrat salarié . convention collective": "'IDCC0650'",
              "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
                "'A, B, C, D ou E'",
              "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . avant cadre":
                "'Non'",
              "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . forfait jour":
                "'Non'",
              "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . notifier avant le 1er janvier 2024":
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
          expect(references).toEqual(
            expect.arrayContaining(expectedReferences)
          );
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
          expectedReferences:
            expectedReferencesGroupeABBCDEFCadreAvecMinoration,
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
              "contrat salarié . convention collective": "'IDCC0650'",
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
              "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . notifier avant le 1er janvier 2024":
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
          expect(references).toEqual(
            expect.arrayContaining(expectedReferences)
          );
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
              "contrat salarié . convention collective": "'IDCC0650'",
              "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle":
                "'F, G, H ou I'",
              "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . FGHI . age":
                age.toString(),
              "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . notifier avant le 1er janvier 2024":
                "'Non'",
              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
                seniority.toString(),
              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
                seniorityRight.toString(),
              "contrat salarié . indemnité de licenciement . arrêt de travail":
                "non",
              "contrat salarié . indemnité de licenciement . date de notification":
                notificationDate,
              "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
                "non",
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
});
