import { getReferences } from "../../../../common";

const References = [
  {
    article: "Article 33",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000042096651?idConteneur=KALICONT000005635413",
  },
  {
    article: "Article 23",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000042096676?idConteneur=KALICONT000005635413&origin=list#KALIARTI000042096676",
  },
  {
    article: "Article 41",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000042096630?idConteneur=KALICONT000005635413&origin=list#KALIARTI000042096630",
  },
  {
    article: "Article 37.3.1",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000042096638?idConteneur=KALICONT000005635413&origin=list#KALIARTI000042096638",
  },
];

describe("Vérification des références juridiques pour la CC 1527", () => {
  test.each`
    seniority | inaptitude | expectedReferences
    ${5}      | ${"non"}   | ${References}
    ${5}      | ${"oui"}   | ${References}
    ${6}      | ${"non"}   | ${References}
    ${6}      | ${"oui"}   | ${References}
    ${24}     | ${"non"}   | ${References}
    ${24}     | ${"oui"}   | ${References}
  `(
    "pour un employé avec une ancienneté de $seniority mois",
    ({ seniority, inaptitude, expectedReferences }) => {
      const result = getReferences(
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC1527'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année": seniority,
          "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle": inaptitude,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
        }),
        "résultat conventionnel"
      );

      expect(result).toHaveLength(expectedReferences.length);
      expect(result).toEqual(expect.arrayContaining(expectedReferences));
    }
  );
});
