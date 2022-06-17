import { computeReferenceSalaryLegal } from "..";

describe("computeReferenceSalaryLegal", () => {
  it("should compute reference salary for a basic use case", () => {
    expect(
      computeReferenceSalaryLegal({
        hasSameSalaire: true,
        primes: [],
        salaire: 2000,
        salaires: [],
      })
    ).toEqual(2000);
  });
  it("should compute reference salary for a basic use case with primes", () => {
    expect(
      computeReferenceSalaryLegal({
        hasSameSalaire: true,
        primes: [4000, 3000, 20000],
        salaire: 2000,
        salaires: [],
      })
    ).toEqual(2000);
  });

  it("should compute reference salary if salaire is different between 2 months", () => {
    expect(
      computeReferenceSalaryLegal({
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

  it("should compute reference salary if salaire is different between 2 months with primes", () => {
    expect(
      computeReferenceSalaryLegal({
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

  it("should compute reference salary if salaire is different between 2 months with primes for 3 months", () => {
    expect(
      computeReferenceSalaryLegal({
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
