import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1606"
);

const References = [
  {
    article: "Article 9.2.4",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005870734?idConteneur=KALICONT000005635871",
  },
];
const ReferencesCadres50 = [
  {
    article: "Article 9.2.4",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005870734?idConteneur=KALICONT000005635871",
  },
  {
    article: "Article 10 de l'Annexe Cadres",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005870788?idConteneur=KALICONT000005635871",
  },
];

describe("Vérification des références juridiques pour la CC 2511", () => {
  test.each`
    age   | catPro            | expectedReferences
    ${24} | ${"'Cadres'"}     | ${References}
    ${24} | ${"'Non-Cadres'"} | ${References}
    ${50} | ${"'Cadres'"}     | ${ReferencesCadres50}
    ${50} | ${"'Non-Cadres'"} | ${References}
  `(
    "pour un $catPro avec une age de $age ans",
    ({ catPro, age, expectedReferences }) => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1606'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          "3",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          "3",
        "contrat salarié . convention collective . bricolage . catégorie professionnelle":
          catPro,
        "contrat salarié . convention collective . bricolage . indemnité de licenciement . cadres . age":
          age,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "1000",
      });
      const result = engine.getReferences("résultat conventionnel");

      expect(result).toHaveLength(expectedReferences.length);
      expect(result).toEqual(expect.arrayContaining(expectedReferences));
    }
  );
});
