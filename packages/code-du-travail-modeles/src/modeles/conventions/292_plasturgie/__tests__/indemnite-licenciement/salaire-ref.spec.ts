import { ReferenceSalary292 } from "../../salary";

describe("Calcul du salaire pour la CC 292", () => {
  const ReferenceSalary = new ReferenceSalary292();

  const UN_SALAIRE = {
    salaires: [{ month: "janvier", value: 2000 }],
  };

  const MULTIPLE_SALAIRES = {
    salaires: [
      { month: "septembre", value: 1000 },
      { month: "aout", value: 1000 },
      { month: "juillet", value: 1000 },
      { month: "juin", value: 4000 },
      { month: "mai", value: 4000 },
      { month: "avril", value: 4000 },
      { month: "mars", value: 1000 },
      { month: "février", value: 1000 },
      { month: "janvier", value: 1000 },
    ],
  };

  const MULTIPLE_SALAIRES_WITH_PRIME = {
    salaires: [
      { month: "septembre", prime: 960, value: 4000 },
      { month: "aout", prime: 960, value: 4000 },
      { month: "juillet", value: 4000 },
      { month: "juin", value: 4000 },
      { month: "mai", value: 1000 },
      { month: "avril", value: 1000 },
      { month: "mars", value: 1000 },
      { month: "février", value: 1000 },
      { month: "janvier", value: 1000 },
    ],
  };
  const MULTIPLE_SALAIRE_3_LAST_BEST = {
    salaires: [
      { month: "septembre", value: 2000 },
      { month: "aout", value: 5000 },
      { month: "juillet", value: 5000 },
      { month: "juin", value: 4000 },
      { month: "mai", value: 1000 },
      { month: "avril", value: 1000 },
      { month: "janvier", value: 1000 },
      { month: "février", value: 1000 },
      { month: "mars", value: 1000 },
    ],
  };
  const MULTIPLE_SALAIRE_3_LAST_BEST_WITH_PRIME = {
    salaires: [
      { month: "septembre", prime: 960, value: 2000 },
      { month: "aout", prime: 960, value: 5000 },
      { month: "juillet", value: 5000 },
      { month: "juin", value: 4000 },
      { month: "mai", value: 1000 },
      { month: "avril", value: 1000 },
      { month: "janvier", value: 1000 },
      { month: "février", value: 1000 },
      { month: "mars", value: 1000 },
    ],
  };

  const MULTIPLE_SALAIRE_LAST_SALARY_BEST = {
    salaires: [
      { month: "septembre", value: 9000 },
      { month: "aout", value: 5000 },
      { month: "juillet", value: 5000 },
      { month: "juin", value: 5000 },
      { month: "mai", value: 5000 },
      { month: "avril", value: 5000 },
      { month: "mars", value: 5000 },
      { month: "février", value: 5000 },
      { month: "janvier", value: 5000 },
    ],
  };

  const MULTIPLE_SALAIRE_LAST_SALARY_BEST_WITH_PRIME = {
    salaires: [
      { month: "septembre", prime: 600, value: 9000 },
      { month: "aout", value: 5000 },
      { month: "juillet", value: 5000 },
      { month: "juin", value: 5000 },
      { month: "mai", value: 5000 },
      { month: "avril", value: 5000 },
      { month: "mars", value: 5000 },
      { month: "février", value: 5000 },
      { month: "janvier", value: 2000 },
    ],
  };

  test.each`
    salaires                                        | expectedSalary
    ${UN_SALAIRE}                                   | ${2000}
    ${MULTIPLE_SALAIRES}                            | ${2000}
    ${MULTIPLE_SALAIRES_WITH_PRIME}                 | ${3520}
    ${MULTIPLE_SALAIRE_3_LAST_BEST}                 | ${4000}
    ${MULTIPLE_SALAIRE_3_LAST_BEST_WITH_PRIME}      | ${3520}
    ${MULTIPLE_SALAIRE_LAST_SALARY_BEST}            | ${9000}
    ${MULTIPLE_SALAIRE_LAST_SALARY_BEST_WITH_PRIME} | ${8450}
  `("$# $expectedSalary €", ({ salaires, expectedSalary }) => {
    expect(ReferenceSalary.computeReferenceSalary(salaires)).toEqual(
      expectedSalary
    );
  });
});
