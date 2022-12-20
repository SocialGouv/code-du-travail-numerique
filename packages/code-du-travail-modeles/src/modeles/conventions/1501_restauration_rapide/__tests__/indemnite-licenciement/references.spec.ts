import { getReferences } from "../../../../common";

describe("Références juridique pour l'indemnité conventionnel de licenciement pour la CC 1501", () => {
  test.each`
    category        | age   | seniority  | salary  | economicFiring
    ${"Non-cadres"} | ${50} | ${7}       | ${2600} | ${"Oui"}
    ${"Non-cadres"} | ${50} | ${13}      | ${2600} | ${"Oui"}
    ${"Non-cadres"} | ${50} | ${16}      | ${2600} | ${"Oui"}
    ${"Non-cadres"} | ${55} | ${7}       | ${2600} | ${"Oui"}
    ${"Non-cadres"} | ${55} | ${13}      | ${2600} | ${"Oui"}
    ${"Non-cadres"} | ${55} | ${16}      | ${2600} | ${"Oui"}
    ${"Cadres"}     | ${48} | ${11 / 12} | ${3100} | ${"Oui"}
    ${"Cadres"}     | ${48} | ${1}       | ${3100} | ${"Oui"}
    ${"Cadres"}     | ${48} | ${5}       | ${3100} | ${"Oui"}
    ${"Cadres"}     | ${48} | ${23}      | ${3100} | ${"Oui"}
    ${"Cadres"}     | ${51} | ${11 / 12} | ${3100} | ${"Oui"}
    ${"Cadres"}     | ${51} | ${1}       | ${3100} | ${"Oui"}
    ${"Cadres"}     | ${51} | ${5}       | ${3100} | ${"Oui"}
    ${"Cadres"}     | ${51} | ${23}      | ${3100} | ${"Oui"}
    ${"Non-cadres"} | ${50} | ${3}       | ${2300} | ${"Non"}
    ${"Non-cadres"} | ${50} | ${15}      | ${2300} | ${"Non"}
    ${"Non-cadres"} | ${50} | ${17}      | ${2300} | ${"Non"}
    ${"Cadres"}     | ${50} | ${11 / 12} | ${3100} | ${"Non"}
    ${"Cadres"}     | ${50} | ${1}       | ${3100} | ${"Non"}
    ${"Cadres"}     | ${50} | ${5}       | ${3100} | ${"Non"}
    ${"Cadres"}     | ${50} | ${23}      | ${3100} | ${"Non"}
  `(
    "licenciement eco: $economicFiring, ancienneté: $seniority an, salaire de référence: $salary, age: $age an, catégorie $category",
    ({ seniority, salary, economicFiring, category, age }) => {
      const situation = engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1501'",
        "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
        "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . licenciement économique": `'${economicFiring}'`,
        "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . licenciement économique . age": age,
        "contrat salarié . indemnité de licenciement": "oui",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
      });

      const result = getReferences(situation, "résultat conventionnel");

      expect(result).toHaveLength(1);
      expect(result).toEqual(
        expect.arrayContaining([
          {
            article: "Article 13",
            url:
              "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005833468?idConteneur=KALICONT000005635596",
          },
        ])
      );
    }
  );
});
