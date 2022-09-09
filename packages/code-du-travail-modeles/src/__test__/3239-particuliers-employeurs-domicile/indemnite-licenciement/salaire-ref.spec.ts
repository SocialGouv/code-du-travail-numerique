import {
  ReferenceSalaryFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../plugins";
import { CatPro3239 } from "../../../plugins/salaire-reference/3239_particuliers_employeurs_domicile";

describe("Calcul du salaire pour la CC 3239", () => {
  const refSalary = new ReferenceSalaryFactory().create(
    SupportedCcIndemniteLicenciement.IDCC3239
  );

  describe("Cas standard", () => {
    test.each`
      catPro                                    | salaries                                                                                                                                                                                                                                                                                                                                                                                                                                  | expectedResult
      ${CatPro3239.assistantMaternel}           | ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                     | ${0}
      ${CatPro3239.salarieParticulierEmployeur} | ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                     | ${0}
      ${CatPro3239.assistantMaternel}           | ${[{ month: "janvier", prime: 2500, value: 3000 }, { month: "février", value: 2500 }, { month: "mars", value: 2500 }, { month: "avril", value: 1700 }, { month: "mai", value: 1700 }, { month: "juin", value: 1700 }, { month: "juillet", value: 1700 }, { month: "aout", value: 2500 }, { month: "septembre", value: 1700 }, { month: "octobre", value: 1700 }, { month: "novembre", value: 1700 }, { month: "décembre", value: 1700 }]} | ${24100}
      ${CatPro3239.salarieParticulierEmployeur} | ${[{ month: "janvier", prime: 2500, value: 3000 }, { month: "février", value: 2500 }, { month: "mars", value: 2500 }, { month: "avril", value: 1700 }, { month: "mai", value: 1700 }, { month: "juin", value: 1700 }, { month: "juillet", value: 1700 }, { month: "aout", value: 2500 }, { month: "septembre", value: 1700 }, { month: "octobre", value: 1700 }, { month: "novembre", value: 1700 }, { month: "décembre", value: 1700 }]} | ${2008.3333333333333}
    `(
      "Salaires : $salaries ; catégorie pro : $catPro ; type de licenciement = $typeLicenciement => $expectedResult €",
      ({ salaries, catPro, expectedResult }) => {
        expect(
          refSalary.computeReferenceSalary({
            catPro,
            salaires: salaries,
          })
        ).toEqual(expectedResult);
      }
    );
  });
});
