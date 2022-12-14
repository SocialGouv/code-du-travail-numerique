import { getReferences } from "../../../../common";

const engine = SingletonEnginePublicodes.getInstance();

const expectedReferences = [
  {
    article:
      "Article 29 de la Convention collective nationale des ingénieurs et cadres de la métallurgie du 13 mars 1972",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000023173732?idConteneur=KALICONT000005635842&origin=list#KALIARTI000023173732",
  },
];

describe("Références juridique pour l'indemnité conventionnel de licenciement pour la CC 650", () => {
  describe("Cas standard", () => {
    test.each`
      age   | seniority | salary
      ${35} | ${1}      | ${2562}
      ${35} | ${7.91}   | ${2562}
      ${35} | ${8}      | ${2668}
      ${35} | ${19}     | ${2668}
      ${55} | ${1}      | ${2562}
      ${55} | ${2}      | ${2562}
      ${55} | ${5}      | ${2562}
      ${55} | ${7.91}   | ${2562}
      ${55} | ${8}      | ${2668}
      ${55} | ${19}     | ${2668}
      ${61} | ${1}      | ${2562}
      ${61} | ${2}      | ${2562}
      ${61} | ${5}      | ${2562}
      ${61} | ${7.91}   | ${2562}
      ${61} | ${8}      | ${2668}
      ${61} | ${19}     | ${2668}
      ${62} | ${1}      | ${2562}
      ${62} | ${2}      | ${2562}
      ${62} | ${5}      | ${2562}
      ${62} | ${7.91}   | ${2562}
      ${62} | ${8}      | ${2668}
      ${62} | ${19}     | ${2668}
      ${63} | ${1}      | ${2562}
      ${63} | ${2}      | ${2562}
      ${63} | ${5}      | ${2562}
      ${63} | ${7.91}   | ${2562}
      ${63} | ${8}      | ${2668}
      ${63} | ${19}     | ${2668}
      ${64} | ${1}      | ${2562}
      ${64} | ${2}      | ${2562}
      ${64} | ${5}      | ${2562}
      ${64} | ${7.91}   | ${2562}
      ${64} | ${8}      | ${2668}
      ${64} | ${19}     | ${2668}
    `(
      "age: $age, ancienneté: $seniority an, salaire de référence: $salary",
      ({ seniority, salary, age }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0650'",
          "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age": age,
          "contrat salarié . indemnité de licenciement": "oui",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
        });

        const result = getReferences(situation, "résultat conventionnel");

        expect(result).toHaveLength(expectedReferences.length);
        expect(result).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });

  describe("Cas avec une réponse Non", () => {
    test.each`
      age   | seniority | salary
      ${54} | ${1}      | ${2562}
      ${54} | ${5}      | ${2562}
      ${54} | ${7.91}   | ${2562}
      ${54} | ${8}      | ${2668}
      ${54} | ${19}     | ${2668}
    `(
      "age: $age, ancienneté: $seniority an, salaire de référence: $salary, catégorie $category",
      ({ seniority, salary, age }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0650'",
          "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age": age,
          "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age 55 ans":
            "'Non'",
          "contrat salarié . indemnité de licenciement": "oui",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
        });

        const result = getReferences(situation, "résultat conventionnel");

        expect(result).toHaveLength(expectedReferences.length);
        expect(result).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });

  describe("Cas avec une réponse Oui", () => {
    test.each`
      age   | seniority | salary
      ${54} | ${1}      | ${2562}
      ${54} | ${5}      | ${2562}
      ${54} | ${7.91}   | ${2562}
      ${54} | ${8}      | ${2668}
      ${54} | ${19}     | ${2668}
    `(
      "age: $age, ancienneté: $seniority an, salaire de référence: $salary, catégorie $category",
      ({ seniority, salary, age }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0650'",
          "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age": age,
          "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age 55 ans":
            "'Oui'",
          "contrat salarié . indemnité de licenciement": "oui",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
        });

        const result = getReferences(situation, "résultat conventionnel");

        expect(result).toHaveLength(expectedReferences.length);
        expect(result).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });
});
