import { getReferences } from "../../../../common";

const References = [
  {
    article: "Article 4.4.3.3",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000042110557?idConteneur=KALICONT000017577652",
  },
  {
    article: "Article 7.1.2",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000042110596/?idConteneur=KALICONT000017577652&origin=list",
  },
];

describe("Vérification des références juridiques pour la CC 2511", () => {
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
          "contrat salarié . convention collective": "'IDCC2511'",
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
