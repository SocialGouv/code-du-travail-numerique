import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "275"
);

describe("Vérification des références juridiques pour la CC 275", () => {
  describe("Avant le 31/01/2024", () => {
    describe("Non cadres", () => {
      const references = [
        {
          article: "Article 20",
          url: "https://www.legifrance.gouv.fr/conv_coll/id/KALISCTA000005732500/?idConteneur=KALICONT000005635872",
        },
        {
          article: "Article 35",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000026343716?idConteneur=KALICONT000005635872&origin=list#KALIARTI000026343716",
        },
      ];

      test.each`
        seniority | expectedReferences
        ${5}      | ${references}
        ${10}     | ${references}
        ${15}     | ${references}
        ${20}     | ${references}
        ${25}     | ${references}
      `(
        "avec une ancienneté de $seniority ans",
        ({ seniority, expectedReferences }) => {
          engine.setSituation({
            "contrat salarié . convention collective": "'IDCC0275'",
            "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle":
              "'Non-cadres'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniority,
            "contrat salarié . indemnité de licenciement . date de notification":
              "30/01/2024",
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              "1000",
          });
          const result = engine.getReferences("résultat conventionnel");

          expect(result).toHaveLength(expectedReferences.length);
          expect(result).toEqual(expect.arrayContaining(expectedReferences));
        }
      );
    });

    describe("Cadres", () => {
      const references = [
        {
          article: "Article 20",
          url: "https://www.legifrance.gouv.fr/conv_coll/id/KALISCTA000005732500/?idConteneur=KALICONT000005635872",
        },
        {
          article: "Article 35",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000026343716?idConteneur=KALICONT000005635872&origin=list#KALIARTI000026343716",
        },
      ];

      test.each`
        seniority | expectedReferences | age
        ${5}      | ${references}      | ${50}
        ${5}      | ${references}      | ${55}
        ${5}      | ${references}      | ${56}
        ${10}     | ${references}      | ${50}
        ${10}     | ${references}      | ${55}
        ${10}     | ${references}      | ${56}
        ${15}     | ${references}      | ${50}
        ${15}     | ${references}      | ${55}
        ${15}     | ${references}      | ${56}
        ${20}     | ${references}      | ${50}
        ${20}     | ${references}      | ${55}
        ${20}     | ${references}      | ${56}
      `(
        "avec une ancienneté de $seniority ans et age de $age ans",
        ({ seniority, expectedReferences, age }) => {
          engine.setSituation({
            "contrat salarié . convention collective": "'IDCC0275'",
            "contrat salarié . convention collective . transport aérien personnel au sol . age":
              age.toString(),
            "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle":
              "'Cadres'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniority,
            "contrat salarié . indemnité de licenciement . date de notification":
              "30/01/2024",
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              "1000",
          });
          const result = engine.getReferences("résultat conventionnel");

          expect(result).toHaveLength(expectedReferences.length);
          expect(result).toEqual(expect.arrayContaining(expectedReferences));
        }
      );
    });
  });

  describe("A partir du 31/01/2024", () => {
    describe("Non cadres", () => {
      const references = [
        {
          article: "Article 20",
          url: "https://www.legifrance.gouv.fr/conv_coll/id/KALISCTA000005732500/?idConteneur=KALICONT000005635872",
        },
        {
          article: "Article 35",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000026343716?idConteneur=KALICONT000005635872&origin=list#KALIARTI000026343716",
        },
      ];

      test.each`
        seniority | expectedReferences
        ${5}      | ${references}
        ${10}     | ${references}
        ${15}     | ${references}
        ${20}     | ${references}
        ${25}     | ${references}
      `(
        "avec une ancienneté de $seniority ans",
        ({ seniority, expectedReferences }) => {
          engine.setSituation({
            "contrat salarié . convention collective": "'IDCC0275'",
            "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle":
              "'Non-cadres'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniority,
            "contrat salarié . indemnité de licenciement . date de notification":
              "31/01/2024",
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              "1000",
          });
          const result = engine.getReferences("résultat conventionnel");

          expect(result).toHaveLength(expectedReferences.length);
          expect(result).toEqual(expect.arrayContaining(expectedReferences));
        }
      );
    });

    describe("Cadres", () => {
      const references = [
        {
          article: "Article 20",
          url: "https://www.legifrance.gouv.fr/conv_coll/id/KALISCTA000005732500/?idConteneur=KALICONT000005635872",
        },
        {
          article: "Article 35",
          url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000026343716?idConteneur=KALICONT000005635872&origin=list#KALIARTI000026343716",
        },
      ];

      test.each`
        seniority | expectedReferences | age
        ${5}      | ${references}      | ${50}
        ${5}      | ${references}      | ${55}
        ${5}      | ${references}      | ${56}
        ${10}     | ${references}      | ${50}
        ${10}     | ${references}      | ${55}
        ${10}     | ${references}      | ${56}
        ${15}     | ${references}      | ${50}
        ${15}     | ${references}      | ${55}
        ${15}     | ${references}      | ${56}
        ${20}     | ${references}      | ${50}
        ${20}     | ${references}      | ${55}
        ${20}     | ${references}      | ${56}
      `(
        "avec une ancienneté de $seniority ans et age de $age ans",
        ({ seniority, expectedReferences, age }) => {
          engine.setSituation({
            "contrat salarié . convention collective": "'IDCC0275'",
            "contrat salarié . convention collective . transport aérien personnel au sol . age":
              age.toString(),
            "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle":
              "'Cadres'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniority,
            "contrat salarié . indemnité de licenciement . date de notification":
              "31/01/2024",
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              "1000",
          });
          const result = engine.getReferences("résultat conventionnel");

          expect(result).toHaveLength(expectedReferences.length);
          expect(result).toEqual(expect.arrayContaining(expectedReferences));
        }
      );
    });
  });
});
