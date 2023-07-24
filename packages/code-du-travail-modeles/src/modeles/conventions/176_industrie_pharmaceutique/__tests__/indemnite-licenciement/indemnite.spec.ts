import { addYears, format } from "date-fns";

import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "176"
);

const expectedReferences = [
  {
    article: "Article 36",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041494327?idConteneur=KALICONT000005635184",
  },
  {
    article: "Article 25",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039117073?idConteneur=KALICONT000005635184&origin=list#KALIARTI000039117073",
  },
];

describe("Calcul de l'indemnité de licenciement pour CC 176", () => {
  describe("CDI classique", () => {
    test.each([
      {
        age: 40,
        entryDate: "01/07/2019",
        expectedCompensation: 556,
        expectedFormula: "0.3 * Sref * A",
        seniority: 8 / 12,
        seniorityRight: 8 / 12,
      },
      {
        age: 40,
        entryDate: "01/07/2019",
        expectedCompensation: 2502,
        expectedFormula: "0.3 * Sref * A",
        seniority: 3,
        seniorityRight: 3,
      },
      {
        age: 45,
        entryDate: "01/07/2019",
        expectedCompensation: 3336,
        expectedFormula: "(0.3 * Sref * A) + (1 * Sref)",
        seniority: 8 / 12,
        seniorityRight: 8 / 12,
      },
      {
        age: 45,
        entryDate: "01/07/2019",
        expectedCompensation: 5282,
        expectedFormula: "(0.3 * Sref * A) + (1 * Sref)",
        seniority: 3,
        seniorityRight: 3,
      },
      {
        age: 50,
        entryDate: "01/07/2019",
        expectedCompensation: 6116,
        expectedFormula: "(0.3 * Sref * A) + (2 * Sref)",
        seniority: 8 / 12,
        seniorityRight: 8 / 12,
      },
      {
        age: 50,
        entryDate: "01/07/2019",
        expectedCompensation: 8062,
        expectedFormula: "(0.3 * Sref * A) + (2 * Sref)",
        seniority: 3,
        seniorityRight: 3,
      },
      {
        age: 40,
        entryDate: "01/07/2019",
        expectedCompensation: 4726,
        expectedFormula: "0.34 * Sref * A",
        seniority: 5,
        seniorityRight: 5,
      },
      {
        age: 40,
        entryDate: "01/07/2019",
        expectedCompensation: 7561.6,
        expectedFormula: "0.34 * Sref * A",
        seniority: 8,
        seniorityRight: 8,
      },
      {
        age: 45,
        entryDate: "01/07/2019",
        expectedCompensation: 7506,
        expectedFormula: "(0.34 * Sref * A) + (1 * Sref)",
        seniority: 5,
        seniorityRight: 5,
      },
      {
        age: 45,
        entryDate: "01/07/2019",
        expectedCompensation: 10341.6,
        expectedFormula: "(0.34 * Sref * A) + (1 * Sref)",
        seniority: 8,
        seniorityRight: 8,
      },
      {
        age: 50,
        entryDate: "01/07/2019",
        expectedCompensation: 10286,
        expectedFormula: "(0.34 * Sref * A) + (2 * Sref)",
        seniority: 5,
        seniorityRight: 5,
      },
      {
        age: 50,
        entryDate: "01/07/2019",
        expectedCompensation: 13121.6,
        expectedFormula: "(0.34 * Sref * A) + (2 * Sref)",
        seniority: 8,
        seniorityRight: 8,
      },
      {
        age: 40,
        entryDate: "01/07/2019",
        expectedCompensation: 10564,
        expectedFormula: "0.38 * Sref * A",
        seniority: 10,
        seniorityRight: 10,
      },
      {
        age: 45,
        entryDate: "01/07/2019",
        expectedCompensation: 13344,
        expectedFormula: "(0.38 * Sref * A) + (1 * Sref)",
        seniority: 10,
        seniorityRight: 10,
      },
      {
        age: 50,
        entryDate: "01/07/2019",
        expectedCompensation: 16124,
        expectedFormula: "(0.38 * Sref * A) + (2 * Sref)",
        seniority: 10,
        seniorityRight: 10,
      },
      {
        age: 45,
        entryDate: "01/07/2019",
        expectedCompensation: 20294,
        expectedFormula: "(0.42 * Sref * A) + (1 * Sref)",
        seniority: 15,
        seniorityRight: 15,
      },
      {
        age: 50,
        entryDate: "01/07/2019",
        expectedCompensation: 23074,
        expectedFormula: "(0.42 * Sref * A) + (2 * Sref)",
        seniority: 15,
        seniorityRight: 15,
      },
      {
        age: 45,
        entryDate: "01/07/2019",
        expectedCompensation: 27800,
        expectedFormula: "(0.45 * Sref * A) + (1 * Sref)",
        seniority: 20,
        seniorityRight: 20,
      },
      {
        age: 50,
        entryDate: "01/07/2019",
        expectedCompensation: 30580,
        expectedFormula: "(0.45 * Sref * A) + (2 * Sref)",
        seniority: 20,
        seniorityRight: 20,
      },
      {
        age: 45,
        entryDate: "01/07/2019",
        expectedCompensation: 36140,
        expectedFormula: "(0.48 * Sref * A) + (1 * Sref)",
        seniority: 25,
        seniorityRight: 25,
      },
      {
        age: 50,
        entryDate: "01/07/2019",
        expectedCompensation: 38920,
        expectedFormula: "(0.48 * Sref * A) + (2 * Sref)",
        seniority: 25,
        seniorityRight: 25,
      },
      {
        age: 45,
        entryDate: "01/07/2019",
        expectedCompensation: 43646,
        expectedFormula: "(0.49 * Sref * A) + (1 * Sref)",
        seniority: 30,
        seniorityRight: 30,
      },
      {
        age: 50,
        entryDate: "01/07/2019",
        expectedCompensation: 46426,
        expectedFormula: "(0.49 * Sref * A) + (2 * Sref)",
        seniority: 30,
        seniorityRight: 30,
      },
      {
        age: 45,
        entryDate: "01/07/2019",
        expectedCompensation: 51430,
        expectedFormula: "(0.5 * Sref * A) + (1 * Sref)",
        seniority: 35,
        seniorityRight: 35,
      },
      {
        age: 50,
        entryDate: "01/07/2019",
        expectedCompensation: 54210,
        expectedFormula: "(0.5 * Sref * A) + (2 * Sref)",
        seniority: 35,
        seniorityRight: 35,
      },
      {
        age: 45,
        entryDate: "01/07/1978",
        expectedCompensation: 58380,
        expectedFormula: "21 * Sref",
        seniority: 40,
        seniorityRight: 40,
      },
      {
        age: 50,
        entryDate: "01/07/1978",
        expectedCompensation: 61160,
        expectedFormula: "22 * Sref",
        seniority: 40,
        seniorityRight: 40,
      },
      {
        age: 40,
        entryDate: "30/06/2019",
        expectedCompensation: 625.5,
        expectedFormula: "0.3 * Sref * A",
        notificationDate: "30/03/2020",
        seniority: 0.75,
        seniorityRight: 0.75,
      },
      {
        age: 40,
        entryDate: "30/06/2019",
        expectedCompensation: 834,
        expectedFormula: "0.3 * Sref * A",
        notificationDate: "30/06/2020",
        seniority: 1,
        seniorityRight: 1,
      },
      {
        age: 40,
        entryDate: "01/07/2011",
        expectedCompensation: 16099.91,
        expectedFormula:
          "(9 / 30 * Sref * A1) + (12 / 30 * Sref * A2) + (14 / 30 * Sref * A3)",
        notificationDate: "01/06/2026",
        seniority: 14.91,
        seniorityRight: 14.91,
      },
      {
        age: 40,
        entryDate: "01/06/2011",
        expectedCompensation: 20294,
        expectedFormula: "(0.42 * Sref * A) + (1 * Sref)",
        notificationDate: "01/06/2026",
        seniority: 15,
        seniorityRight: 15,
      },
      {
        age: 40,
        entryDate: "01/06/2011",
        expectedCompensation: 26039.33,
        expectedFormula:
          "(9 / 30 * Sref * A1) + (12 / 30 * Sref * A2) + (14 / 30 * Sref * A3) + (16 / 30 * Sref * A4) + (1 * Sref)",
        notificationDate: "01/06/2026",
        seniority: 19.75,
        seniorityRight: 19.75,
      },
      {
        age: 40,
        entryDate: "01/06/2011",
        expectedCompensation: 27800,
        expectedFormula: "(0.45 * Sref * A) + (1 * Sref)",
        notificationDate: "01/06/2026",
        seniority: 20,
        seniorityRight: 20,
      },
      {
        age: 40,
        entryDate: "01/07/1986",
        expectedCompensation: 58380,
        expectedFormula: "21 * Sref",
        notificationDate: "01/06/2026",
        seniority: 40,
        seniorityRight: 40,
      },
      {
        age: 45,
        entryDate: "30/06/2019",
        expectedCompensation: 3405.5,
        expectedFormula: "(0.3 * Sref * A) + (1 * Sref)",
        notificationDate: "30/03/2020",
        seniority: 9 / 12,
        seniorityRight: 9 / 12,
      },
      {
        age: 45,
        entryDate: "30/06/2019",
        expectedCompensation: 3614,
        expectedFormula: "(0.3 * Sref * A) + (1 * Sref)",
        notificationDate: "30/06/2020",
        seniority: 1,
        seniorityRight: 1,
      },
      {
        age: 45,
        entryDate: "01/07/2011",
        expectedCompensation: 18879.91,
        expectedFormula:
          "(9 / 30 * Sref * A1) + (12 / 30 * Sref * A2) + (14 / 30 * Sref * A3) + (1 * Sref)",
        notificationDate: "01/06/2026",
        seniority: 14.91,
        seniorityRight: 14.91,
      },
      {
        age: 45,
        entryDate: "01/06/2011",
        expectedCompensation: 20294,
        expectedFormula: "(0.42 * Sref * A) + (1 * Sref)",
        notificationDate: "01/06/2026",
        seniority: 15,
        seniorityRight: 15,
      },
      {
        age: 45,
        entryDate: "01/09/2006",
        expectedCompensation: 26039.33,
        expectedFormula:
          "(9 / 30 * Sref * A1) + (12 / 30 * Sref * A2) + (14 / 30 * Sref * A3) + (16 / 30 * Sref * A4) + (1 * Sref)",
        notificationDate: "01/06/2026",
        seniority: 19.75,
        seniorityRight: 19.75,
      },
      {
        age: 45,
        entryDate: "01/06/2006",
        expectedCompensation: 27800,
        expectedFormula: "(0.45 * Sref * A) + (1 * Sref)",
        notificationDate: "01/06/2026",
        seniority: 20,
        seniorityRight: 20,
      },
      {
        age: 45,
        entryDate: "01/06/2001",
        expectedCompensation: 36140,
        expectedFormula: "(0.48 * Sref * A) + (1 * Sref)",
        notificationDate: "01/06/2026",
        seniority: 25,
        seniorityRight: 25,
      },
      {
        age: 45,
        entryDate: "01/07/1986",
        expectedCompensation: 58380,
        expectedFormula: "21 * Sref",
        notificationDate: "01/06/2026",
        seniority: 40,
        seniorityRight: 40,
      },
      {
        age: 50,
        entryDate: "30/06/2019",
        expectedCompensation: 6185.5,
        expectedFormula: "(0.3 * Sref * A) + (2 * Sref)",
        notificationDate: "30/03/2020",
        seniority: 9 / 12,
        seniorityRight: 9 / 12,
      },
      {
        age: 50,
        entryDate: "30/06/2019",
        expectedCompensation: 6394,
        expectedFormula: "(0.3 * Sref * A) + (2 * Sref)",
        notificationDate: "30/06/2020",
        seniority: 1,
        seniorityRight: 1,
      },
      {
        age: 50,
        entryDate: "01/07/2011",
        expectedCompensation: 21659.91,
        expectedFormula:
          "(9 / 30 * Sref * A1) + (12 / 30 * Sref * A2) + (14 / 30 * Sref * A3) + (2 * Sref)",
        notificationDate: "01/06/2026",
        seniority: 14.91,
        seniorityRight: 14.91,
      },
      {
        age: 50,
        entryDate: "01/07/2011",
        expectedCompensation: 23074,
        expectedFormula: "(0.42 * Sref * A) + (2 * Sref)",
        notificationDate: "01/06/2026",
        seniority: 15,
        seniorityRight: 15,
      },
      {
        age: 50,
        entryDate: "01/07/2011",
        expectedCompensation: 28819.33,
        expectedFormula:
          "(9 / 30 * Sref * A1) + (12 / 30 * Sref * A2) + (14 / 30 * Sref * A3) + (16 / 30 * Sref * A4) + (2 * Sref)",
        notificationDate: "01/06/2026",
        seniority: 19.75,
        seniorityRight: 19.75,
      },
      {
        age: 50,
        entryDate: "01/06/2006",
        expectedCompensation: 30580,
        expectedFormula: "(0.45 * Sref * A) + (2 * Sref)",
        notificationDate: "01/06/2026",
        seniority: 20,
        seniorityRight: 20,
      },
      {
        age: 50,
        entryDate: "01/06/2001",
        expectedCompensation: 38920,
        expectedFormula: "(0.48 * Sref * A) + (2 * Sref)",
        notificationDate: "01/06/2026",
        seniority: 25,
        seniorityRight: 25,
      },
      {
        age: 50,
        entryDate: "01/07/1986",
        expectedCompensation: 61160,
        expectedFormula: "22 * Sref",
        notificationDate: "01/06/2026",
        seniority: 40,
        seniorityRight: 40,
      },
    ])(
      "Avec une ancienneté $seniority ans (plus $seniorityEmployeTAM en tant que non cadre), droit de retraite: $haveRightToRetirement, un salaire de référence $salaireRef € et un age de $age => une compensation de base de $expectedCompensation €",
      ({
        seniorityRight,
        entryDate,
        notificationDate,
        age,
        expectedCompensation,
        seniority,
        expectedFormula,
      }) => {
        const { missingArgs, result } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0176'",
            "contrat salarié . convention collective . industrie pharmaceutique . age":
              age.toString(),
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority.toString(),
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight.toString(),
            "contrat salarié . indemnité de licenciement . date d'entrée":
              entryDate,
            "contrat salarié . indemnité de licenciement . date de notification":
              notificationDate ??
              format(addYears(new Date(entryDate), seniority), "dd/MM/yyyy"),
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              "2780",
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );

        const formule = engine.getFormule();
        expect(formule.formula).toEqual(expectedFormula);

        expect(missingArgs).toEqual([]);
        expect(result.value).toEqual(expectedCompensation);
        expect(result.unit?.numerators).toEqual(["€"]);

        const references = engine.getReferences("résultat conventionnel");
        expect(references).toHaveLength(expectedReferences.length);
        expect(references).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });
});
