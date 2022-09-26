import { ReferenceSalary650 } from "../../../plugins/salaire-reference/650_metallurgie_ingenieurs_cadres";

describe("Calcul du salaire pour la CC 650", () => {
  const ReferenceSalary = new ReferenceSalary650();
  describe("Cas standard", () => {
    test.each`
      seniority | salaries                                                                                                                                      | expectedResult
      ${1}      | ${[]}                                                                                                                                         | ${0}
      ${1}      | ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }]}                                                                     | ${2500}
      ${1}      | ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, { month: "mars", value: 4000 }, { month: "avril", value: 1000000 }]} | ${252250}
      ${1}      | ${[{ month: "avril", value: 2200 }, { month: "février", value: 2200 }, { month: "mars", value: 2200 }, { month: "janvier", value: 2500 }]}    | ${2275}
      ${9}      | ${[]}                                                                                                                                         | ${0}
      ${9}      | ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }]}                                                                     | ${2500}
      ${9}      | ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, { month: "mars", value: 4000 }, { month: "avril", value: 1000000 }]} | ${335666.6666666667}
      ${9}      | ${[{ month: "janvier", value: 2500 }, { month: "février", value: 2200 }, { month: "mars", value: 2200 }, { month: "avril", value: 2200 }]}    | ${2275}
    `(
      "Salaires : $salaries => $expectedResult €",
      ({ salaries, seniority, expectedResult }) => {
        expect(
          ReferenceSalary.computeReferenceSalary({
            salaires: salaries,
            seniority,
          })
        ).toEqual(expectedResult);
      }
    );
  });
});
