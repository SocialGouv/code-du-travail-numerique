import { ReferenceSalary1483 } from "../../salary";

describe("Calcul du salaire pour la CC 1483", () => {
  const ReferenceSalary = new ReferenceSalary1483();
  const UN_SALAIRE = {
    salaires: [{ month: "janvier", value: 2000 }],
    salairesPendantPreavis: [],
  };

  const MULTIPLE_SALAIRES = {
    salaires: [
      { month: "janvier", value: 2000 },
      { month: "février", value: 3000 },
      { month: "mars", value: 2000 },
    ],
    salairesPendantPreavis: [],
  };
  const MULTIPLE_WITH_PRIME_SALAIRES = {
    salaires: [
      { month: "janvier", value: 2000 },
      { month: "février", prime: 960, value: 3000 },
      { month: "mars", value: 2000 },
    ],
    salairesPendantPreavis: [],
  };
  const ONE_SALAIRE_PREAVIS = {
    salaires: [
      { month: "janvier", value: 2000 },
      { month: "février", value: 3000 },
      { month: "mars", value: 2000 },
    ],
    salairesPendantPreavis: [{ month: "janvier", value: 3500 }],
  };
  const MULTIPLE_SALAIRE_PREAVIS = {
    salaires: [
      { month: "septembre", value: 1000 },
      { month: "aout", value: 1000 },
      { month: "juillet", value: 1000 },
      { month: "juin", value: 1000 },
      { month: "mai", value: 1000 },
      { month: "avril", value: 1000 },
      { month: "mars", value: 1000 },
      { month: "février", value: 1000 },
      { month: "janvier", value: 3600 },
    ],
    salairesPendantPreavis: [
      { month: "décembre", value: 1000 },
      { month: "novembre", value: 3500 },
      { month: "octobre", value: 1000 },
    ],
  };
  const MULTIPLE_WITH_PRIME_SALAIRE_PREAVIS = {
    salaires: [
      { month: "janvier", value: 2000 },
      { month: "février", value: 5000 },
      { month: "mars", value: 2000 },
    ],
    salairesPendantPreavis: [
      { month: "janvier", prime: 960, value: 3500 },
      { month: "février", value: 3000 },
      { month: "mars", value: 2000 },
    ],
  };

  const MULTIPLE_SALAIRE_PREAVIS_BUT_LAST_SALARY_HIGER = {
    salaires: [
      { month: "septembre", value: 5000 },
      { month: "aout", value: 5000 },
      { month: "juillet", value: 5000 },
      { month: "juin", value: 5000 },
      { month: "mai", value: 5000 },
      { month: "avril", value: 5000 },
      { month: "mars", value: 5000 },
      { month: "février", value: 5000 },
      { month: "janvier", value: 5000 },
    ],
    salairesPendantPreavis: [
      { month: "décembre", value: 1000 },
      { month: "novembre", value: 3500 },
      { month: "octobre", value: 1000 },
    ],
  };

  const DIFFERENT_SALAIRES_WITH_PRIMES = {
    salaires: [
      { month: "janvier", value: 3010 },
      { month: "février", value: 2830 },
      { month: "mars", value: 3017 },
      { month: "avril", value: 3075 },
      { month: "mai", value: 2966 },
      { month: "juin", value: 3092 },
      { month: "juillet", value: 2758 },
      { month: "août", value: 3014 },
      { month: "septembre", value: 2920 },
      { month: "octobre", prime: 600, value: 3487 },
      { month: "novembre", value: 2981 },
      { month: "décembre", value: 2898 },
    ],
    salairesPendantPreavis: [],
  };
  test.each`
    salaires                                          | expectedSalary
    ${UN_SALAIRE}                                     | ${2000}
    ${MULTIPLE_SALAIRES}                              | ${2333.3333333333335}
    ${MULTIPLE_WITH_PRIME_SALAIRES}                   | ${2573.3333333333335}
    ${ONE_SALAIRE_PREAVIS}                            | ${2833.3333333333335}
    ${MULTIPLE_SALAIRE_PREAVIS}                       | ${1833.3333333333333}
    ${MULTIPLE_WITH_PRIME_SALAIRE_PREAVIS}            | ${3073.3333333333335}
    ${MULTIPLE_SALAIRE_PREAVIS_BUT_LAST_SALARY_HIGER} | ${5000}
    ${DIFFERENT_SALAIRES_WITH_PRIMES}                 | ${3272}
  `("$# $expectedSalary €", ({ salaires, expectedSalary }) => {
    expect(ReferenceSalary.computeReferenceSalary(salaires)).toEqual(
      expectedSalary
    );
  });
});
