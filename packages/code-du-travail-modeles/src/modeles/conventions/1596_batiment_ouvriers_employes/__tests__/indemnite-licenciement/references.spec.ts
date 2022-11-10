import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../../../internal/merger";
import { getReferences } from "../../../../common";

const engine = new Engine(mergeIndemniteLicenciementModels());

const references = [
  {
    article: "Article 10.3",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005778355?idConteneur=KALICONT000005635221#KALIARTI000005778355",
  },
  {
    article: "Article 10.4",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005778357?idConteneur=KALICONT000005635221#KALIARTI000005778357",
  },
  {
    article: "Article 10.5",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005778358?idConteneur=KALICONT000005635221#KALIARTI000005778358",
  },
];

describe("Références juridique pour l'indemnité conventionnel de licenciement pour la CC 1596", () => {
  describe("Cas standard", () => {
    test.each`
      age     | seniority | salary
      ${"54"} | ${0}      | ${2000}
      ${"56"} | ${0}      | ${2000}
      ${"54"} | ${2}      | ${2000}
      ${"56"} | ${2}      | ${2000}
      ${"54"} | ${5}      | ${2000}
      ${"56"} | ${5}      | ${2000}
      ${"54"} | ${20}     | ${2800}
      ${"56"} | ${20}     | ${2800}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, age $age",
      ({ seniority, salary, age }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC1596'",
          "contrat salarié . convention collective . batiment ouvriers employés . indemnité de licenciement . age":
            parseFloat(age),
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            salary,
        });

        const result = getReferences(situation, "résultat conventionnel");

        expect(result).toHaveLength(references.length);
        expect(result).toEqual(expect.arrayContaining(references));
      }
    );
  });

  describe("Cas complexe", () => {
    test.each`
      moreThan55 | seniority | salary
      ${"Non"}   | ${0}      | ${2000}
      ${"Oui"}   | ${0}      | ${2000}
      ${"Non"}   | ${2}      | ${2000}
      ${"Oui"}   | ${2}      | ${2000}
      ${"Non"}   | ${5}      | ${2000}
      ${"Oui"}   | ${5}      | ${2000}
      ${"Non"}   | ${6}      | ${2000}
      ${"Oui"}   | ${6}      | ${2000}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary",
      ({ seniority, salary, moreThan55 }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC1596'",
          "contrat salarié . convention collective . batiment ouvriers employés . indemnité de licenciement . age":
            "55",
          "contrat salarié . convention collective . batiment ouvriers employés . indemnité de licenciement . age plus de 55 ans": `'${moreThan55}'`,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            salary,
        });

        const result = getReferences(situation, "résultat conventionnel");

        expect(result).toHaveLength(references.length);
        expect(result).toEqual(expect.arrayContaining(references));
      }
    );
  });
});
