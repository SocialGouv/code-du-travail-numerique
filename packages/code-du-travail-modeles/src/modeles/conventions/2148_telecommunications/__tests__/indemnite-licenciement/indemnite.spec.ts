import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2148"
);

describe("CC 2148", () => {
  describe("Calcul de l'indemnité de licenciement", () => {
    test.each`
      seniorityRight | seniority | salaireRef | age   | expectedCompensation
      ${11 / 12}     | ${2}      | ${32796}   | ${38} | ${0}
      ${1}           | ${9}      | ${32796}   | ${38} | ${8854.92}
      ${1}           | ${10}     | ${32796}   | ${38} | ${10166.76}
      ${1}           | ${17}     | ${32796}   | ${38} | ${19349.64}
      ${1}           | ${24}     | ${33149}   | ${38} | ${28839.63}
      ${1}           | ${27}     | ${36327}   | ${38} | ${33057.57}
      ${11 / 12}     | ${2}      | ${32796}   | ${50} | ${0}
      ${1}           | ${9}      | ${32796}   | ${50} | ${8854.92}
      ${1}           | ${10}     | ${32796}   | ${50} | ${11806.56}
      ${1}           | ${17}     | ${32796}   | ${50} | ${20989.44}
      ${1}           | ${24}     | ${33149}   | ${50} | ${32154.53}
      ${1}           | ${27}     | ${36327}   | ${50} | ${36690.27}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef €, un age: $age ans => une compensation de base de $expectedCompensation €",
      ({
        salaireRef,
        expectedCompensation,
        seniority,
        seniorityRight,
        age,
      }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC2148'",
            "contrat salarié . convention collective . télécommunications . age":
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
