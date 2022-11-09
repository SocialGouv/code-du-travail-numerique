import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../internal/merger";
import { CatPro2216 } from "../../../plugins/formule/2216_commerces_detail_alimentation";
import { getReferences } from "../../../utils";

const engine = new Engine(mergeIndemniteLicenciementModels());

const referencesEmployes = [
  {
    article:
      "Article 7 de l’Annexe I Employés et ouvriers, personnel de livraison",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041517490?idConteneur=KALICONT000005635085",
  },
  {
    article:
      "Article 6 de l’Annexe I Employés et ouvriers, personnel de livraison",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041517485?idConteneur=KALICONT000005635085&origin=list#KALIARTI000041517485",
  },
  {
    article: "Article 3.13",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039111891?idConteneur=KALICONT000005635085&origin=list#KALIARTI000039111891",
  },
];

const referencesAgents = [
  {
    article:
      "Article 7 de l’Annexe II relative aux agents de maîtrise et techniciens",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041517524",
  },
  {
    article:
      "Article 6 de l’Annexe II relative aux agents de maîtrise et techniciens",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041517519?idConteneur=KALICONT000005635085&origin=list#KALIARTI000041517519",
  },
  {
    article: "Article 3.13",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039111891?idConteneur=KALICONT000005635085&origin=list#KALIARTI000039111891",
  },
];

const referencesCadres = [
  {
    article: "Article 7 de l’Annexe III Cadres",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041517561",
  },
  {
    article: "Article 6 de l’Annexe III Cadres",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041517556?idConteneur=KALICONT000005635085&origin=list#KALIARTI000041517556",
  },
  {
    article: "Article 3.13",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039111891?idConteneur=KALICONT000005635085&origin=list#KALIARTI000039111891",
  },
];

describe("Références juridique pour l'indemnité conventionnel de licenciement pour la CC 2216", () => {
  describe("Cas standard", () => {
    test.each`
      category               | isEconomicFiring | age   | seniority | salary  | expectedReferences
      ${CatPro2216.employes} | ${false}         | ${50} | ${0}      | ${2000} | ${referencesEmployes}
      ${CatPro2216.employes} | ${true}          | ${50} | ${0}      | ${2000} | ${referencesEmployes}
      ${CatPro2216.employes} | ${true}          | ${51} | ${0}      | ${2000} | ${referencesEmployes}
      ${CatPro2216.employes} | ${false}         | ${50} | ${8 / 12} | ${2000} | ${referencesEmployes}
      ${CatPro2216.employes} | ${true}          | ${50} | ${8 / 12} | ${2000} | ${referencesEmployes}
      ${CatPro2216.employes} | ${true}          | ${51} | ${8 / 12} | ${2000} | ${referencesEmployes}
      ${CatPro2216.employes} | ${false}         | ${50} | ${11}     | ${2000} | ${referencesEmployes}
      ${CatPro2216.employes} | ${true}          | ${50} | ${11}     | ${2000} | ${referencesEmployes}
      ${CatPro2216.employes} | ${true}          | ${51} | ${11}     | ${2000} | ${referencesEmployes}
      ${CatPro2216.agents}   | ${false}         | ${50} | ${0}      | ${2000} | ${referencesAgents}
      ${CatPro2216.agents}   | ${true}          | ${50} | ${0}      | ${2000} | ${referencesAgents}
      ${CatPro2216.agents}   | ${true}          | ${51} | ${0}      | ${2000} | ${referencesAgents}
      ${CatPro2216.agents}   | ${false}         | ${50} | ${8 / 12} | ${2000} | ${referencesAgents}
      ${CatPro2216.agents}   | ${true}          | ${50} | ${8 / 12} | ${2000} | ${referencesAgents}
      ${CatPro2216.agents}   | ${true}          | ${51} | ${8 / 12} | ${2000} | ${referencesAgents}
      ${CatPro2216.agents}   | ${false}         | ${50} | ${11}     | ${2000} | ${referencesAgents}
      ${CatPro2216.agents}   | ${true}          | ${50} | ${11}     | ${2000} | ${referencesAgents}
      ${CatPro2216.agents}   | ${true}          | ${51} | ${11}     | ${2000} | ${referencesAgents}
      ${CatPro2216.cadres}   | ${false}         | ${50} | ${0}      | ${2000} | ${referencesCadres}
      ${CatPro2216.cadres}   | ${true}          | ${50} | ${0}      | ${2000} | ${referencesCadres}
      ${CatPro2216.cadres}   | ${true}          | ${51} | ${0}      | ${2000} | ${referencesCadres}
      ${CatPro2216.cadres}   | ${false}         | ${50} | ${8 / 12} | ${2000} | ${referencesCadres}
      ${CatPro2216.cadres}   | ${true}          | ${50} | ${8 / 12} | ${2000} | ${referencesCadres}
      ${CatPro2216.cadres}   | ${true}          | ${51} | ${8 / 12} | ${2000} | ${referencesCadres}
      ${CatPro2216.cadres}   | ${false}         | ${50} | ${8}      | ${2000} | ${referencesCadres}
      ${CatPro2216.cadres}   | ${true}          | ${50} | ${8}      | ${2000} | ${referencesCadres}
      ${CatPro2216.cadres}   | ${true}          | ${51} | ${8}      | ${2000} | ${referencesCadres}
      ${CatPro2216.cadres}   | ${false}         | ${50} | ${11}     | ${2000} | ${referencesCadres}
      ${CatPro2216.cadres}   | ${true}          | ${50} | ${11}     | ${2000} | ${referencesCadres}
      ${CatPro2216.cadres}   | ${true}          | ${51} | ${11}     | ${2000} | ${referencesCadres}
      ${CatPro2216.cadres}   | ${false}         | ${50} | ${22}     | ${2000} | ${referencesCadres}
      ${CatPro2216.cadres}   | ${true}          | ${50} | ${22}     | ${2000} | ${referencesCadres}
      ${CatPro2216.cadres}   | ${true}          | ${51} | ${22}     | ${2000} | ${referencesCadres}
      ${CatPro2216.cadres}   | ${false}         | ${50} | ${44}     | ${2000} | ${referencesCadres}
      ${CatPro2216.cadres}   | ${true}          | ${50} | ${44}     | ${2000} | ${referencesCadres}
      ${CatPro2216.cadres}   | ${true}          | ${51} | ${44}     | ${2000} | ${referencesCadres}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, catégorie $category => $expectedReferences",
      ({
        category,
        isEconomicFiring,
        age,
        seniority,
        salary,
        expectedReferences,
      }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC2216'",
          "contrat salarié . convention collective . commerce gros et detail alimentation . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
          "contrat salarié . convention collective . commerce gros et detail alimentation . indemnité de licenciement . catégorie professionnelle . licenciement économique":
            isEconomicFiring ? `'Oui'` : `'Non'`,
          "contrat salarié . convention collective . commerce gros et detail alimentation . indemnité de licenciement . catégorie professionnelle . licenciement économique . age":
            age,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            salary,
          "contrat salarié . indemnité de licenciement": "oui",
        });

        const result = getReferences(situation, "résultat conventionnel");
        expect(result).toHaveLength(expectedReferences.length);
        expect(result).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });
});
