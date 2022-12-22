import { getReferences } from "../../../../common";

const References = [
  {
    article: "Article 33",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005873155/?idConteneur=KALICONT000005635886",
  },
];

describe("Vérification des références juridiques pour la CC 843", () => {
  test.each`
    seniority | expectedReferences
    ${5}      | ${References}
    ${6}      | ${References}
    ${24}     | ${References}
  `(
    "pour un employé avec une ancienneté de $seniority mois",
    ({ seniority, expectedReferences }) => {
      const result = getReferences(
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0843'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . ancienneté requise en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
        }),
        "résultat conventionnel"
      );

      expect(result).toHaveLength(expectedReferences.length);
      expect(result).toEqual(expect.arrayContaining(expectedReferences));
    }
  );
});
