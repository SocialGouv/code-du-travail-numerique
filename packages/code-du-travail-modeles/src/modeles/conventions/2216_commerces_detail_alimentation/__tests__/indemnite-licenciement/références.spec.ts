import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2216"
);

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
      category                                          | isEconomicFiring | age   | seniority | salary  | expectedReferences
      ${"Employés et ouvriers, personnel de livraison"} | ${false}         | ${50} | ${8 / 12} | ${2000} | ${referencesEmployes}
      ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${50} | ${8 / 12} | ${2000} | ${referencesEmployes}
      ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${51} | ${8 / 12} | ${2000} | ${referencesEmployes}
      ${"Employés et ouvriers, personnel de livraison"} | ${false}         | ${50} | ${11}     | ${2000} | ${referencesEmployes}
      ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${50} | ${11}     | ${2000} | ${referencesEmployes}
      ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${51} | ${11}     | ${2000} | ${referencesEmployes}
      ${"Agents de maîtrise et techniciens"}            | ${false}         | ${50} | ${8 / 12} | ${2000} | ${referencesAgents}
      ${"Agents de maîtrise et techniciens"}            | ${true}          | ${50} | ${8 / 12} | ${2000} | ${referencesAgents}
      ${"Agents de maîtrise et techniciens"}            | ${true}          | ${51} | ${8 / 12} | ${2000} | ${referencesAgents}
      ${"Agents de maîtrise et techniciens"}            | ${false}         | ${50} | ${11}     | ${2000} | ${referencesAgents}
      ${"Agents de maîtrise et techniciens"}            | ${true}          | ${50} | ${11}     | ${2000} | ${referencesAgents}
      ${"Agents de maîtrise et techniciens"}            | ${true}          | ${51} | ${11}     | ${2000} | ${referencesAgents}
      ${"Cadres"}                                       | ${false}         | ${50} | ${8 / 12} | ${2000} | ${referencesCadres}
      ${"Cadres"}                                       | ${true}          | ${50} | ${8 / 12} | ${2000} | ${referencesCadres}
      ${"Cadres"}                                       | ${true}          | ${51} | ${8 / 12} | ${2000} | ${referencesCadres}
      ${"Cadres"}                                       | ${false}         | ${50} | ${8}      | ${2000} | ${referencesCadres}
      ${"Cadres"}                                       | ${true}          | ${50} | ${8}      | ${2000} | ${referencesCadres}
      ${"Cadres"}                                       | ${true}          | ${51} | ${8}      | ${2000} | ${referencesCadres}
      ${"Cadres"}                                       | ${false}         | ${50} | ${11}     | ${2000} | ${referencesCadres}
      ${"Cadres"}                                       | ${true}          | ${50} | ${11}     | ${2000} | ${referencesCadres}
      ${"Cadres"}                                       | ${true}          | ${51} | ${11}     | ${2000} | ${referencesCadres}
      ${"Cadres"}                                       | ${false}         | ${50} | ${22}     | ${2000} | ${referencesCadres}
      ${"Cadres"}                                       | ${true}          | ${50} | ${22}     | ${2000} | ${referencesCadres}
      ${"Cadres"}                                       | ${true}          | ${51} | ${22}     | ${2000} | ${referencesCadres}
      ${"Cadres"}                                       | ${false}         | ${50} | ${44}     | ${2000} | ${referencesCadres}
      ${"Cadres"}                                       | ${true}          | ${50} | ${44}     | ${2000} | ${referencesCadres}
      ${"Cadres"}                                       | ${true}          | ${51} | ${44}     | ${2000} | ${referencesCadres}
    `(
      "ancienneté: $seniority an, age $age ans, licenciement économique $isEconomicFiring, catégorie $category",
      ({
        category,
        isEconomicFiring,
        age,
        seniority,
        salary,
        expectedReferences,
      }) => {
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC2216'",
          "contrat salarié . convention collective . commerce gros et detail alimentation . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
          "contrat salarié . convention collective . commerce gros et detail alimentation . indemnité de licenciement . catégorie professionnelle . licenciement économique":
            isEconomicFiring ? `'Oui'` : `'Non'`,
          "contrat salarié . convention collective . commerce gros et detail alimentation . indemnité de licenciement . catégorie professionnelle . licenciement économique . age":
            age,

          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            salary,
        });

        const result = engine.getReferences("résultat conventionnel");
        expect(result).toHaveLength(expectedReferences.length);
        expect(result).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });
});
