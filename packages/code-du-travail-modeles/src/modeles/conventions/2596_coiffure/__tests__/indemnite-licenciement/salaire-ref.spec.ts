import { ReferenceSalary2596 } from "../../salary";

describe("Calcul du salaire pour la CC 2596", () => {
  const ReferenceSalary = new ReferenceSalary2596();

  it("Cas d'usage basique", () => {
    expect(
      ReferenceSalary.computeReferenceSalary({
        salaires: [
          { month: "janvier", value: 2000 },
          { month: "février", value: 2000 },
          { month: "mars", value: 2000 },
        ],
        salairesPendantPreavis: [],
      })
    ).toEqual(2000);
  });
  it("Avec des primes pendant le préavis", () => {
    expect(
      ReferenceSalary.computeReferenceSalary({
        salaires: [{ month: "janvier", value: 2000 }],
        salairesPendantPreavis: [
          { month: "février", prime: 1000, value: 2000 },
        ],
      })
    ).toEqual(2500);
  });

  it("Avec un salaire différent sur deux mois", () => {
    expect(
      ReferenceSalary.computeReferenceSalary({
        salaires: [
          { month: "février", value: 2000 },
          { month: "janvier", value: 2000 },
        ],
        salairesPendantPreavis: [
          { month: "avril", value: 5000 },
          { month: "mars", value: 5000 },
        ],
      })
    ).toEqual(3500);
  });

  it("Avec un salaire différent sur 1 mois de préavis", () => {
    expect(
      ReferenceSalary.computeReferenceSalary({
        salaires: [
          { month: "décembre", value: 2000 },
          { month: "novembre", value: 2000 },
          { month: "octobre", value: 2000 },
          { month: "septembre", value: 2000 },
          { month: "aout", value: 2000 },
          { month: "juillet", value: 2000 },
          { month: "juin", value: 2000 },
          { month: "mai", value: 2000 },
          { month: "avril", value: 2000 },
          { month: "mars", value: 2000 },
          { month: "février", value: 2000 },
          { month: "janvier", value: 2000 },
        ],
        salairesPendantPreavis: [
          { month: "janvier", prime: 2500, value: 1500 },
        ],
      })
    ).toEqual(2166.6666666666665);
  });

  it("Avec un salaire différent sur trois mois et trois primes", () => {
    expect(
      ReferenceSalary.computeReferenceSalary({
        salaires: [
          { month: "mars", value: 2500 },
          { month: "février", value: 2500 },
          { month: "janvier", value: 2500 },
        ],
        salairesPendantPreavis: [{ month: "avril", prime: 60, value: 2500 }],
      })
    ).toEqual(2515);
  });
});
