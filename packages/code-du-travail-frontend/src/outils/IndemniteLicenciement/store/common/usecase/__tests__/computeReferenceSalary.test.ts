import { computeReferenceSalary } from "..";

describe("computeReferenceSalary", () => {
  it("should compute reference salary for a basic use case", () => {
    expect(
      computeReferenceSalary({
        hasSameSalaire: true,
        salaires: [],
        primes: [undefined],
        salaire: 2000,
      })
    ).toEqual(2000);
  });
  it("should compute reference salary for a basic use case with primes", () => {
    expect(
      computeReferenceSalary({
        hasSameSalaire: true,
        salaires: [],
        primes: [4000, 3000, 20000],
        salaire: 2000,
      })
    ).toEqual(2000);
  });

  it("should compute reference salary if salaire is different between 2 months", () => {
    expect(
      computeReferenceSalary({
        hasSameSalaire: false,
        salaires: [
          { month: "janvier", value: 3000 },
          { month: "février", value: 2000 },
        ],
        primes: [undefined],
        salaire: undefined,
      })
    ).toEqual(2500);
  });

  it("should compute reference salary if salaire is different between 2 months with primes", () => {
    expect(
      computeReferenceSalary({
        hasSameSalaire: false,
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
          { month: "décemebre", value: 1700 },
        ],
        primes: [2500],
        salaire: undefined,
      })
    ).toEqual(2041.6666666666665);
  });

  it("should compute reference salary if salaire is different between 2 months with primes for 3 months", () => {
    expect(
      computeReferenceSalary({
        hasSameSalaire: false,
        salaires: [
          { month: "janvier", value: 3000 },
          { month: "février", value: 2500 },
          { month: "mars", value: 2500 },
        ],
        primes: [20, 20, 20],
        salaire: undefined,
      })
    ).toEqual(2666.66666666666655);
  });
});
