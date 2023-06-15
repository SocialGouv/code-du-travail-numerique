import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "176"
);

describe("Calcul de l'indemnité de licenciement pour CC 176", () => {
  describe("CDI classique", () => {
    test.each([
      {
        age: 45,
        beforeEndorsement: false,
        expectedExplanations: [
          "A : Ancienneté totale (≈ 0.67 an : valeur arrondie)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula: "0.3 * Sref * A",
        seniority: 8 / 12,
        seniorityRight: 8 / 12,
      },
      {
        age: 50,
        beforeEndorsement: false,
        expectedExplanations: [
          "A : Ancienneté totale (≈ 0.67 an : valeur arrondie)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula: "(0.3 * Sref * A) + (1 * Sref)",
        seniority: 8 / 12,
        seniorityRight: 8 / 12,
      },
      {
        age: 55,
        beforeEndorsement: false,
        expectedExplanations: [
          "A : Ancienneté totale (≈ 0.67 an : valeur arrondie)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula: "(0.3 * Sref * A) + (2 * Sref)",
        seniority: 8 / 12,
        seniorityRight: 8 / 12,
      },
      {
        age: 45,
        beforeEndorsement: false,
        expectedExplanations: [
          "A : Ancienneté totale (5 ans)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula: "0.34 * Sref * A",
        seniority: 5,
        seniorityRight: 5,
      },
      {
        age: 50,
        beforeEndorsement: false,
        expectedExplanations: [
          "A : Ancienneté totale (5 ans)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula: "(0.34 * Sref * A) + (1 * Sref)",
        seniority: 5,
        seniorityRight: 5,
      },
      {
        age: 55,
        beforeEndorsement: false,
        expectedExplanations: [
          "A : Ancienneté totale (5 ans)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula: "(0.34 * Sref * A) + (2 * Sref)",
        seniority: 5,
        seniorityRight: 5,
      },
      {
        age: 45,
        beforeEndorsement: false,
        expectedExplanations: [
          "A : Ancienneté totale (10 ans)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula: "0.38 * Sref * A",
        seniority: 10,
        seniorityRight: 10,
      },
      {
        age: 50,
        beforeEndorsement: false,
        expectedExplanations: [
          "A : Ancienneté totale (10 ans)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula: "(0.38 * Sref * A) + (1 * Sref)",
        seniority: 10,
        seniorityRight: 10,
      },
      {
        age: 55,
        beforeEndorsement: false,
        expectedExplanations: [
          "A : Ancienneté totale (10 ans)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula: "(0.38 * Sref * A) + (2 * Sref)",
        seniority: 10,
        seniorityRight: 10,
      },
      {
        age: 50,
        beforeEndorsement: false,
        expectedExplanations: [
          "A : Ancienneté totale (15 ans)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula: "(0.42 * Sref * A) + (1 * Sref)",
        seniority: 15,
        seniorityRight: 15,
      },
      {
        age: 55,
        beforeEndorsement: false,
        expectedExplanations: [
          "A : Ancienneté totale (15 ans)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula: "(0.42 * Sref * A) + (2 * Sref)",
        seniority: 15,
        seniorityRight: 15,
      },
      {
        age: 50,
        beforeEndorsement: false,
        expectedExplanations: [
          "A : Ancienneté totale (20 ans)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula: "(0.45 * Sref * A) + (1 * Sref)",
        seniority: 20,
        seniorityRight: 20,
      },
      {
        age: 55,
        beforeEndorsement: false,
        expectedExplanations: [
          "A : Ancienneté totale (20 ans)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula: "(0.45 * Sref * A) + (2 * Sref)",
        seniority: 20,
        seniorityRight: 20,
      },
      {
        age: 50,
        beforeEndorsement: false,
        expectedExplanations: [
          "A : Ancienneté totale (25 ans)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula: "(0.48 * Sref * A) + (1 * Sref)",
        seniority: 25,
        seniorityRight: 25,
      },
      {
        age: 55,
        beforeEndorsement: false,
        expectedExplanations: [
          "A : Ancienneté totale (25 ans)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula: "(0.48 * Sref * A) + (2 * Sref)",
        seniority: 25,
        seniorityRight: 25,
      },
      {
        age: 50,
        beforeEndorsement: false,
        expectedExplanations: [
          "A : Ancienneté totale (30 ans)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula: "(0.49 * Sref * A) + (1 * Sref)",
        seniority: 30,
        seniorityRight: 30,
      },
      {
        age: 55,
        beforeEndorsement: false,
        expectedExplanations: [
          "A : Ancienneté totale (30 ans)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula: "(0.49 * Sref * A) + (2 * Sref)",
        seniority: 30,
        seniorityRight: 30,
      },
      {
        age: 50,
        beforeEndorsement: false,
        expectedExplanations: [
          "A : Ancienneté totale (35 ans)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula: "(0.5 * Sref * A) + (1 * Sref)",
        seniority: 35,
        seniorityRight: 35,
      },
      {
        age: 55,
        beforeEndorsement: false,
        expectedExplanations: [
          "A : Ancienneté totale (35 ans)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula: "(0.5 * Sref * A) + (2 * Sref)",
        seniority: 35,
        seniorityRight: 35,
      },
      // Avant avenant
      {
        age: 45,
        beforeEndorsement: true,
        expectedExplanations: [
          "A: Années d'ancienneté à compter de la date d'entrée dans l'entreprise jusqu'à la veille des 5 ans (1 an)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula: "9 / 30 * Sref * A",
        seniority: 1,
        seniorityRight: 1,
      },
      {
        age: 45,
        beforeEndorsement: true,
        expectedExplanations: [
          "A1: Années d'ancienneté à compter de la date d'entrée dans l'entreprise jusqu'à la veille des 5 ans (5 ans)",
          "A2: Années pour la tranche de 5 ans et jusqu'à la veille des 10 ans d'ancienneté (1 an)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula: "(9 / 30 * Sref * A1) + (12 / 30 * Sref * A2)",
        seniority: 6,
        seniorityRight: 6,
      },
      {
        age: 45,
        beforeEndorsement: true,
        expectedExplanations: [
          "A1: Années d'ancienneté à compter de la date d'entrée dans l'entreprise jusqu'à la veille des 5 ans (5 ans)",
          "A2: Années pour la tranche de 5 ans et jusqu'à la veille des 10 ans d'ancienneté (5 ans)",
          "A3: Années pour la tranche de 10 ans et jusqu'à la veille des 15 ans d'ancienneté (1 an)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula:
          "(9 / 30 * Sref * A1) + (12 / 30 * Sref * A2) + (14 / 30 * Sref * A3)",
        seniority: 11,
        seniorityRight: 11,
      },
      {
        age: 50,
        beforeEndorsement: true,
        expectedExplanations: [
          "A: Années d'ancienneté à compter de la date d'entrée dans l'entreprise jusqu'à la veille des 5 ans (1 an)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula: "(9 / 30 * Sref * A) + (1 * Sref)",
        seniority: 1,
        seniorityRight: 1,
      },
      {
        age: 50,
        beforeEndorsement: true,
        expectedExplanations: [
          "A1: Années d'ancienneté à compter de la date d'entrée dans l'entreprise jusqu'à la veille des 5 ans (5 ans)",
          "A2: Années pour la tranche de 5 ans et jusqu'à la veille des 10 ans d'ancienneté (1 an)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula:
          "(9 / 30 * Sref * A1) + (12 / 30 * Sref * A2) + (1 * Sref)",
        seniority: 6,
        seniorityRight: 6,
      },
      {
        age: 50,
        beforeEndorsement: true,
        expectedExplanations: [
          "A1: Années d'ancienneté à compter de la date d'entrée dans l'entreprise jusqu'à la veille des 5 ans (5 ans)",
          "A2: Années pour la tranche de 5 ans et jusqu'à la veille des 10 ans d'ancienneté (5 ans)",
          "A3: Années pour la tranche de 10 ans et jusqu'à la veille des 15 ans d'ancienneté (1 an)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula:
          "(9 / 30 * Sref * A1) + (12 / 30 * Sref * A2) + (14 / 30 * Sref * A3) + (1 * Sref)",
        seniority: 11,
        seniorityRight: 11,
      },
      {
        age: 55,
        beforeEndorsement: true,
        expectedExplanations: [
          "A: Années d'ancienneté à compter de la date d'entrée dans l'entreprise jusqu'à la veille des 5 ans (1 an)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula: "(9 / 30 * Sref * A) + (2 * Sref)",
        seniority: 1,
        seniorityRight: 1,
      },
      {
        age: 55,
        beforeEndorsement: true,
        expectedExplanations: [
          "A1: Années d'ancienneté à compter de la date d'entrée dans l'entreprise jusqu'à la veille des 5 ans (5 ans)",
          "A2: Années pour la tranche de 5 ans et jusqu'à la veille des 10 ans d'ancienneté (1 an)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula:
          "(9 / 30 * Sref * A1) + (12 / 30 * Sref * A2) + (2 * Sref)",
        seniority: 6,
        seniorityRight: 6,
      },
      {
        age: 55,
        beforeEndorsement: true,
        expectedExplanations: [
          "A1: Années d'ancienneté à compter de la date d'entrée dans l'entreprise jusqu'à la veille des 5 ans (5 ans)",
          "A2: Années pour la tranche de 5 ans et jusqu'à la veille des 10 ans d'ancienneté (5 ans)",
          "A3: Années pour la tranche de 10 ans et jusqu'à la veille des 15 ans d'ancienneté (1 an)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula:
          "(9 / 30 * Sref * A1) + (12 / 30 * Sref * A2) + (14 / 30 * Sref * A3) + (2 * Sref)",
        seniority: 11,
        seniorityRight: 11,
      },
      {
        age: 50,
        beforeEndorsement: true,
        expectedExplanations: [
          "A1: Années d'ancienneté à compter de la date d'entrée dans l'entreprise jusqu'à la veille des 5 ans (5 ans)",
          "A2: Années pour la tranche de 5 ans et jusqu'à la veille des 10 ans d'ancienneté (5 ans)",
          "A3: Années pour la tranche de 10 ans et jusqu'à la veille des 15 ans d'ancienneté (5 ans)",
          "A4: Années pour la tranche de 15 ans et jusqu'à la veille des 20 ans d'ancienneté (1 an)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula:
          "(9 / 30 * Sref * A1) + (12 / 30 * Sref * A2) + (14 / 30 * Sref * A3) + (16 / 30 * Sref * A4) + (1 * Sref)",
        seniority: 16,
        seniorityRight: 16,
      },
      {
        age: 50,
        beforeEndorsement: true,
        expectedExplanations: [
          "A1: Années d'ancienneté à compter de la date d'entrée dans l'entreprise jusqu'à la veille des 5 ans (5 ans)",
          "A2: Années pour la tranche de 5 ans et jusqu'à la veille des 10 ans d'ancienneté (5 ans)",
          "A3: Années pour la tranche de 10 ans et jusqu'à la veille des 15 ans d'ancienneté (5 ans)",
          "A4: Années pour la tranche de 15 ans et jusqu'à la veille des 20 ans d'ancienneté (5 ans)",
          "A5: Années pour la tranche à partir de 20 ans d'ancienneté (1 an)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula:
          "(9 / 30 * Sref * A1) + (12 / 30 * Sref * A2) + (14 / 30 * Sref * A3) + (16 / 30 * Sref * A4) + (18 / 30 * Sref * A5) + (1 * Sref)",
        seniority: 21,
        seniorityRight: 21,
      },
      {
        age: 55,
        beforeEndorsement: true,
        expectedExplanations: [
          "A1: Années d'ancienneté à compter de la date d'entrée dans l'entreprise jusqu'à la veille des 5 ans (5 ans)",
          "A2: Années pour la tranche de 5 ans et jusqu'à la veille des 10 ans d'ancienneté (5 ans)",
          "A3: Années pour la tranche de 10 ans et jusqu'à la veille des 15 ans d'ancienneté (5 ans)",
          "A4: Années pour la tranche de 15 ans et jusqu'à la veille des 20 ans d'ancienneté (1 an)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula:
          "(9 / 30 * Sref * A1) + (12 / 30 * Sref * A2) + (14 / 30 * Sref * A3) + (16 / 30 * Sref * A4) + (2 * Sref)",
        seniority: 16,
        seniorityRight: 16,
      },
      {
        age: 55,
        beforeEndorsement: true,
        expectedExplanations: [
          "A1: Années d'ancienneté à compter de la date d'entrée dans l'entreprise jusqu'à la veille des 5 ans (5 ans)",
          "A2: Années pour la tranche de 5 ans et jusqu'à la veille des 10 ans d'ancienneté (5 ans)",
          "A3: Années pour la tranche de 10 ans et jusqu'à la veille des 15 ans d'ancienneté (5 ans)",
          "A4: Années pour la tranche de 15 ans et jusqu'à la veille des 20 ans d'ancienneté (5 ans)",
          "A5: Années pour la tranche à partir de 20 ans d'ancienneté (1 an)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula:
          "(9 / 30 * Sref * A1) + (12 / 30 * Sref * A2) + (14 / 30 * Sref * A3) + (16 / 30 * Sref * A4) + (18 / 30 * Sref * A5) + (2 * Sref)",
        seniority: 21,
        seniorityRight: 21,
      },
    ])(
      "Avec une ancienneté $seniority ans, un age de $age et avant avenant $beforeEndorsement => une formule $expectedFormula",
      ({
        seniorityRight,
        expectedExplanations,
        expectedFormula,
        seniority,
        age,
        beforeEndorsement,
      }) => {
        engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0176'",
            "contrat salarié . convention collective . industrie pharmaceutique . age":
              age.toString(),
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority.toString(),
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight.toString(),
            "contrat salarié . indemnité de licenciement . date d'entrée":
              beforeEndorsement ? "01/06/2019" : "01/07/2019",
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              "3000",
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );

        const formule = engine.getFormule();

        expect(formule.formula).toEqual(expectedFormula);
        expect(formule.explanations).toEqual(expectedExplanations);
      }
    );
  });
});
