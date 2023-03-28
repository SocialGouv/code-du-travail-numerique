import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2614"
);

describe("CC 2614", () => {
  describe("Calcul de l'indemnité de licenciement", () => {
    test.each`
      seniorityRight | seniority | salaireRef | age   | expectedCompensation
      ${0}           | ${0}      | ${2624}    | ${0}  | ${0}
      ${1.5}         | ${2}      | ${2624}    | ${55} | ${0}
      ${2}           | ${15}     | ${2624}    | ${55} | ${9840}
      ${2}           | ${24}     | ${2624}    | ${55} | ${18105.6}
      ${1.5}         | ${2}      | ${2624}    | ${59} | ${0}
      ${2}           | ${15}     | ${2624}    | ${59} | ${10824}
      ${2}           | ${24}     | ${2624}    | ${59} | ${19916.16}
      ${1.5}         | ${2}      | ${2624}    | ${67} | ${0}
      ${2}           | ${15}     | ${2624}    | ${67} | ${7216}
      ${2}           | ${24}     | ${2624}    | ${67} | ${13120}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef €, age $age => une compensation de base de $expectedCompensation €",
      ({
        salaireRef,
        expectedCompensation,
        seniority,
        seniorityRight,
        age,
      }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC2614'",
            "contrat salarié . convention collective . travaux publics . age":
              age,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salaireRef,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(missingArgs).toEqual([]);
        expect(result.value).toEqual(expectedCompensation);
      }
    );
  });
});
