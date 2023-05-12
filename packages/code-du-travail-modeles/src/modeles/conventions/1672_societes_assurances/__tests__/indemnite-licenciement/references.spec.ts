import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1672"
);

describe("Vérification des références juridiques pour la CC 1672", () => {
  describe("Non cadres", () => {
    const references = [
      {
        article: "Article 92",
        url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005792103?idConteneur=KALICONT000005635918",
      },
      {
        article: "Article 35 b.4",
        url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005792023?idConteneur=KALICONT000005635918&origin=list#KALIARTI000005792023",
      },
      {
        article: "Article 86.e",
        url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005792094?idConteneur=KALICONT000005635918&origin=list#KALIARTI000005792094",
      },
    ];

    test.each`
      seniority | expectedReferences
      ${4}      | ${references}
      ${15}     | ${references}
      ${35}     | ${references}
    `(
      "avec une ancienneté de $seniority ans",
      ({ seniority, expectedReferences }) => {
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC1672'",
          "contrat salarié . convention collective . sociétés d'assurances . age":
            "49",
          "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
            "'Non-cadres (Classes 1 à 4)'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "20000",
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
        article:
          'Point 8 de la Convention collective nationale du 27 mai 1992 relative aux dispositions particulières "Cadres"',
        url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005792103?idConteneur=KALICONT000005635918",
      },
      {
        article: "Article 35 b.4",
        url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005792023?idConteneur=KALICONT000005635918&origin=list#KALIARTI000005792023",
      },
      {
        article: "Article 86.e",
        url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005792094?idConteneur=KALICONT000005635918&origin=list#KALIARTI000005792094",
      },
    ];

    test.each`
      seniority | seniorityNonCadre | expectedReferences
      ${4}      | ${0}              | ${references}
      ${15}     | ${0}              | ${references}
      ${35}     | ${0}              | ${references}
      ${4}      | ${3}              | ${references}
      ${15}     | ${10}             | ${references}
      ${35}     | ${20}             | ${references}
    `(
      "avec une ancienneté de $seniority ans",
      ({ seniority, seniorityNonCadre, expectedReferences }) => {
        const dateCadre =
          seniorityNonCadre > 0
            ? {
                "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . date du statut cadre":
                  "01/01/2010",
              }
            : {};
        const situation = {
          "contrat salarié . convention collective": "'IDCC1672'",
          "contrat salarié . convention collective . sociétés d'assurances . age":
            "49",
          "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle":
            "'Cadres (Classes 5 à 7)'",
          "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . ancienneté cadre":
            seniority,
          "contrat salarié . convention collective . sociétés d'assurances . catégorie professionnelle . cadres . avant non cadres": `${
            seniorityNonCadre > 0 ? "'Oui'" : "'Non'"
          }`,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniorityNonCadre,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "20000",
          ...dateCadre,
        };
        engine.setSituation(situation);
        const result = engine.getReferences("résultat conventionnel");

        expect(result).toHaveLength(expectedReferences.length);
        expect(result).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });
});
