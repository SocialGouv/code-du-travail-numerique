import { ReferenceSalary1606 } from "../../salary";

describe("Calcul du salaire pour la CC 1516", () => {
  const ReferenceSalary = new ReferenceSalary1606();
  const UN_SALAIRE = {
    salaires: [{ month: "janvier", value: 2000 }],
  };

  const SALAIRES_3_MOIS = {
    salaires: [
      { month: "janvier", value: 2000 },
      { month: "février", value: 3000 },
      { month: "mars", value: 2000 },
    ],
  };

  const SALAIRES_9_MOIS = {
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
  };
  const SALAIRES_1_AN_AVEC_PRIME = {
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
      { month: "octobre", value: 3487, prime: 600 },
      { month: "novembre", value: 2981 },
      { month: "décembre", value: 2898 },
    ],
  };

  test.each`
    salaires                    | expectedSalary
    ${UN_SALAIRE}               | ${2000}
    ${SALAIRES_3_MOIS}          | ${7000}
    ${SALAIRES_9_MOIS}          | ${11600}
    ${SALAIRES_1_AN_AVEC_PRIME} | ${36048}
  `("$# $expectedSalary €", ({ salaires, expectedSalary }) => {
    expect(ReferenceSalary.computeReferenceSalary(salaires)).toEqual(
      expectedSalary
    );
  });
});
