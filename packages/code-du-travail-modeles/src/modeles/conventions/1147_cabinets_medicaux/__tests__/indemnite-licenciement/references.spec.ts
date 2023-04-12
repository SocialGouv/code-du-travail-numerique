import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1147"
);

const References = [
  {
    article: "Article 25",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000027745280/?idConteneur=KALICONT000005635409",
  },
  {
    article: "Article 13",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005856073?idConteneur=KALICONT000005635409&origin=list#KALIARTI000005856073",
  },
];

describe("Vérification des références juridiques pour la CC 1147", () => {
  test.each`
    seniority | expectedReferences
    ${0.67}   | ${[]}
    ${1}      | ${[]}
    ${1.08}   | ${References}
    ${10}     | ${References}
    ${11}     | ${References}
  `(
    "pour un employé avec une ancienneté de $seniority mois",
    ({ seniority, expectedReferences }) => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1147'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          seniority,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          seniority,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "1000",
      });
      const result = engine.getReferences("résultat conventionnel");

      expect(result).toHaveLength(expectedReferences.length);
      expect(result).toEqual(expect.arrayContaining(expectedReferences));
    }
  );
});
