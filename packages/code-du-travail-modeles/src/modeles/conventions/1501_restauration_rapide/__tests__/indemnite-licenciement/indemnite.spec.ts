import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1501"
);

describe("Indemnité conventionnel de licenciement pour la CC 1501", () => {
  describe("Autres licenciements", () => {
    test.each`
      category        | seniority  | salary  | expectedCompensation
      ${"Non-cadres"} | ${1}       | ${2300} | ${0}
      ${"Non-cadres"} | ${2}       | ${2300} | ${460}
      ${"Non-cadres"} | ${3}       | ${2300} | ${690}
      ${"Non-cadres"} | ${15}      | ${2300} | ${4216.67}
      ${"Non-cadres"} | ${17}      | ${2300} | ${6056.67}
      ${"Cadres"}     | ${11 / 12} | ${3100} | ${0}
      ${"Cadres"}     | ${1}       | ${3100} | ${310}
      ${"Cadres"}     | ${5}       | ${3100} | ${1550}
      ${"Cadres"}     | ${23}      | ${3100} | ${22320}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, catégorie $category => $expectedCompensation €",
      ({ category, seniority, salary, expectedCompensation }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1501'",
            "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
            "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . licenciement économique": `'Non'`,
            "contrat salarié . indemnité de licenciement": "oui",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . ancienneté requise en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(missingArgs).toEqual([]);
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.value).toEqual(expectedCompensation);
      }
    );
  });
  describe("Licenciement économique", () => {
    test.each`
      category        | age   | seniority  | salary  | expectedCompensation
      ${"Non-cadres"} | ${50} | ${23 / 12} | ${2600} | ${0}
      ${"Non-cadres"} | ${50} | ${2}       | ${2600} | ${520}
      ${"Non-cadres"} | ${50} | ${7}       | ${2600} | ${1820}
      ${"Non-cadres"} | ${49} | ${13}      | ${2600} | ${3900}
      ${"Non-cadres"} | ${49} | ${16}      | ${2600} | ${6240}
      ${"Non-cadres"} | ${55} | ${7}       | ${2600} | ${1820}
      ${"Non-cadres"} | ${55} | ${13}      | ${2600} | ${4485}
      ${"Non-cadres"} | ${55} | ${16}      | ${2600} | ${7176}
      ${"Cadres"}     | ${48} | ${11 / 12} | ${3100} | ${0}
      ${"Cadres"}     | ${48} | ${1}       | ${3100} | ${310}
      ${"Cadres"}     | ${48} | ${5}       | ${3100} | ${1550}
      ${"Cadres"}     | ${48} | ${23}      | ${3100} | ${22320}
      ${"Cadres"}     | ${51} | ${11 / 12} | ${3100} | ${0}
      ${"Cadres"}     | ${51} | ${1}       | ${3100} | ${310}
      ${"Cadres"}     | ${51} | ${5}       | ${3100} | ${1550}
      ${"Cadres"}     | ${51} | ${23}      | ${3100} | ${25668}
      ${"Cadres"}     | ${50} | ${23}      | ${3100} | ${25668}
      ${"Cadres"}     | ${55} | ${23}      | ${3100} | ${25668}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, age: $age an, catégorie $category => $expectedCompensation €",
      ({ category, age, seniority, salary, expectedCompensation }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1501'",
            "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
            "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . licenciement économique": `'Oui'`,
            "contrat salarié . convention collective . restauration rapide . indemnité de licenciement . licenciement économique . age": age,
            "contrat salarié . indemnité de licenciement": "oui",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . ancienneté requise en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(missingArgs).toEqual([]);
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.value).toEqual(expectedCompensation);
      }
    );
  });
});
