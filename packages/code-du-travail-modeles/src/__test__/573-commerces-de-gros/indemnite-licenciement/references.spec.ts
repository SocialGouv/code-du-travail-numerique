import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../internal/merger";
import { LicenciementEconomique } from "../../../plugins";
import { CatPro573 } from "../../../plugins/formule/573_commerces_de_gros";
import { getReferences } from "../../../utils";

const engine = new Engine(mergeIndemniteLicenciementModels());

const refAutres = [
  {
    article: "Article 37",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000026802009?idConteneur=KALICONT000005635373",
  },
  {
    article:
      "Article 4 de l’Avenant II relatif aux agents de maîtrise et techniciens, secteur alimentaire",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000026802068?idConteneur=KALICONT000005635373",
  },
  {
    article:
      "Article 4 de l’Avenant II relatif aux agents de maîtrise et techniciens, secteur non alimentaire",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000026802084?idConteneur=KALICONT000005635373",
  },
];

const refAgentMajoration = [
  {
    article:
      "Article 4 de l’Avenant II relatif aux agents de maîtrise et techniciens, secteur alimentaire",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000026802068?idConteneur=KALICONT000005635373",
  },
  {
    article:
      "Article 4 de l’Avenant II relatif aux agents de maîtrise et techniciens, secteur non alimentaire",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000026802084?idConteneur=KALICONT000005635373",
  },
];

const refCadres = [
  {
    article: "Article 37",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000026802009?idConteneur=KALICONT000005635373",
  },
  {
    article: "Article 4 de l’Avenant I relatif aux cadres",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000026802057?idConteneur=KALICONT000005635373",
  },
];

describe("Références juridique pour l'indemnité conventionnel de licenciement pour la CC 573", () => {
  describe("Cas standard", () => {
    test.each`
      age   | category            | typeLicenciement              | seniority | salary  | expectedReferences
      ${32} | ${CatPro573.autres} | ${LicenciementEconomique.non} | ${1}      | ${2500} | ${refAutres}
      ${32} | ${CatPro573.autres} | ${LicenciementEconomique.non} | ${15}     | ${2500} | ${refAutres}
      ${32} | ${CatPro573.agents} | ${LicenciementEconomique.non} | ${1}      | ${2700} | ${refAutres}
      ${32} | ${CatPro573.agents} | ${LicenciementEconomique.non} | ${15}     | ${2700} | ${refAutres}
      ${40} | ${CatPro573.agents} | ${LicenciementEconomique.oui} | ${1}      | ${2700} | ${refAutres}
      ${40} | ${CatPro573.agents} | ${LicenciementEconomique.oui} | ${14}     | ${2700} | ${refAutres}
      ${57} | ${CatPro573.agents} | ${LicenciementEconomique.oui} | ${14}     | ${2700} | ${refAutres}
      ${55} | ${CatPro573.agents} | ${LicenciementEconomique.oui} | ${15}     | ${2700} | ${refAgentMajoration}
      ${56} | ${CatPro573.agents} | ${LicenciementEconomique.oui} | ${25}     | ${2700} | ${refAgentMajoration}
      ${32} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${4}      | ${3200} | ${refCadres}
      ${32} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${5}      | ${3200} | ${refCadres}
      ${40} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${6}      | ${3200} | ${refCadres}
      ${40} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${10}     | ${3200} | ${refCadres}
      ${40} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${23}     | ${3200} | ${refCadres}
      ${52} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${6}      | ${3200} | ${refCadres}
      ${52} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${10}     | ${3200} | ${refCadres}
      ${52} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${23}     | ${3200} | ${refCadres}
      ${57} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${6}      | ${3200} | ${refCadres}
      ${57} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${10}     | ${3200} | ${refCadres}
      ${57} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${23}     | ${3200} | ${refCadres}
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
          "contrat salarié . convention collective . commerces de gros . age":
            age,
          "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${category}'`,
          "contrat salarié . convention collective . commerces de gros . licenciement économique": `'${typeLicenciement}'`,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            salary,
        });

        const result = getReferences(situation, "résultat conventionnel");

        expect(result).toHaveLength(expectedReferences.length);
        expect(result).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });
});
