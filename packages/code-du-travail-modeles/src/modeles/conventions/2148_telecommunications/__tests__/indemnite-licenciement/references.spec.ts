import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2148"
);

const References = [
  {
    article: "Article 4.4.1",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000022416125?idConteneur=KALICONT000005635557",
  },
];

describe("Vérification des références juridiques pour la CC 2148", () => {
  test.each`
    seniority | age   | expectedReferences
    ${5}      | ${38} | ${References}
    ${9}      | ${38} | ${References}
    ${27}     | ${38} | ${References}
    ${5}      | ${50} | ${References}
    ${9}      | ${50} | ${References}
    ${27}     | ${50} | ${References}
  `(
    "pour un employé ($age ans) avec une ancienneté de $seniority mois",
    ({ seniority, age, expectedReferences }) => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC2148'",
        "contrat salarié . convention collective . télécommunications . age":
          age,
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
