import { ReferenceSalary2148 } from "../../salary";

describe("Calcul du salaire pour la CC 2148", () => {
  const ReferenceSalary = new ReferenceSalary2148();

  it("Sans préavis", () => {
    expect(
      ReferenceSalary.computeReferenceSalary({
        salaires: [
          { month: "janvier", value: 2644 },
          { month: "février", value: 2690 },
          { month: "mars", value: 2885 },
          { month: "avril", value: 2818 },
          { month: "mai", value: 2698 },
          { month: "juin", value: 2631 },
          { month: "juillet", value: 2760 },
          { month: "août", value: 2626 },
          { month: "septembre", value: 2818 },
          { month: "octobre", value: 2870 },
          { month: "novembre", value: 2668 },
          { month: "décembre", value: 2688 },
        ],
        salairesPendantPreavis: [],
      })
    ).toEqual(32796);
  });
  it("Avec préavis", () => {
    expect(
      ReferenceSalary.computeReferenceSalary({
        salaires: [
          { month: "janvier", value: 2644 },
          { month: "février", value: 2690 },
          { month: "mars", value: 2885 },
          { month: "avril", value: 2818 },
          { month: "mai", value: 2698 },
          { month: "juin", value: 2631 },
          { month: "juillet", value: 2760 },
          { month: "août", value: 2626 },
          { month: "septembre", value: 2818 },
          { month: "octobre", value: 2870 },
          { month: "novembre", value: 2668 },
          { month: "décembre", value: 2688 },
        ],
        salairesPendantPreavis: [
          { month: "janvier", value: 2886 },
          { month: "février", value: 2801 },
        ],
      })
    ).toEqual(33149);
  });
});
