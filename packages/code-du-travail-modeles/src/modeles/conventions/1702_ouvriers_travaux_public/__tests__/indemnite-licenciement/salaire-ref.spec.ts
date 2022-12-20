import { ReferenceSalary1702 } from "../../salary";

describe("Calcul du salaire pour la CC 1702", () => {
  const ReferenceSalary = new ReferenceSalary1702();

  it("Cas d'usage basique", () => {
    expect(
      ReferenceSalary.computeReferenceSalary({
        salaires: [{ month: "janvier", value: 2000 }],
      })
    ).toEqual(2000);
  });
  it("Avec une prime", () => {
    expect(
      ReferenceSalary.computeReferenceSalary({
        salaires: [{ month: "février", prime: 27000, value: 2000 }],
      })
    ).toEqual(2916.6666666666665);
  });

  it("Meilleur salaire : 12 mois", () => {
    expect(
      ReferenceSalary.computeReferenceSalary({
        salaires: [
          { month: "décembre", value: 1700 },
          { month: "novembre", value: 1700 },
          { month: "octobre", value: 1700 },
          { month: "septembre", value: 1700 },
          { month: "aout", value: 2500 },
          { month: "juillet", value: 2500 },
          { month: "juin", value: 2500 },
          { month: "mai", value: 1700 },
          { month: "avril", value: 1700 },
          { month: "mars", value: 1700 },
          { month: "février", value: 1700 },
          { month: "janvier", value: 1700 },
        ],
      })
    ).toEqual(1900);
  });
  it("Meilleur salaire : 3 derniers mois", () => {
    expect(
      ReferenceSalary.computeReferenceSalary({
        salaires: [
          { month: "décembre", value: 12000 },
          { month: "novembre", value: 1700 },
          { month: "octobre", value: 1700 },
          { month: "septembre", value: 1700 },
          { month: "aout", value: 2500 },
          { month: "juillet", value: 2500 },
          { month: "juin", value: 2500 },
          { month: "mai", value: 1700 },
          { month: "avril", value: 1700 },
          { month: "mars", value: 1700 },
          { month: "février", value: 1700 },
          { month: "janvier", value: 1700 },
        ],
      })
    ).toEqual(4000);
  });

  it("Meilleur salaire : 3 derniers mois grace à la prime", () => {
    expect(
      ReferenceSalary.computeReferenceSalary({
        salaires: [
          { month: "décembre", prime: 33100, value: 1700 },
          { month: "novembre", value: 1700 },
          { month: "octobre", value: 1700 },
          { month: "septembre", value: 1700 },
          { month: "aout", value: 2500 },
          { month: "juillet", value: 2500 },
          { month: "juin", value: 2500 },
          { month: "mai", value: 1700 },
          { month: "avril", value: 1700 },
          { month: "mars", value: 1700 },
          { month: "février", value: 1700 },
          { month: "janvier", value: 1700 },
        ],
      })
    ).toEqual(3325);
  });
});
