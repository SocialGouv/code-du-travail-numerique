import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1740"
);

const refs = [
  {
    article: "Article 1.1.10 a",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005800999?idConteneur=KALICONT000005635685",
  },
  {
    article: "Article 1.1.10 c",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005801001?idConteneur=KALICONT000005635685",
  },
  {
    article: "Article 1.10.b",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005801000?idConteneur=KALICONT000005635685&origin=list#KALIARTI000005801000",
  },
];

describe("CC 1740", () => {
  describe("Références juridiques", () => {
    test.each`
      seniorityRight | seniority | age   | salaireRef | expectedRefs
      ${2}           | ${2}      | ${55} | ${2500}    | ${refs}
      ${2}           | ${5}      | ${55} | ${2500}    | ${refs}
      ${2}           | ${8}      | ${55} | ${2500}    | ${refs}
      ${2}           | ${15}     | ${55} | ${2500}    | ${refs}
      ${2}           | ${26}     | ${55} | ${2500}    | ${refs}
      ${2}           | ${2}      | ${59} | ${2500}    | ${refs}
      ${2}           | ${5}      | ${59} | ${2500}    | ${refs}
      ${2}           | ${8}      | ${59} | ${2500}    | ${refs}
      ${2}           | ${15}     | ${59} | ${2500}    | ${refs}
      ${2}           | ${26}     | ${59} | ${2500}    | ${refs}
    `(
      "Avec une ancienneté $seniority ans, age: $age, un salaire de référence $salaireRef € => $expectedRefs",
      ({ age, salaireRef, expectedRefs, seniority, seniorityRight }) => {
        engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1740'",
            "contrat salarié . convention collective . ouvriers bâtiment région parisienne . age":
              age,
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

        expect(result).toHaveLength(expectedRefs.length);
        expect(result).toEqual(expect.arrayContaining(expectedRefs));
      }
    );
  });
});
