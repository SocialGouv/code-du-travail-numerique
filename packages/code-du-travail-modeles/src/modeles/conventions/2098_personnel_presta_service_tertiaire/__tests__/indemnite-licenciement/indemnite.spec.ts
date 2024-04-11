import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2098"
);

describe("Calcul de l'indemnité de licenciement CC 2098", () => {
  describe("Licenciement pour inaptitude non professionnelle", () => {
    test.each`
      seniorityRight | seniority | expectedCompensation
      ${7 / 12}      | ${7 / 12} | ${0}
      ${7 / 12}      | ${8 / 12} | ${0}
      ${8 / 12}      | ${0.67}   | ${469}
      ${8 / 12}      | ${20}     | ${16333.33}
    `(
      "Avec une ancienneté $seniority ans et salaire de ref 2800€ => une compensation de base de $expectedCompensation €",
      ({ expectedCompensation, seniority, seniorityRight }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC2098'",
            "contrat salarié . convention collective . personnel presta service tertiaire . inaptitude suite à un accident non professionnelle":
              "'Oui'",

            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              "2800",
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );

        expect(missingArgs).toEqual([]);
        expect(result?.value).toEqual(expectedCompensation);
        expect(result?.unit?.numerators).toEqual(["€"]);
      }
    );
  });

  describe("Autre licenciement", () => {
    test.each`
      seniorityRight | seniority  | expectedCompensation
      ${23 / 12}     | ${23 / 12} | ${0}
      ${23 / 12}     | ${2}       | ${0}
      ${2}           | ${2}       | ${560}
      ${2}           | ${7}       | ${2200}
      ${2}           | ${14}      | ${5640}
      ${2}           | ${22}      | ${10400}
      ${2}           | ${33}      | ${18800}
      ${2}           | ${52}      | ${33600}
    `(
      "Non-cadres, Avec une ancienneté $seniority ans et salaire de ref 2800€ => une compensation de base de $expectedCompensation €",
      ({ expectedCompensation, seniority, seniorityRight }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC2098'",
            "contrat salarié . convention collective . personnel presta service tertiaire . autre licenciement . catégorie professionnelle":
              "'Non-cadres'",
            "contrat salarié . convention collective . personnel presta service tertiaire . inaptitude suite à un accident non professionnelle":
              "'Non'",

            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              "2800",
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );

        expect(missingArgs).toEqual([]);
        expect(result?.value).toEqual(expectedCompensation);
        expect(result?.unit?.numerators).toEqual(["€"]);
      }
    );

    test.each`
      seniorityRight | seniority  | age   | salaireRef | expectedCompensation
      ${23 / 12}     | ${23 / 12} | ${35} | ${3706}    | ${0}
      ${23 / 12}     | ${2}       | ${35} | ${3706}    | ${0}
      ${2}           | ${2}       | ${35} | ${3706}    | ${2223.6}
      ${2}           | ${7}       | ${35} | ${3706}    | ${8523.8}
      ${2}           | ${14}      | ${35} | ${3706}    | ${20383}
      ${2}           | ${22}      | ${35} | ${3706}    | ${37801.2}
      ${2}           | ${33}      | ${35} | ${3706}    | ${62260.8}
      ${23 / 12}     | ${23 / 12} | ${54} | ${3706}    | ${0}
      ${23 / 12}     | ${2}       | ${54} | ${3706}    | ${0}
      ${2}           | ${2}       | ${54} | ${3706}    | ${2445.96}
      ${2}           | ${7}       | ${54} | ${3706}    | ${9376.18}
      ${2}           | ${14}      | ${54} | ${3706}    | ${22421.3}
      ${2}           | ${22}      | ${54} | ${3706}    | ${41581.32}
      ${2}           | ${33}      | ${54} | ${3706}    | ${66708}
      ${23 / 12}     | ${23 / 12} | ${57} | ${3706}    | ${0}
      ${23 / 12}     | ${2}       | ${57} | ${3706}    | ${0}
      ${2}           | ${2}       | ${57} | ${3706}    | ${2779.5}
      ${2}           | ${7}       | ${57} | ${3706}    | ${10654.75}
      ${2}           | ${14}      | ${57} | ${3706}    | ${25478.75}
      ${2}           | ${22}      | ${57} | ${3706}    | ${47251.5}
      ${2}           | ${33}      | ${57} | ${3706}    | ${66708}
    `(
      "Cadres, avec une ancienneté $seniority ans, un age $age ans, un salaire de référence 3706€ => une compensation de base de $expectedCompensation €",
      ({
        salaireRef,
        expectedCompensation,
        seniority,
        seniorityRight,
        age,
      }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC2098'",
            "contrat salarié . convention collective . personnel presta service tertiaire . autre licenciement . cadres . age":
              age,
            "contrat salarié . convention collective . personnel presta service tertiaire . autre licenciement . catégorie professionnelle":
              "'Cadres'",
            "contrat salarié . convention collective . personnel presta service tertiaire . inaptitude suite à un accident non professionnelle":
              "'Non'",

            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salaireRef,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );

        expect(missingArgs).toEqual([]);
        expect(result?.value).toEqual(expectedCompensation);
        expect(result?.unit?.numerators).toEqual(["€"]);
      }
    );
  });
});
