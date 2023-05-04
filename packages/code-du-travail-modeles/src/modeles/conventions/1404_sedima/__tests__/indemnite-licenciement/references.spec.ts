import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1404"
);

describe("Vérification des références juridiques pour la CC 1404", () => {
  describe("CDI classique", () => {
    const references = [
      {
        article: "Article 3.42",
        url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039412125?idConteneur=KALICONT000005635653",
      },
      {
        article: "Article 6.51",
        url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039412129?idConteneur=KALICONT000005635653",
      },
      {
        article: "Article 0.21",
        url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000026355951?idConteneur=KALICONT000005635653&origin=list#KALIARTI000026355951",
      },
    ];
    test.each`
      seniorityRight | seniority | salaireRef
      ${8 / 12}      | ${8 / 12} | ${2400}
    `(
      "Avec une ancienneté $seniority ans (plus $seniorityEmployeTAM en tant que non cadre), droit de retraite: $haveRightToRetirement, un salaire de référence $salaireRef € et un age de $age => une compensation de base de $expectedCompensation €",
      ({ seniorityRight, salaireRef, seniority }) => {
        engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1404'",
            "contrat salarié . convention collective . sedima . question cdi opération":
              "'Non'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salaireRef,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );

        const result = engine.getReferences("résultat conventionnel");
        expect(result).toHaveLength(references.length);
        expect(result).toEqual(expect.arrayContaining(references));
      }
    );
  });
  describe("CDI opération", () => {
    describe("Mission impossible", () => {
      const references = [
        {
          article: "Article 4 de l'accord du 5 juillet 2019",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041459011?idConteneur=KALICONT000005635653",
        },
        {
          article: "Article 0.21",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000026355951?idConteneur=KALICONT000005635653&origin=list#KALIARTI000026355951",
        },
      ];
      test.each`
        seniorityRight | seniority | salaireRef
        ${0.25}        | ${0.25}   | ${7749}
        ${0.41}        | ${0.41}   | ${12280}
      `(
        "Avec une ancienneté $seniority ans (plus $seniorityEmployeTAM en tant que non cadre), droit de retraite: $haveRightToRetirement, un salaire de référence $salaireRef € et un age de $age => une compensation de base de $expectedCompensation €",
        ({ seniorityRight, salaireRef, seniority }) => {
          engine.setSituation(
            {
              "contrat salarié . convention collective": "'IDCC1404'",
              "contrat salarié . convention collective . sedima . cdi opération . mission impossible . question période essai":
                "'Non'",
              "contrat salarié . convention collective . sedima . cdi opération . mission impossible . salaires total":
                salaireRef,
              "contrat salarié . convention collective . sedima . cdi opération . question mission impossible":
                "'Oui'",
              "contrat salarié . convention collective . sedima . question cdi opération":
                "'Oui'",
              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
                seniority,
              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
                seniorityRight,
            },
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );

          const result = engine.getReferences("résultat conventionnel");
          expect(result).toHaveLength(references.length);
          expect(result).toEqual(expect.arrayContaining(references));
        }
      );
    });

    describe("Mission possible", () => {
      const references = [
        {
          article: "Article 3 de l’accord du 5 juillet 2019",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041459010?idConteneur=KALICONT000005635653",
        },
        {
          article: "Article 0.21",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000026355951?idConteneur=KALICONT000005635653&origin=list#KALIARTI000026355951",
        },
      ];
      test.each`
        seniorityRight | seniority | salaire1 | salaire2     | salaire3
        ${0.67}        | ${0.67}   | ${20296} | ${undefined} | ${undefined}
        ${2.5}         | ${2.5}    | ${29899} | ${29834}     | ${15297}
      `(
        "Avec une ancienneté $seniority ans (plus $seniorityEmployeTAM en tant que non cadre), droit de retraite: $haveRightToRetirement, un salaire de référence $salaireRef € et un age de $age => une compensation de base de $expectedCompensation €",
        ({ seniorityRight, salaire1, salaire2, salaire3, seniority }) => {
          const salarySituation: Record<string, number> = {
            "contrat salarié . convention collective . sedima . cdi opération . mission possible . salaires 1e année":
              salaire1,
          };
          if (salaire2) {
            salarySituation[
              "contrat salarié . convention collective . sedima . cdi opération . mission possible . salaires 2e année"
            ] = salaire2;
          }
          if (salaire3) {
            salarySituation[
              "contrat salarié . convention collective . sedima . cdi opération . mission possible . salaires 3e année et plus"
            ] = salaire3;
          }
          engine.setSituation(
            {
              ...salarySituation,
              "contrat salarié . convention collective": "'IDCC1404'",
              "contrat salarié . convention collective . sedima . cdi opération . mission possible . durée":
                (seniorityRight * 12).toString(),
              "contrat salarié . convention collective . sedima . cdi opération . mission possible . salaires 1e année":
                "3000",
              "contrat salarié . convention collective . sedima . cdi opération . mission possible . salaires 2e année":
                "3000",
              "contrat salarié . convention collective . sedima . cdi opération . mission possible . salaires 3e année et plus":
                "3000",
              "contrat salarié . convention collective . sedima . cdi opération . question mission impossible":
                "'Non'",
              "contrat salarié . convention collective . sedima . question cdi opération":
                "'Oui'",
              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
                seniority,
              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
                seniorityRight,
            },
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );

          const refs = engine.getReferences("résultat conventionnel");
          expect(refs).toHaveLength(references.length);
          expect(refs).toEqual(expect.arrayContaining(references));
        }
      );
    });
  });
});
