import {
  ReferenceSalaryFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../../common";
import { CategoryPro44 } from "../../salary";

describe("Calcul du salaire pour la CC 44", () => {
  const factory = new ReferenceSalaryFactory();
  const sref = factory.create(SupportedCcIndemniteLicenciement.IDCC0044);
  describe("Ouvrier avec salaire variable", () => {
    test.each`
      salaries | expectedResult
      ${[]}    | ${0}
      ${[{ month: "janvier", value: 2000 }, {
    month: "février",
    value: 3000,
  }]} | ${416.6666666666667}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, {
    month: "mars",
    value: 4000,
  }]} | ${750}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, {
    month: "mars",
    value: 4000,
  }, {
    month: "avril",
    value: 1000000,
  }]} | ${84083.33333333333}
      ${[{ month: "janvier", value: 2500 }, { month: "février", value: 2200 }, {
    month: "mars",
    value: 2200,
  }, {
    month: "avril",
    value: 2200,
  }]} | ${758.3333333333334}
      ${[{ month: "avril", value: 2200 }, { month: "février", value: 2200 }, {
    month: "mars",
    value: 2200,
  }, {
    month: "janvier",
    value: 2500,
  }]} | ${758.3333333333334}
      ${[{ month: "janvier", value: 2493 }, { month: "février", value: 2631 }, {
    month: "mars",
    value: 2502,
  }, { month: "avril", value: 2683 }, { month: "mai", value: 2718 }, { month: "juin", value: 2778 }, {
    month: "juillet",
    value: 2534,
  }, { month: "aout", value: 2710 }, { month: "septembre", value: 2778 }, {
    month: "octobre",
    value: 2467,
  }, { month: "novembre", value: 2685 }, { month: "décembre", value: 2719 }]} | ${2641.5}
    `(
      "Salaires : $salaries => $expectedResult €",
      ({ salaries, expectedResult }) => {
        expect(
          sref.computeReferenceSalary({
            category: CategoryPro44.ouvrier,
            hasVariablePay: true,
            salaires: salaries,
          })
        ).toEqual(expectedResult);
      }
    );
  });

  describe("Ouvrier avec salaire non variable", () => {
    test.each`
      salaries | expectedResult
      ${[]}    | ${0}
      ${[{ month: "janvier", value: 2000 }, {
    month: "février",
    value: 3000,
  }]} | ${3000}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, {
    month: "mars",
    value: 4000,
  }]} | ${4000}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, {
    month: "mars",
    value: 4000,
  }, {
    month: "avril",
    value: 1000000,
  }]} | ${1000000}
      ${[{ month: "janvier", value: 2500 }, { month: "février", value: 2200 }, {
    month: "mars",
    value: 2200,
  }, {
    month: "avril",
    value: 2200,
  }]} | ${2200}
      ${[{ month: "avril", value: 2200 }, { month: "février", value: 2200 }, {
    month: "mars",
    value: 2200,
  }, {
    month: "janvier",
    value: 2500,
  }]} | ${2200}
      ${[{ month: "janvier", value: 2493 }, { month: "février", value: 2631 }, {
    month: "mars",
    value: 2502,
  }, { month: "avril", value: 2683 }, { month: "mai", value: 2718 }, { month: "juin", value: 2778 }, {
    month: "juillet",
    value: 2534,
  }, { month: "aout", value: 2710 }, { month: "septembre", value: 2778 }, {
    month: "octobre",
    value: 2467,
  }, { month: "novembre", value: 2685 }, { month: "décembre", value: 2719 }]} | ${2719}
    `(
      "Salaires : $salaries => $expectedResult €",
      ({ salaries, expectedResult }) => {
        expect(
          sref.computeReferenceSalary({
            category: CategoryPro44.ouvrier,
            hasVariablePay: false,
            salaires: salaries,
          })
        ).toEqual(expectedResult);
      }
    );
  });

  describe("Technicien avec salaire variable", () => {
    test.each`
      salaries | expectedResult
      ${[]}    | ${0}
      ${[{ month: "janvier", value: 2000 }, {
    month: "février",
    value: 3000,
  }]} | ${416.6666666666667}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, {
    month: "mars",
    value: 4000,
  }]} | ${750}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, {
    month: "mars",
    value: 4000,
  }, {
    month: "avril",
    value: 1000000,
  }]} | ${84083.33333333333}
      ${[{ month: "janvier", value: 2500 }, { month: "février", value: 2200 }, {
    month: "mars",
    value: 2200,
  }, {
    month: "avril",
    value: 2200,
  }]} | ${758.3333333333334}
      ${[{ month: "avril", value: 2200 }, { month: "février", value: 2200 }, {
    month: "mars",
    value: 2200,
  }, {
    month: "janvier",
    value: 2500,
  }]} | ${758.3333333333334}
      ${[{ month: "janvier", value: 3031 }, { month: "février", value: 3001 }, {
    month: "mars",
    value: 2875,
  }, { month: "avril", value: 3080 }, { month: "mai", value: 3091 }, { month: "juin", value: 3118 }, {
    month: "juillet",
    value: 2989,
  }, { month: "aout", value: 3167 }, { month: "septembre", value: 2928 }, {
    month: "octobre",
    value: 3154,
  }, { month: "novembre", value: 3084 }, { month: "décembre", value: 3140 }]} | ${3054.8333333333335}
    `(
      "Salaires : $salaries => $expectedResult €",
      ({ salaries, expectedResult }) => {
        expect(
          sref.computeReferenceSalary({
            category: CategoryPro44.techniciens,
            hasVariablePay: true,
            salaires: salaries,
          })
        ).toEqual(expectedResult);
      }
    );
  });

  describe("Technicien avec salaire non variable", () => {
    test.each`
      salaries | expectedResult
      ${[]}    | ${0}
      ${[{ month: "janvier", value: 2000 }, {
    month: "février",
    value: 3000,
  }]} | ${3000}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, {
    month: "mars",
    value: 4000,
  }]} | ${4000}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, {
    month: "mars",
    value: 4000,
  }, {
    month: "avril",
    value: 1000000,
  }]} | ${1000000}
      ${[{ month: "janvier", value: 2500 }, { month: "février", value: 2200 }, {
    month: "mars",
    value: 2200,
  }, {
    month: "avril",
    value: 2200,
  }]} | ${2200}
      ${[{ month: "avril", value: 2200 }, { month: "février", value: 2200 }, {
    month: "mars",
    value: 2200,
  }, {
    month: "janvier",
    value: 2500,
  }]} | ${2200}
      ${[{ month: "janvier", value: 3031 }, { month: "février", value: 3001 }, {
    month: "mars",
    value: 2875,
  }, { month: "avril", value: 3080 }, { month: "mai", value: 3091 }, { month: "juin", value: 3118 }, {
    month: "juillet",
    value: 2989,
  }, { month: "aout", value: 3167 }, { month: "septembre", value: 2928 }, {
    month: "octobre",
    value: 3154,
  }, { month: "novembre", value: 3084 }, { month: "décembre", value: 3140 }]} | ${3140}
    `(
      "Salaires : $salaries => $expectedResult €",
      ({ salaries, expectedResult }) => {
        expect(
          sref.computeReferenceSalary({
            category: CategoryPro44.techniciens,
            hasVariablePay: false,
            salaires: salaries,
          })
        ).toEqual(expectedResult);
      }
    );
  });

  describe("Inge avec salaire variable", () => {
    test.each`
      salaries | expectedResult
      ${[]}    | ${0}
      ${[{ month: "janvier", value: 2000 }, {
    month: "février",
    value: 3000,
  }]} | ${3000}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, {
    month: "mars",
    value: 4000,
  }]} | ${4000}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, {
    month: "mars",
    value: 4000,
  }, { month: "avril", value: 1000000 }]} | ${1000000}
      ${[{ month: "janvier", value: 2500 }, { month: "février", value: 2200 }, {
    month: "mars",
    value: 2200,
  }, { month: "avril", value: 2200 }]} | ${2200}
      ${[{ month: "avril", value: 2200 }, { month: "février", value: 2200 }, {
    month: "mars",
    value: 2200,
  }, { month: "janvier", value: 2500 }]} | ${2200}
    `(
      "Salaires : $salaries => $expectedResult €",
      ({ salaries, expectedResult }) => {
        expect(
          sref.computeReferenceSalary({
            category: CategoryPro44.inge,
            hasVariablePay: true,
            salaires: salaries,
          })
        ).toEqual(expectedResult);
      }
    );
  });

  describe("Inge avec salaire non variable", () => {
    test.each`
      salaries | expectedResult
      ${[]}    | ${0}
      ${[{ month: "janvier", value: 2000 }, {
    month: "février",
    value: 3000,
  }]} | ${3000}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, {
    month: "mars",
    value: 4000,
  }]} | ${4000}
      ${[{ month: "janvier", value: 2000 }, { month: "février", value: 3000 }, {
    month: "mars",
    value: 4000,
  }, { month: "avril", value: 1000000 }]} | ${1000000}
      ${[{ month: "janvier", value: 2500 }, { month: "février", value: 2200 }, {
    month: "mars",
    value: 2200,
  }, { month: "avril", value: 2200 }]} | ${2200}
      ${[{ month: "avril", value: 2200 }, { month: "février", value: 2200 }, {
    month: "mars",
    value: 2200,
  }, { month: "janvier", value: 2500 }]} | ${2200}
    `(
      "Salaires : $salaries => $expectedResult €",
      ({ salaries, expectedResult }) => {
        expect(
          sref.computeReferenceSalary({
            category: CategoryPro44.inge,
            hasVariablePay: false,
            salaires: salaries,
          })
        ).toEqual(expectedResult);
      }
    );
  });
});
