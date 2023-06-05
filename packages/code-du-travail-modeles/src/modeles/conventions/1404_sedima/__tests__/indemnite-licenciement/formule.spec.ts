import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1404"
);

describe("Calcul de l'indemnité de licenciement pour CC 1404", () => {
  describe("CDI classique", () => {
    test.each([
      {
        expectedExplanations: [
          "A : Ancienneté totale (≈ 0.67 an : valeur arrondie)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula: "1/4 * Sref * A",
        seniority: 8 / 12,
        seniorityRight: 8 / 12,
      },
      {
        expectedExplanations: [
          "A1 : Ancienneté jusqu'à 10 ans (10 ans)",
          "A2 : Ancienneté au-delà de 10 ans (2 ans)",
          "Sref : Salaire de référence (3000 €)",
        ],
        expectedFormula: "(1/4 * Sref * A1) + (1/3 * Sref * A2)",
        seniority: 12,
        seniorityRight: 12,
      },
    ])(
      "Avec une ancienneté $seniority ans (plus $seniorityEmployeTAM en tant que non cadre), droit de retraite: $haveRightToRetirement, un salaire de référence $salaireRef € et un age de $age => une compensation de base de $expectedCompensation €",
      ({
        seniorityRight,
        expectedExplanations,
        expectedFormula,
        seniority,
      }) => {
        engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1404'",
            "contrat salarié . convention collective . sedima . question cdi opération":
              "'Non'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority.toString(),
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight.toString(),
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
  describe("CDI opération", () => {
    describe("moins de 6 mois", () => {
      test.each([
        {
          expectedExplanations: [
            "Sref : Total des salaires bruts perçus depuis le début de l'engagement (3000 €)",
          ],
          expectedFormula: "(10% * Sref)",
          seniority: 0.25,
          seniorityRight: 0.25,
        },
        {
          expectedExplanations: [
            "Sref : Total des salaires bruts perçus depuis le début de l'engagement (3000 €)",
          ],
          expectedFormula: "(10% * Sref)",
          seniority: 0.41,
          seniorityRight: 0.41,
        },
      ])(
        "Avec une ancienneté $seniority ans (plus $seniorityEmployeTAM en tant que non cadre), droit de retraite: $haveRightToRetirement, un salaire de référence $salaireRef € et un age de $age => une compensation de base de $expectedCompensation €",
        ({
          seniorityRight,
          expectedExplanations,
          expectedFormula,
          seniority,
        }) => {
          engine.setSituation(
            {
              "contrat salarié . convention collective": "'IDCC1404'",
              "contrat salarié . convention collective . sedima . cdi opération . moins de 6 mois . question période essai":
                "'Non'",
              "contrat salarié . convention collective . sedima . cdi opération . moins de 6 mois . salaires total":
                "3000",
              "contrat salarié . convention collective . sedima . question cdi opération":
                "'Oui'",
              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
                seniority.toString(),
              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
                seniorityRight.toString(),
            },
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
          const formule = engine.getFormule();

          expect(formule.formula).toEqual(expectedFormula);
          expect(formule.explanations).toEqual(expectedExplanations);
        }
      );
    });

    describe("plus de 6 mois", () => {
      test.each([
        {
          expectedExplanations: [
            "Sref : Total des salaires bruts perçus pendant la 1ère année du contrat (3000 €)",
          ],
          expectedFormula: "(8% * Sref)",
          seniority: 0.67,
          seniorityRight: 0.67,
        },
        {
          expectedExplanations: [
            "Sref1 : Total des salaires bruts perçus pendant la 1ère année du contrat (3000 €)",
            "Sref2 : Total des salaires bruts perçus pendant la 2ème année du contrat (3000 €)",
          ],
          expectedFormula: "(8% * Sref1) + (6% * Sref2)",
          seniority: 1.67,
          seniorityRight: 1.67,
        },
        {
          expectedExplanations: [
            "Sref1 : Total des salaires bruts perçus pendant la 1ère année du contrat (3000 €)",
            "Sref2 : Total des salaires bruts perçus pendant la 2ème année du contrat (3000 €)",
            "Sref3 : Total des salaires bruts perçus de la 3ème année jusqu'à la fin du contrat (3000 €)",
          ],
          expectedFormula: "(8% * Sref1) + (6% * Sref2) + (4% * Sref3)",
          seniority: 2.67,
          seniorityRight: 2.67,
        },
      ])(
        "Avec une ancienneté $seniority ans (plus $seniorityEmployeTAM en tant que non cadre), droit de retraite: $haveRightToRetirement, un salaire de référence $salaireRef € et un age de $age => une compensation de base de $expectedCompensation €",
        ({
          seniorityRight,
          expectedExplanations,
          expectedFormula,
          seniority,
        }) => {
          engine.setSituation(
            {
              "contrat salarié . convention collective": "'IDCC1404'",
              "contrat salarié . convention collective . sedima . cdi opération . durée":
                (seniorityRight * 12).toString(),
              "contrat salarié . convention collective . sedima . cdi opération . plus de 6 mois . salaires 1e année":
                "3000",
              "contrat salarié . convention collective . sedima . cdi opération . plus de 6 mois . salaires 2e année":
                "3000",
              "contrat salarié . convention collective . sedima . cdi opération . plus de 6 mois . salaires 3e année et plus":
                "3000",
              "contrat salarié . convention collective . sedima . question cdi opération":
                "'Oui'",
              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
                seniority.toString(),
              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
                seniorityRight.toString(),
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
});
