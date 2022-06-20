import { SalaireReferenceLegal } from "../legal";

describe("Calcul du salaire de référence légal", () => {
  const SalaireReference = new SalaireReferenceLegal();

  it("Cas d'usage basique", () => {
    expect(
      SalaireReference.computeReferenceSalary({
        hasSameSalaire: true,
        primes: [],
        salaire: 2000,
        salaires: [],
      })
    ).toEqual(2000);
  });
  it("Avec des primes", () => {
    expect(
      SalaireReference.computeReferenceSalary({
        hasSameSalaire: true,
        primes: [4000, 3000, 20000],
        salaire: 2000,
        salaires: [],
      })
    ).toEqual(2000);
  });

  it("Avec un salaire différent sur deux mois", () => {
    expect(
      SalaireReference.computeReferenceSalary({
        hasSameSalaire: false,
        primes: [],
        salaire: undefined,
        salaires: [
          { month: "janvier", value: 3000 },
          { month: "février", value: 2000 },
        ],
      })
    ).toEqual(2500);
  });

  it("Avec un salaire différent sur deux mois et une prime", () => {
    expect(
      SalaireReference.computeReferenceSalary({
        hasSameSalaire: false,
        primes: [2500],
        salaire: undefined,
        salaires: [
          { month: "janvier", value: 3000 },
          { month: "février", value: 2500 },
          { month: "mars", value: 2500 },
          { month: "avril", value: 1700 },
          { month: "mai", value: 1700 },
          { month: "juin", value: 1700 },
          { month: "juillet", value: 1700 },
          { month: "aout", value: 2500 },
          { month: "septembre", value: 1700 },
          { month: "octobre", value: 1700 },
          { month: "novembre", value: 1700 },
          { month: "décembre", value: 1700 },
        ],
      })
    ).toEqual(2041.6666666666665);
  });

  it("Avec un salaire différent sur trois mois et trois primes", () => {
    expect(
      SalaireReference.computeReferenceSalary({
        hasSameSalaire: false,
        primes: [20, 20, 20],
        salaire: undefined,
        salaires: [
          { month: "janvier", value: 3000 },
          { month: "février", value: 2500 },
          { month: "mars", value: 2500 },
        ],
      })
    ).toEqual(2666.6666666666665);
  });
});
