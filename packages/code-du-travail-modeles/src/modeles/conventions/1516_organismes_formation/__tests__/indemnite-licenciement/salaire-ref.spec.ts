import { ReferenceSalary1516 } from "../../salary";

describe("Calcul du salaire pour la CC 1516", () => {
  const ReferenceSalary = new ReferenceSalary1516();
  const TEST_UN_SALAIRE = {
    salaires: [{ month: "janvier", value: 2000 }],
    salairesPendantPreavis: [],
  };

  const TEST_MULTIPLE_SALAIRES = {
    salaires: [
      { month: "janvier", value: 2000 },
      { month: "février", value: 3000 },
      { month: "mars", value: 2000 },
    ],
    salairesPendantPreavis: [],
  };
  const TEST_MULTIPLE_WITH_PRIME_SALAIRES = {
    salaires: [
      { month: "janvier", value: 2000 },
      { month: "février", value: 3000, prime: 960 },
      { month: "mars", value: 2000 },
    ],
    salairesPendantPreavis: [],
  };
  const TEST_ONE_SALAIRE_PREAVIS = {
    salaires: [
      { month: "janvier", value: 2000 },
      { month: "février", value: 3000 },
      { month: "mars", value: 2000 },
    ],
    salairesPendantPreavis: [{ month: "janvier", value: 3500 }],
  };
  const TEST_MULTIPLE_SALAIRE_PREAVIS = {
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
  const TEST_MULTIPLE_WITH_PRIME_SALAIRE_PREAVIS = {
    salaires: [
      { month: "janvier", value: 2000 },
      { month: "février", value: 5000 },
      { month: "mars", value: 2000 },
    ],
    salairesPendantPreavis: [
      { month: "janvier", value: 3500, prime: 960 },
      { month: "février", value: 3000 },
      { month: "mars", value: 2000 },
    ],
  };

  const TEST_MULTIPLE_SALAIRE_PREAVIS_BUT_LAST_SALARY_HIGER = {
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
  test.each`
    salaires                                               | expectedSalary
    ${TEST_UN_SALAIRE}                                     | ${2000}
    ${TEST_MULTIPLE_SALAIRES}                              | ${3000}
    ${TEST_MULTIPLE_WITH_PRIME_SALAIRES}                   | ${3080}
    ${TEST_ONE_SALAIRE_PREAVIS}                            | ${3500}
    ${TEST_MULTIPLE_SALAIRE_PREAVIS}                       | ${3500}
    ${TEST_MULTIPLE_WITH_PRIME_SALAIRE_PREAVIS}            | ${3580}
    ${TEST_MULTIPLE_SALAIRE_PREAVIS_BUT_LAST_SALARY_HIGER} | ${5000}
  `("$# $expectedSalary €", ({ salaires, expectedSalary }) => {
    expect(ReferenceSalary.computeReferenceSalary(salaires)).toEqual(
      expectedSalary
    );
  });
});
