import Engine from "publicodes";

import { mergeModels } from "../../../internal/merger";
import { CatPro2216 } from "../../../plugins/formule/2216_commerces_detail_alimentation";

const engine = new Engine(mergeModels());

describe("Indemnité conventionnel de licenciement pour la CC 2216", () => {
  describe("Cas standard", () => {
    test.each`
      category               | isEconomicFiring | age   | seniority | salary  | expectedCompensation
      ${CatPro2216.employes} | ${false}         | ${50} | ${0}      | ${2000} | ${0}
      ${CatPro2216.employes} | ${true}          | ${50} | ${0}      | ${2000} | ${0}
      ${CatPro2216.employes} | ${true}          | ${51} | ${0}      | ${2000} | ${0}
      ${CatPro2216.employes} | ${false}         | ${50} | ${8 / 12} | ${2000} | ${0}
      ${CatPro2216.employes} | ${true}          | ${50} | ${8 / 12} | ${2000} | ${0}
      ${CatPro2216.employes} | ${true}          | ${51} | ${8 / 12} | ${2000} | ${0}
      ${CatPro2216.employes} | ${false}         | ${50} | ${11}     | ${2000} | ${0}
      ${CatPro2216.employes} | ${true}          | ${50} | ${11}     | ${2000} | ${0}
      ${CatPro2216.employes} | ${true}          | ${51} | ${11}     | ${2000} | ${0}
      ${CatPro2216.agents}   | ${false}         | ${50} | ${0}      | ${2000} | ${0}
      ${CatPro2216.agents}   | ${true}          | ${50} | ${0}      | ${2000} | ${0}
      ${CatPro2216.agents}   | ${true}          | ${51} | ${0}      | ${2000} | ${0}
      ${CatPro2216.agents}   | ${false}         | ${50} | ${8 / 12} | ${2000} | ${0}
      ${CatPro2216.agents}   | ${true}          | ${50} | ${8 / 12} | ${2000} | ${0}
      ${CatPro2216.agents}   | ${true}          | ${51} | ${8 / 12} | ${2000} | ${0}
      ${CatPro2216.agents}   | ${false}         | ${50} | ${11}     | ${2000} | ${0}
      ${CatPro2216.agents}   | ${true}          | ${50} | ${11}     | ${2000} | ${0}
      ${CatPro2216.agents}   | ${true}          | ${51} | ${11}     | ${2000} | ${0}
      ${CatPro2216.cadres}   | ${false}         | ${50} | ${0}      | ${2000} | ${0}
      ${CatPro2216.cadres}   | ${true}          | ${50} | ${0}      | ${2000} | ${0}
      ${CatPro2216.cadres}   | ${true}          | ${51} | ${0}      | ${2000} | ${0}
      ${CatPro2216.cadres}   | ${false}         | ${50} | ${8 / 12} | ${2000} | ${0}
      ${CatPro2216.cadres}   | ${true}          | ${50} | ${8 / 12} | ${2000} | ${0}
      ${CatPro2216.cadres}   | ${true}          | ${51} | ${8 / 12} | ${2000} | ${0}
      ${CatPro2216.cadres}   | ${false}         | ${50} | ${8}      | ${2000} | ${0}
      ${CatPro2216.cadres}   | ${true}          | ${50} | ${8}      | ${2000} | ${0}
      ${CatPro2216.cadres}   | ${true}          | ${51} | ${8}      | ${2000} | ${0}
      ${CatPro2216.cadres}   | ${false}         | ${50} | ${11}     | ${2000} | ${0}
      ${CatPro2216.cadres}   | ${true}          | ${50} | ${11}     | ${2000} | ${0}
      ${CatPro2216.cadres}   | ${true}          | ${51} | ${11}     | ${2000} | ${0}
      ${CatPro2216.cadres}   | ${false}         | ${50} | ${22}     | ${2000} | ${0}
      ${CatPro2216.cadres}   | ${true}          | ${50} | ${22}     | ${2000} | ${0}
      ${CatPro2216.cadres}   | ${true}          | ${51} | ${22}     | ${2000} | ${0}
      ${CatPro2216.cadres}   | ${false}         | ${50} | ${44}     | ${2000} | ${0}
      ${CatPro2216.cadres}   | ${true}          | ${50} | ${44}     | ${2000} | ${0}
      ${CatPro2216.cadres}   | ${true}          | ${51} | ${44}     | ${2000} | ${0}
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
          "indemnité de licenciement": "oui",
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
