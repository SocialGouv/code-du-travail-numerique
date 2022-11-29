import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../../../internal/merger";

const engine = new Engine(mergeIndemniteLicenciementModels());

describe("Indemnité conventionnel de licenciement pour la CC 2216", () => {
  describe("Cas standard", () => {
    test.each`
      category                                          | isEconomicFiring | age   | seniority | salary  | expectedCompensation
      ${"Employés et ouvriers, personnel de livraison"} | ${false}         | ${50} | ${0}      | ${2000} | ${0}
      ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${50} | ${0}      | ${2000} | ${0}
      ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${51} | ${0}      | ${2000} | ${0}
      ${"Employés et ouvriers, personnel de livraison"} | ${false}         | ${50} | ${8 / 12} | ${2000} | ${333.33}
      ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${50} | ${8 / 12} | ${2000} | ${333.33}
      ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${51} | ${8 / 12} | ${2000} | ${400}
      ${"Employés et ouvriers, personnel de livraison"} | ${false}         | ${50} | ${11}     | ${2000} | ${5666.67}
      ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${50} | ${11}     | ${2000} | ${5666.67}
      ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${51} | ${11}     | ${2000} | ${6800}
      ${"Agents de maîtrise et techniciens"}            | ${false}         | ${50} | ${0}      | ${2000} | ${0}
      ${"Agents de maîtrise et techniciens"}            | ${true}          | ${50} | ${0}      | ${2000} | ${0}
      ${"Agents de maîtrise et techniciens"}            | ${true}          | ${51} | ${0}      | ${2000} | ${0}
      ${"Agents de maîtrise et techniciens"}            | ${false}         | ${50} | ${8 / 12} | ${2000} | ${333.33}
      ${"Agents de maîtrise et techniciens"}            | ${true}          | ${50} | ${8 / 12} | ${2000} | ${333.33}
      ${"Agents de maîtrise et techniciens"}            | ${true}          | ${51} | ${8 / 12} | ${2000} | ${400}
      ${"Agents de maîtrise et techniciens"}            | ${false}         | ${50} | ${11}     | ${2000} | ${5666.67}
      ${"Agents de maîtrise et techniciens"}            | ${true}          | ${50} | ${11}     | ${2000} | ${5666.67}
      ${"Agents de maîtrise et techniciens"}            | ${true}          | ${51} | ${11}     | ${2000} | ${6800}
      ${"Cadres"}                                       | ${false}         | ${50} | ${0}      | ${2000} | ${0}
      ${"Cadres"}                                       | ${true}          | ${50} | ${0}      | ${2000} | ${0}
      ${"Cadres"}                                       | ${true}          | ${51} | ${0}      | ${2000} | ${0}
      ${"Cadres"}                                       | ${false}         | ${50} | ${8 / 12} | ${2000} | ${333.33}
      ${"Cadres"}                                       | ${true}          | ${50} | ${8 / 12} | ${2000} | ${400}
      ${"Cadres"}                                       | ${true}          | ${51} | ${8 / 12} | ${2000} | ${400}
      ${"Cadres"}                                       | ${false}         | ${50} | ${8}      | ${2000} | ${4800}
      ${"Cadres"}                                       | ${true}          | ${50} | ${8}      | ${2000} | ${5760}
      ${"Cadres"}                                       | ${true}          | ${51} | ${8}      | ${2000} | ${5760}
      ${"Cadres"}                                       | ${false}         | ${50} | ${11}     | ${2000} | ${6800}
      ${"Cadres"}                                       | ${true}          | ${50} | ${11}     | ${2000} | ${8160}
      ${"Cadres"}                                       | ${true}          | ${51} | ${11}     | ${2000} | ${8160}
      ${"Cadres"}                                       | ${false}         | ${50} | ${22}     | ${2000} | ${16000}
      ${"Cadres"}                                       | ${true}          | ${50} | ${22}     | ${2000} | ${19200}
      ${"Cadres"}                                       | ${true}          | ${51} | ${22}     | ${2000} | ${19200}
      ${"Cadres"}                                       | ${false}         | ${50} | ${44}     | ${2000} | ${26666.67}
      ${"Cadres"}                                       | ${true}          | ${50} | ${44}     | ${2000} | ${32000}
      ${"Cadres"}                                       | ${true}          | ${51} | ${44}     | ${2000} | ${32000}
      ${"Employés et ouvriers, personnel de livraison"} | ${false}         | ${45} | ${0.5}    | ${2500} | ${0}
      ${"Employés et ouvriers, personnel de livraison"} | ${false}         | ${45} | ${0.67}   | ${2500} | ${418.75}
      ${"Employés et ouvriers, personnel de livraison"} | ${false}         | ${45} | ${10}     | ${2500} | ${6250}
      ${"Employés et ouvriers, personnel de livraison"} | ${false}         | ${45} | ${11}     | ${2500} | ${7083.33}
      ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${50} | ${20}     | ${2500} | ${14583.33}
      ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${51} | ${20}     | ${2500} | ${17500}
      ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${53} | ${8}      | ${2500} | ${6000}
      ${"Agents de maîtrise et techniciens"}            | ${false}         | ${45} | ${0.5}    | ${2500} | ${0}
      ${"Agents de maîtrise et techniciens"}            | ${false}         | ${45} | ${0.67}   | ${2500} | ${418.75}
      ${"Agents de maîtrise et techniciens"}            | ${false}         | ${45} | ${10}     | ${2500} | ${6250}
      ${"Agents de maîtrise et techniciens"}            | ${false}         | ${45} | ${11}     | ${2500} | ${7083.33}
      ${"Agents de maîtrise et techniciens"}            | ${true}          | ${50} | ${20}     | ${2500} | ${14583.33}
      ${"Agents de maîtrise et techniciens"}            | ${true}          | ${51} | ${20}     | ${2500} | ${17500}
      ${"Agents de maîtrise et techniciens"}            | ${true}          | ${53} | ${8}      | ${2500} | ${6000}
      ${"Cadres"}                                       | ${false}         | ${45} | ${0.91}   | ${2500} | ${568.75}
      ${"Cadres"}                                       | ${false}         | ${45} | ${5}      | ${2500} | ${3125}
      ${"Cadres"}                                       | ${false}         | ${45} | ${6}      | ${2500} | ${4500}
      ${"Cadres"}                                       | ${false}         | ${45} | ${15}     | ${2500} | ${12500}
      ${"Cadres"}                                       | ${false}         | ${45} | ${22}     | ${2500} | ${20000}
      ${"Cadres"}                                       | ${false}         | ${45} | ${38}     | ${2500} | ${30000}
      ${"Cadres"}                                       | ${false}         | ${45} | ${40}     | ${2500} | ${30000}
      ${"Cadres"}                                       | ${false}         | ${45} | ${41}     | ${2500} | ${30833.33}
      ${"Cadres"}                                       | ${true}          | ${33} | ${5}      | ${2500} | ${3125}
      ${"Cadres"}                                       | ${true}          | ${40} | ${15}     | ${2500} | ${12500}
      ${"Cadres"}                                       | ${true}          | ${50} | ${22}     | ${2500} | ${24000}
      ${"Cadres"}                                       | ${true}          | ${58} | ${38}     | ${2500} | ${36000}
      ${"Cadres"}                                       | ${true}          | ${55} | ${40}     | ${2500} | ${36000}
      ${"Cadres"}                                       | ${true}          | ${50} | ${41}     | ${2500} | ${37000}
    `(
      "ancienneté: $seniority an, age $age ans, salaire de référence: $salary, catégorie $category & licenciement économique: $isEconomicFiring => $expectedCompensation €",
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
          "contrat salarié . indemnité de licenciement": "oui",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            salary,
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
