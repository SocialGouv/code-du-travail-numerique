import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../../../internal/merger";
import { getReferences, QuestionOuiNon } from "../../../../common";
import { CatPro573 } from "../../formula";

const engine = global.__engine__;

const refAutres = [
  {
    article: "Article 37",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000026802009?idConteneur=KALICONT000005635373",
  },
  {
    article:
      "Article 4 de l’Avenant II relatif aux agents de maîtrise et techniciens, secteur alimentaire",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000026802068?idConteneur=KALICONT000005635373",
  },
  {
    article:
      "Article 4 de l’Avenant II relatif aux agents de maîtrise et techniciens, secteur non alimentaire",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000026802084?idConteneur=KALICONT000005635373",
  },
];

const refAgentMajoration = [
  {
    article:
      "Article 4 de l’Avenant II relatif aux agents de maîtrise et techniciens, secteur alimentaire",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000026802068?idConteneur=KALICONT000005635373",
  },
  {
    article:
      "Article 4 de l’Avenant II relatif aux agents de maîtrise et techniciens, secteur non alimentaire",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000026802084?idConteneur=KALICONT000005635373",
  },
];

const refCadres = [
  {
    article: "Article 37",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000026802009?idConteneur=KALICONT000005635373",
  },
  {
    article: "Article 4 de l’Avenant I relatif aux cadres",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000026802057?idConteneur=KALICONT000005635373",
  },
];

describe("Références juridique pour l'indemnité conventionnel de licenciement pour la CC 573", () => {
  describe("Autres", () => {
    test.each`
      category            | seniority | salary  | expectedReferences
      ${CatPro573.autres} | ${1}      | ${2500} | ${refAutres}
      ${CatPro573.autres} | ${15}     | ${2500} | ${refAutres}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, age $age, type de licenciement $typeLicenciement, catégorie $category => $expectedCompensation €",
      ({ seniority, salary, expectedReferences, category }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0573'",
          "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${category}'`,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
        });

        const result = getReferences(situation, "résultat conventionnel");

        expect(result).toHaveLength(expectedReferences.length);
        expect(result).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });

  describe("Agents", () => {
    test.each`
      age   | category            | typeLicenciement      | seniority | salary  | expectedReferences
      ${32} | ${CatPro573.agents} | ${QuestionOuiNon.non} | ${1}      | ${2700} | ${refAutres}
      ${32} | ${CatPro573.agents} | ${QuestionOuiNon.non} | ${15}     | ${2700} | ${refAutres}
      ${40} | ${CatPro573.agents} | ${QuestionOuiNon.oui} | ${1}      | ${2700} | ${refAutres}
      ${40} | ${CatPro573.agents} | ${QuestionOuiNon.oui} | ${14}     | ${2700} | ${refAutres}
      ${57} | ${CatPro573.agents} | ${QuestionOuiNon.oui} | ${14}     | ${2700} | ${refAutres}
      ${55} | ${CatPro573.agents} | ${QuestionOuiNon.oui} | ${15}     | ${2700} | ${refAgentMajoration}
      ${56} | ${CatPro573.agents} | ${QuestionOuiNon.oui} | ${25}     | ${2700} | ${refAgentMajoration}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, age $age, type de licenciement $typeLicenciement, catégorie $category => $expectedCompensation €",
      ({
        seniority,
        salary,
        expectedReferences,
        category,
        typeLicenciement,
        age,
      }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0573'",
          "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${category}'`,
          "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . agents . licenciement économique": `'${typeLicenciement}'`,
          "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . agents . licenciement économique . age": age,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
        });

        const result = getReferences(situation, "résultat conventionnel");

        expect(result).toHaveLength(expectedReferences.length);
        expect(result).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });

  describe("Cadres", () => {
    test.each`
      age   | category            | auMoins15AnsCadre     | seniority | salary  | expectedReferences
      ${32} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${4}      | ${3200} | ${refCadres}
      ${32} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${5}      | ${3200} | ${refCadres}
      ${40} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${6}      | ${3200} | ${refCadres}
      ${40} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${10}     | ${3200} | ${refCadres}
      ${40} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${23}     | ${3200} | ${refCadres}
      ${52} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${6}      | ${3200} | ${refCadres}
      ${52} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${10}     | ${3200} | ${refCadres}
      ${52} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${23}     | ${3200} | ${refCadres}
      ${57} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${6}      | ${3200} | ${refCadres}
      ${57} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${10}     | ${3200} | ${refCadres}
      ${57} | ${CatPro573.cadres} | ${QuestionOuiNon.oui} | ${23}     | ${3200} | ${refCadres}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, age $age, type de licenciement $typeLicenciement, catégorie $category => $expectedCompensation €",
      ({
        seniority,
        salary,
        expectedReferences,
        category,
        auMoins15AnsCadre,
        age,
      }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0573'",
          "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${category}'`,
          "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . cadres . cadre durant au moins de 15 ans": `'${auMoins15AnsCadre}'`,
          "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . cadres . cadre durant au moins de 15 ans . age": age,
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
