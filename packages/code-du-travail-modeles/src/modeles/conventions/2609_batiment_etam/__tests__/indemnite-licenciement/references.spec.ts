import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../../../internal/merger";
import { getReferences } from "../../../../common";

const engine = new Engine(mergeIndemniteLicenciementModels());

describe("Vérification des références juridiques pour la CC 2609", () => {
  const references = [
    {
      article: "Article 8.4",
      url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000018773860?idConteneur=KALICONT000018773893",
    },
    {
      article: "Article 8.5",
      url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000018773861?idConteneur=KALICONT000018773893",
    },
    {
      article: "Article 8.13",
      url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000018773880?idConteneur=KALICONT000018773893&origin=list#KALIARTI000018773880",
    },
    {
      article: "Article 8.7",
      url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000018773870?idConteneur=KALICONT000018773893#KALIARTI000018773870",
    },
  ];

  test.each`
    seniority | age   | expectedReferences
    ${1.75}   | ${50} | ${references}
    ${4}      | ${50} | ${references}
    ${15}     | ${50} | ${references}
    ${25}     | ${50} | ${references}
    ${1.75}   | ${58} | ${references}
    ${4}      | ${58} | ${references}
    ${15}     | ${58} | ${references}
    ${25}     | ${58} | ${references}
    ${1.75}   | ${66} | ${references}
    ${4}      | ${66} | ${references}
    ${15}     | ${66} | ${references}
    ${25}     | ${66} | ${references}
  `(
    "avec une ancienneté de $seniority ans, un age de $age et un salaire ref de $salaireRef",
    ({ seniority, age, expectedReferences }) => {
      const result = getReferences(
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC2609'",
          "contrat salarié . convention collective . batiment etam . indemnité de licenciement . age":
            age,
          "contrat salarié . indemnité de licenciement": "oui",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "1000",
        }),
        "résultat conventionnel"
      );

      expect(result).toHaveLength(expectedReferences.length);
      expect(result).toEqual(expect.arrayContaining(expectedReferences));
    }
  );
});
