import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../../../internal/merger";
import { getReferences } from "../../../../common";

const engine = new Engine(mergeIndemniteLicenciementModels());

const references = [
  {
    article: "Article 32",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALISCTA000005747401/?idConteneur=KALICONT000005635534",
  },
];

describe("Indemnité conventionnel de licenciement pour la CC 1979", () => {
  test.each`
    seniority | salary
    ${2}      | ${2000}
    ${5}      | ${2000}
    ${8}      | ${2000}
    ${15}     | ${2000}
    ${2}      | ${1400}
    ${10}     | ${2400}
    ${11}     | ${2350}
  `(
    "ancienneté: $seniority an, salaire de référence: $salary",
    ({ seniority, salary }) => {
      const situation = engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1979'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
      });

      const result = getReferences(situation, "résultat conventionnel");

      expect(result).toHaveLength(references.length);
      expect(result).toEqual(expect.arrayContaining(references));
    }
  );
});
