import { ReferenceSalaryLegal } from "../legal";

describe("Calcul du salaire de référence légal", () => {
  const ReferenceSalary = new ReferenceSalaryLegal();

  it("Cas d'usage basique", () => {
    expect(
      ReferenceSalary.computeReferenceSalary({
        hasSameSalaire: true,
        primes: [],
        salaire: 2000,
        salaires: [],
      })
    ).toEqual(2000);
  });
  it("Avec des primes", () => {
    expect(
      ReferenceSalary.computeReferenceSalary({
        hasSameSalaire: true,
        primes: [4000, 3000, 20000],
        salaire: 2000,
        salaires: [],
      })
    ).toEqual(2000);
  });

  it("Avec un salaire différent sur deux mois", () => {
    expect(
      ReferenceSalary.computeReferenceSalary({
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
      ReferenceSalary.computeReferenceSalary({
        hasSameSalaire: false,
        primes: [2500],
        salaire: undefined,
        salaires: [
          { month: "janvier 2021", value: 1700 },
          { month: "décembre 2020", value: 1700 },
          { month: "novembre 2020", value: 1700 },
          { month: "octobre 2020", value: 1700 },
          { month: "septembre 2020", value: 2500 },
          { month: "août 2020", value: 1700 },
          { month: "juillet 2020", value: 1700 },
          { month: "juin 2020", value: 1700 },
          { month: "mai 2020", value: 1700 },
          { month: "avril 2020", value: 2500 },
          { month: "mars 2020", value: 2500 },
          { month: "février 2020", value: 3000 },
        ],
      })
    ).toEqual(2008.3333333333333);
  });

  it("Avec un salaire différent sur deux mois et une prime et si on change l'ordre des salaires", () => {
    expect(
      ReferenceSalary.computeReferenceSalary({
        hasSameSalaire: false,
        primes: [2500],
        salaire: undefined,
        salaires: [
          { month: "juillet 2020", value: 1700 },
          { month: "avril 2020", value: 2500 },
          { month: "janvier 2021", value: 1700 },
          { month: "novembre 2020", value: 1700 },
          { month: "octobre 2020", value: 1700 },
          { month: "février 2020", value: 3000 },
          { month: "septembre 2020", value: 2500 },
          { month: "août 2020", value: 1700 },
          { month: "juin 2020", value: 1700 },
          { month: "mai 2020", value: 1700 },
          { month: "mars 2020", value: 2500 },
          { month: "décembre 2020", value: 1700 },
        ],
      })
    ).toEqual(2008.3333333333333);
  });

  it("Avec un salaire différent sur trois mois et trois primes", () => {
    expect(
      ReferenceSalary.computeReferenceSalary({
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
