import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../internal/merger";
import { CatPro2216 } from "../../../plugins/formule/2216_commerces_detail_alimentation";

const engine = new Engine(mergeIndemniteLicenciementModels());

describe("Indemnité conventionnel de licenciement pour la CC 2216", () => {
  describe("Cas standard", () => {
    test.each`
      category               | isEconomicFiring | age   | seniority | salary  | expectedCompensation
      ${CatPro2216.employes} | ${false}         | ${50} | ${0}      | ${2000} | ${0}
      ${CatPro2216.employes} | ${true}          | ${50} | ${0}      | ${2000} | ${0}
      ${CatPro2216.employes} | ${true}          | ${51} | ${0}      | ${2000} | ${0}
      ${CatPro2216.employes} | ${false}         | ${50} | ${8 / 12} | ${2000} | ${333.33}
      ${CatPro2216.employes} | ${true}          | ${50} | ${8 / 12} | ${2000} | ${333.33}
      ${CatPro2216.employes} | ${true}          | ${51} | ${8 / 12} | ${2000} | ${400}
      ${CatPro2216.employes} | ${false}         | ${50} | ${11}     | ${2000} | ${5666.67}
      ${CatPro2216.employes} | ${true}          | ${50} | ${11}     | ${2000} | ${5666.67}
      ${CatPro2216.employes} | ${true}          | ${51} | ${11}     | ${2000} | ${6800}
      ${CatPro2216.agents}   | ${false}         | ${50} | ${0}      | ${2000} | ${0}
      ${CatPro2216.agents}   | ${true}          | ${50} | ${0}      | ${2000} | ${0}
      ${CatPro2216.agents}   | ${true}          | ${51} | ${0}      | ${2000} | ${0}
      ${CatPro2216.agents}   | ${false}         | ${50} | ${8 / 12} | ${2000} | ${333.33}
      ${CatPro2216.agents}   | ${true}          | ${50} | ${8 / 12} | ${2000} | ${333.33}
      ${CatPro2216.agents}   | ${true}          | ${51} | ${8 / 12} | ${2000} | ${400}
      ${CatPro2216.agents}   | ${false}         | ${50} | ${11}     | ${2000} | ${5666.67}
      ${CatPro2216.agents}   | ${true}          | ${50} | ${11}     | ${2000} | ${5666.67}
      ${CatPro2216.agents}   | ${true}          | ${51} | ${11}     | ${2000} | ${6800}
      ${CatPro2216.cadres}   | ${false}         | ${50} | ${0}      | ${2000} | ${0}
      ${CatPro2216.cadres}   | ${true}          | ${50} | ${0}      | ${2000} | ${0}
      ${CatPro2216.cadres}   | ${true}          | ${51} | ${0}      | ${2000} | ${0}
      ${CatPro2216.cadres}   | ${false}         | ${50} | ${8 / 12} | ${2000} | ${333.33}
      ${CatPro2216.cadres}   | ${true}          | ${50} | ${8 / 12} | ${2000} | ${400}
      ${CatPro2216.cadres}   | ${true}          | ${51} | ${8 / 12} | ${2000} | ${400}
      ${CatPro2216.cadres}   | ${false}         | ${50} | ${8}      | ${2000} | ${4800}
      ${CatPro2216.cadres}   | ${true}          | ${50} | ${8}      | ${2000} | ${5760}
      ${CatPro2216.cadres}   | ${true}          | ${51} | ${8}      | ${2000} | ${5760}
      ${CatPro2216.cadres}   | ${false}         | ${50} | ${11}     | ${2000} | ${6800}
      ${CatPro2216.cadres}   | ${true}          | ${50} | ${11}     | ${2000} | ${8160}
      ${CatPro2216.cadres}   | ${true}          | ${51} | ${11}     | ${2000} | ${8160}
      ${CatPro2216.cadres}   | ${false}         | ${50} | ${22}     | ${2000} | ${16000}
      ${CatPro2216.cadres}   | ${true}          | ${50} | ${22}     | ${2000} | ${19200}
      ${CatPro2216.cadres}   | ${true}          | ${51} | ${22}     | ${2000} | ${19200}
      ${CatPro2216.cadres}   | ${false}         | ${50} | ${44}     | ${2000} | ${26666.67}
      ${CatPro2216.cadres}   | ${true}          | ${50} | ${44}     | ${2000} | ${32000}
      ${CatPro2216.cadres}   | ${true}          | ${51} | ${44}     | ${2000} | ${32000}
      ${CatPro2216.employes} | ${false}         | ${45} | ${0.5}    | ${2500} | ${0}
      ${CatPro2216.employes} | ${false}         | ${45} | ${0.67}   | ${2500} | ${418.75}
      ${CatPro2216.employes} | ${false}         | ${45} | ${10}     | ${2500} | ${6250}
      ${CatPro2216.employes} | ${false}         | ${45} | ${11}     | ${2500} | ${7083.33}
      ${CatPro2216.employes} | ${true}          | ${50} | ${20}     | ${2500} | ${14583.33}
      ${CatPro2216.employes} | ${true}          | ${51} | ${20}     | ${2500} | ${17500}
      ${CatPro2216.employes} | ${true}          | ${53} | ${8}      | ${2500} | ${6000}
      ${CatPro2216.agents}   | ${false}         | ${45} | ${0.5}    | ${2500} | ${0}
      ${CatPro2216.agents}   | ${false}         | ${45} | ${0.67}   | ${2500} | ${418.75}
      ${CatPro2216.agents}   | ${false}         | ${45} | ${10}     | ${2500} | ${6250}
      ${CatPro2216.agents}   | ${false}         | ${45} | ${11}     | ${2500} | ${7083.33}
      ${CatPro2216.agents}   | ${true}          | ${50} | ${20}     | ${2500} | ${14583.33}
      ${CatPro2216.agents}   | ${true}          | ${51} | ${20}     | ${2500} | ${17500}
      ${CatPro2216.agents}   | ${true}          | ${53} | ${8}      | ${2500} | ${6000}
      ${CatPro2216.cadres}   | ${false}         | ${45} | ${0.91}   | ${2500} | ${568.75}
      ${CatPro2216.cadres}   | ${false}         | ${45} | ${5}      | ${2500} | ${3125}
      ${CatPro2216.cadres}   | ${false}         | ${45} | ${6}      | ${2500} | ${4500}
      ${CatPro2216.cadres}   | ${false}         | ${45} | ${15}     | ${2500} | ${12500}
      ${CatPro2216.cadres}   | ${false}         | ${45} | ${22}     | ${2500} | ${20000}
      ${CatPro2216.cadres}   | ${false}         | ${45} | ${38}     | ${2500} | ${30000}
      ${CatPro2216.cadres}   | ${false}         | ${45} | ${40}     | ${2500} | ${30000}
      ${CatPro2216.cadres}   | ${false}         | ${45} | ${41}     | ${2500} | ${30833.33}
      ${CatPro2216.cadres}   | ${true}          | ${33} | ${5}      | ${2500} | ${3125}
      ${CatPro2216.cadres}   | ${true}          | ${40} | ${15}     | ${2500} | ${12500}
      ${CatPro2216.cadres}   | ${true}          | ${50} | ${22}     | ${2500} | ${24000}
      ${CatPro2216.cadres}   | ${true}          | ${58} | ${38}     | ${2500} | ${36000}
      ${CatPro2216.cadres}   | ${true}          | ${55} | ${40}     | ${2500} | ${36000}
      ${CatPro2216.cadres}   | ${true}          | ${50} | ${41}     | ${2500} | ${37000}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, catégorie $category => $expectedCompensation €",
      ({
        category,
        isEconomicFiring,
        age,
        seniority,
        salary,
        expectedCompensation,
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

        const result = situation.evaluate(
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(result.missingVariables).toEqual({});
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });
});
