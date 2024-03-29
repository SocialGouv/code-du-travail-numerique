import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2216"
);

describe("Indemnité conventionnel de licenciement pour la CC 2216", () => {
  test.each`
    category                                          | isEconomicFiring | age   | seniorityRight | seniority | salary  | expectedCompensation
    ${"Employés et ouvriers, personnel de livraison"} | ${false}         | ${50} | ${7 / 12}      | ${8 / 12} | ${2000} | ${0}
    ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${50} | ${7 / 12}      | ${8 / 12} | ${2000} | ${0}
    ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${51} | ${7 / 12}      | ${8 / 12} | ${2000} | ${0}
    ${"Employés et ouvriers, personnel de livraison"} | ${false}         | ${50} | ${8 / 12}      | ${8 / 12} | ${2000} | ${333.33}
    ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${49} | ${8 / 12}      | ${8 / 12} | ${2000} | ${333.33}
    ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${50} | ${8 / 12}      | ${8 / 12} | ${2000} | ${400}
    ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${51} | ${8 / 12}      | ${8 / 12} | ${2000} | ${400}
    ${"Employés et ouvriers, personnel de livraison"} | ${false}         | ${50} | ${8 / 12}      | ${11}     | ${2000} | ${5666.67}
    ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${49} | ${8 / 12}      | ${11}     | ${2000} | ${5666.67}
    ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${50} | ${8 / 12}      | ${11}     | ${2000} | ${6800}
    ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${51} | ${8 / 12}      | ${11}     | ${2000} | ${6800}
    ${"Agents de maîtrise et techniciens"}            | ${false}         | ${50} | ${7 / 12}      | ${8 / 12} | ${2000} | ${0}
    ${"Agents de maîtrise et techniciens"}            | ${true}          | ${50} | ${7 / 12}      | ${8 / 12} | ${2000} | ${0}
    ${"Agents de maîtrise et techniciens"}            | ${true}          | ${51} | ${7 / 12}      | ${8 / 12} | ${2000} | ${0}
    ${"Agents de maîtrise et techniciens"}            | ${false}         | ${50} | ${8 / 12}      | ${8 / 12} | ${2000} | ${333.33}
    ${"Agents de maîtrise et techniciens"}            | ${false}         | ${49} | ${8 / 12}      | ${8 / 12} | ${2000} | ${333.33}
    ${"Agents de maîtrise et techniciens"}            | ${true}          | ${50} | ${8 / 12}      | ${8 / 12} | ${2000} | ${400}
    ${"Agents de maîtrise et techniciens"}            | ${true}          | ${51} | ${8 / 12}      | ${8 / 12} | ${2000} | ${400}
    ${"Agents de maîtrise et techniciens"}            | ${false}         | ${50} | ${8 / 12}      | ${11}     | ${2000} | ${5666.67}
    ${"Agents de maîtrise et techniciens"}            | ${true}          | ${49} | ${8 / 12}      | ${11}     | ${2000} | ${5666.67}
    ${"Agents de maîtrise et techniciens"}            | ${true}          | ${50} | ${8 / 12}      | ${11}     | ${2000} | ${6800}
    ${"Agents de maîtrise et techniciens"}            | ${true}          | ${51} | ${8 / 12}      | ${11}     | ${2000} | ${6800}
    ${"Cadres"}                                       | ${false}         | ${50} | ${7 / 12}      | ${8 / 12} | ${2000} | ${0}
    ${"Cadres"}                                       | ${true}          | ${50} | ${7 / 12}      | ${8 / 12} | ${2000} | ${0}
    ${"Cadres"}                                       | ${true}          | ${51} | ${7 / 12}      | ${8 / 12} | ${2000} | ${0}
    ${"Cadres"}                                       | ${false}         | ${50} | ${8 / 12}      | ${8 / 12} | ${2000} | ${333.33}
    ${"Cadres"}                                       | ${true}          | ${50} | ${8 / 12}      | ${8 / 12} | ${2000} | ${400}
    ${"Cadres"}                                       | ${true}          | ${51} | ${8 / 12}      | ${8 / 12} | ${2000} | ${400}
    ${"Cadres"}                                       | ${false}         | ${50} | ${8}           | ${8}      | ${2000} | ${4800}
    ${"Cadres"}                                       | ${true}          | ${50} | ${8}           | ${8}      | ${2000} | ${5760}
    ${"Cadres"}                                       | ${true}          | ${51} | ${8}           | ${8}      | ${2000} | ${5760}
    ${"Cadres"}                                       | ${false}         | ${50} | ${8 / 12}      | ${11}     | ${2000} | ${6800}
    ${"Cadres"}                                       | ${true}          | ${50} | ${8 / 12}      | ${11}     | ${2000} | ${8160}
    ${"Cadres"}                                       | ${true}          | ${51} | ${8 / 12}      | ${11}     | ${2000} | ${8160}
    ${"Cadres"}                                       | ${false}         | ${50} | ${8 / 12}      | ${22}     | ${2000} | ${16000}
    ${"Cadres"}                                       | ${true}          | ${50} | ${8 / 12}      | ${22}     | ${2000} | ${19200}
    ${"Cadres"}                                       | ${true}          | ${51} | ${8 / 12}      | ${22}     | ${2000} | ${19200}
    ${"Cadres"}                                       | ${false}         | ${50} | ${8 / 12}      | ${44}     | ${2000} | ${26666.67}
    ${"Cadres"}                                       | ${true}          | ${50} | ${8 / 12}      | ${44}     | ${2000} | ${32000}
    ${"Cadres"}                                       | ${true}          | ${51} | ${8 / 12}      | ${44}     | ${2000} | ${32000}
    ${"Employés et ouvriers, personnel de livraison"} | ${false}         | ${45} | ${7 / 12}      | ${8 / 12} | ${2500} | ${0}
    ${"Employés et ouvriers, personnel de livraison"} | ${false}         | ${45} | ${8 / 12}      | ${0.67}   | ${2500} | ${418.75}
    ${"Employés et ouvriers, personnel de livraison"} | ${false}         | ${45} | ${8 / 12}      | ${10}     | ${2500} | ${6250}
    ${"Employés et ouvriers, personnel de livraison"} | ${false}         | ${45} | ${8 / 12}      | ${11}     | ${2500} | ${7083.33}
    ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${49} | ${8 / 12}      | ${20}     | ${2500} | ${14583.33}
    ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${50} | ${8 / 12}      | ${20}     | ${2500} | ${17500}
    ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${51} | ${8 / 12}      | ${20}     | ${2500} | ${17500}
    ${"Employés et ouvriers, personnel de livraison"} | ${true}          | ${53} | ${8 / 12}      | ${8}      | ${2500} | ${6000}
    ${"Agents de maîtrise et techniciens"}            | ${false}         | ${45} | ${7 / 12}      | ${8 / 12} | ${2500} | ${0}
    ${"Agents de maîtrise et techniciens"}            | ${false}         | ${45} | ${8 / 12}      | ${0.67}   | ${2500} | ${418.75}
    ${"Agents de maîtrise et techniciens"}            | ${false}         | ${45} | ${8 / 12}      | ${10}     | ${2500} | ${6250}
    ${"Agents de maîtrise et techniciens"}            | ${false}         | ${45} | ${8 / 12}      | ${11}     | ${2500} | ${7083.33}
    ${"Agents de maîtrise et techniciens"}            | ${true}          | ${49} | ${8 / 12}      | ${20}     | ${2500} | ${14583.33}
    ${"Agents de maîtrise et techniciens"}            | ${true}          | ${50} | ${8 / 12}      | ${20}     | ${2500} | ${17500}
    ${"Agents de maîtrise et techniciens"}            | ${true}          | ${51} | ${8 / 12}      | ${20}     | ${2500} | ${17500}
    ${"Agents de maîtrise et techniciens"}            | ${true}          | ${53} | ${8 / 12}      | ${8}      | ${2500} | ${6000}
    ${"Cadres"}                                       | ${false}         | ${45} | ${8 / 12}      | ${0.91}   | ${2500} | ${568.75}
    ${"Cadres"}                                       | ${false}         | ${45} | ${8 / 12}      | ${5}      | ${2500} | ${3125}
    ${"Cadres"}                                       | ${false}         | ${45} | ${8 / 12}      | ${6}      | ${2500} | ${4500}
    ${"Cadres"}                                       | ${false}         | ${45} | ${8 / 12}      | ${15}     | ${2500} | ${12500}
    ${"Cadres"}                                       | ${false}         | ${45} | ${8 / 12}      | ${22}     | ${2500} | ${20000}
    ${"Cadres"}                                       | ${false}         | ${45} | ${8 / 12}      | ${38}     | ${2500} | ${30000}
    ${"Cadres"}                                       | ${false}         | ${45} | ${8 / 12}      | ${40}     | ${2500} | ${30000}
    ${"Cadres"}                                       | ${false}         | ${45} | ${8 / 12}      | ${41}     | ${2500} | ${30833.33}
    ${"Cadres"}                                       | ${true}          | ${33} | ${8 / 12}      | ${5}      | ${2500} | ${3125}
    ${"Cadres"}                                       | ${true}          | ${40} | ${8 / 12}      | ${15}     | ${2500} | ${12500}
    ${"Cadres"}                                       | ${true}          | ${50} | ${8 / 12}      | ${22}     | ${2500} | ${24000}
    ${"Cadres"}                                       | ${true}          | ${58} | ${8 / 12}      | ${38}     | ${2500} | ${36000}
    ${"Cadres"}                                       | ${true}          | ${55} | ${8 / 12}      | ${40}     | ${2500} | ${36000}
    ${"Cadres"}                                       | ${true}          | ${50} | ${8 / 12}      | ${41}     | ${2500} | ${37000}
  `(
    "$#) ancienneté: $seniority an, age $age ans, salaire de référence: $salary, catégorie $category & licenciement économique: $isEconomicFiring => $expectedCompensation €",
    ({
      category,
      isEconomicFiring,
      age,
      seniority,
      seniorityRight,
      salary,
      expectedCompensation,
    }) => {
      const { result, missingArgs } = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC2216'",
          "contrat salarié . convention collective . commerce gros et detail alimentation . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
          "contrat salarié . convention collective . commerce gros et detail alimentation . indemnité de licenciement . catégorie professionnelle . licenciement économique":
            isEconomicFiring ? `'Oui'` : `'Non'`,
          "contrat salarié . convention collective . commerce gros et detail alimentation . indemnité de licenciement . catégorie professionnelle . licenciement économique . age":
            age,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniorityRight,
          "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
            "non",
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            salary,
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
      expect(missingArgs).toEqual([]);
      expect(result.unit?.numerators).toEqual(["€"]);
      expect(result.value).toEqual(expectedCompensation);
    }
  );
  test.each`
    category                                          | expectedCompensation
    ${"Employés et ouvriers, personnel de livraison"} | ${5666.67}
    ${"Agents de maîtrise et techniciens"}            | ${5666.67}
    ${"Cadres"}                                       | ${6800}
  `(
    "Si l'inaptitude suite à un accident ou maladie professionnelle' alors pas de question pour motif eco for catégorie $category => $expectedCompensation €",
    ({ category, expectedCompensation }) => {
      const { result, missingArgs } = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC2216'",
          "contrat salarié . convention collective . commerce gros et detail alimentation . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            "11",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            "11",
          "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
            "oui",
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "2000",
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
      expect(missingArgs).toEqual([]);
      expect(result.unit?.numerators).toEqual(["€"]);
      expect(result.value).toEqual(expectedCompensation);
    }
  );
});
