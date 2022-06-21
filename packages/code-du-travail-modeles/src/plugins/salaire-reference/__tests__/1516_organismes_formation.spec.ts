import { ReferenceSalary1516 } from "../1516_organismes_formation";

describe("Calcul du salaire pour la CC 1516", () => {
  const ReferenceSalary = new ReferenceSalary1516();

  it("Cas d'usage basique", () => {
    expect(
      ReferenceSalary.computeReferenceSalary({
        hasSameSalaire: true,
        primesPendantPreavis: [],
        salaire: 2000,
        salaires: [],
        salairesPendantPreavis: [],
      })
    ).toEqual(2000);
  });
  it("Avec des primes", () => {
    expect(
      ReferenceSalary.computeReferenceSalary({
        hasSameSalaire: true,
        primesPendantPreavis: [4000, 3000, 20000],
        salaire: 2000,
        salaires: [],
        salairesPendantPreavis: [],
      })
    ).toEqual(4250);
  });

  it("Avec un salaire différent sur deux mois", () => {
    expect(
      ReferenceSalary.computeReferenceSalary({
        hasSameSalaire: false,
        primesPendantPreavis: [],
        salaire: undefined,
        salaires: [
          { month: "février", value: 2000 },
          { month: "janvier", value: 3000 },
        ],
        salairesPendantPreavis: [
          { month: "avril", value: 5000 },
          { month: "mars", value: 5000 },
        ],
      })
    ).toEqual(5000);
  });

  it("Avec un salaire différent sur deux mois et une prime", () => {
    expect(
      ReferenceSalary.computeReferenceSalary({
        hasSameSalaire: false,
        primesPendantPreavis: [2500],
        salaire: undefined,
        salaires: [
          { month: "décembre", value: 1700 },
          { month: "novembre", value: 1700 },
          { month: "octobre", value: 1700 },
          { month: "septembre", value: 1700 },
          { month: "aout", value: 2500 },
          { month: "juillet", value: 1700 },
          { month: "juin", value: 1700 },
          { month: "mai", value: 1700 },
          { month: "avril", value: 1700 },
          { month: "mars", value: 2500 },
          { month: "février", value: 2500 },
          { month: "janvier", value: 3000 },
        ],
        salairesPendantPreavis: [],
      })
    ).toEqual(2008.3333333333333);
  });

  it("Avec un salaire différent sur trois mois et trois primes", () => {
    expect(
      ReferenceSalary.computeReferenceSalary({
        hasSameSalaire: false,
        primesPendantPreavis: [20, 20, 20],
        salaire: undefined,
        salaires: [
          { month: "mars", value: 2500 },
          { month: "février", value: 2500 },
          { month: "janvier", value: 3000 },
        ],
        salairesPendantPreavis: [{ month: "avril", value: 2500 }],
      })
    ).toEqual(2666.6666666666665);
  });

  it("Avec un salaire différent sur trois mois et trois primes et salaires pendant le préavis", () => {
    expect(
      ReferenceSalary.computeReferenceSalary({
        hasSameSalaire: false,
        primesPendantPreavis: [20, 20, 20],
        salaire: undefined,
        salaires: [
          { month: "mars", value: 2500 },
          { month: "février", value: 2500 },
          { month: "janvier", value: 3000 },
        ],
        salairesPendantPreavis: [
          { month: "mai", value: 6000 },
          { month: "avril", value: 5000 },
        ],
      })
    ).toEqual(6005);
  });
});
