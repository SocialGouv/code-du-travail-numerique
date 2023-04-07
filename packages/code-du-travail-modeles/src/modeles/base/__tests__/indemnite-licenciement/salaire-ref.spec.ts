import {
  ReferenceSalaryFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../common";

describe("computeReferenceSalary", () => {
  const referenceSalary = new ReferenceSalaryFactory().create(
    SupportedCcIndemniteLicenciement.default
  );

  it("should compute reference salary for no values", () => {
    expect(
      referenceSalary.computeReferenceSalary({
        salaires: [],
      })
    ).toEqual(0);
  });

  it("should compute reference salary for a basic use case", () => {
    expect(
      referenceSalary.computeReferenceSalary({
        salaires: [{ month: "janvier", value: 2000 }],
      })
    ).toEqual(2000);
  });
  it("should compute reference salary for a basic use case with primes", () => {
    expect(
      referenceSalary.computeReferenceSalary({
        salaires: [{ month: "janvier", prime: 200, value: 2000 }],
      })
    ).toEqual(2000);
  });

  it("should compute reference salary if salaire is different between 2 months", () => {
    expect(
      referenceSalary.computeReferenceSalary({
        salaires: [
          { month: "janvier", value: 3000 },
          { month: "février", value: 2000 },
        ],
      })
    ).toEqual(2500);
  });

  it("should compute reference salary if salaire is different between 2 months with primes", () => {
    expect(
      referenceSalary.computeReferenceSalary({
        salaires: [
          { month: "janvier", prime: 2500, value: 3000 },
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
    ).toEqual(2008.3333333333333);
  });

  it("should compute reference salary if salaire is different between 2 months with primes for 3 months", () => {
    expect(
      referenceSalary.computeReferenceSalary({
        salaires: [
          { month: "janvier", prime: 20, value: 3000 },
          { month: "février", prime: 20, value: 2500 },
          { month: "mars", prime: 20, value: 2500 },
        ],
      })
    ).toEqual(2666.6666666666665);
  });
});
