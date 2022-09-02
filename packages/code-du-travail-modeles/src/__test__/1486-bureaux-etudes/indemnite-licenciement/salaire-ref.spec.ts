import {
  CatPro1486,
  ReferenceSalary1486,
  TypeLicenciement1486,
} from "../../../plugins/salaire-reference/1486_bureaux_etudes_techniques";

describe("Calcul du salaire pour la CC 1486", () => {
  const ReferenceSalary = new ReferenceSalary1486();
  describe("Cas standard", () => {
    test.each`
      typeLicenciement              | catPro                      | salaries                                                                                                                                                                                                                                                                                                                                                                                                                                  | expectedResult
      ${TypeLicenciement1486.refus} | ${CatPro1486.chargeEnquete} | ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                     | ${0}
      ${TypeLicenciement1486.refus} | ${CatPro1486.chargeEnquete} | ${[{ month: "janvier", prime: 2500, value: 3000 }, { month: "février", value: 2500 }, { month: "mars", value: 2500 }, { month: "avril", value: 1700 }, { month: "mai", value: 1700 }, { month: "juin", value: 1700 }, { month: "juillet", value: 1700 }, { month: "aout", value: 2500 }, { month: "septembre", value: 1700 }, { month: "octobre", value: 1700 }, { month: "novembre", value: 1700 }, { month: "décembre", value: 1700 }]} | ${2008.3333333333333}
      ${TypeLicenciement1486.autre} | ${CatPro1486.chargeEnquete} | ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                     | ${0}
      ${TypeLicenciement1486.autre} | ${CatPro1486.chargeEnquete} | ${[{ month: "janvier", prime: 2500, value: 3000 }, { month: "février", value: 2500 }, { month: "mars", value: 2500 }, { month: "avril", value: 1700 }, { month: "mai", value: 1700 }, { month: "juin", value: 1700 }, { month: "juillet", value: 1700 }, { month: "aout", value: 2500 }, { month: "septembre", value: 1700 }, { month: "octobre", value: 1700 }, { month: "novembre", value: 1700 }, { month: "décembre", value: 1700 }]} | ${4016.6666666666665}
      ${TypeLicenciement1486.autre} | ${CatPro1486.ingeCadre}     | ${[{ month: "janvier", prime: 2500, value: 3000 }, { month: "février", value: 2500 }, { month: "mars", value: 2500 }, { month: "avril", value: 1700 }, { month: "mai", value: 1700 }, { month: "juin", value: 1700 }, { month: "juillet", value: 1700 }, { month: "aout", value: 2500 }, { month: "septembre", value: 1700 }, { month: "octobre", value: 1700 }, { month: "novembre", value: 1700 }, { month: "décembre", value: 1700 }]} | ${2008.3333333333333}
      ${TypeLicenciement1486.autre} | ${CatPro1486.etam}          | ${[{ month: "janvier", prime: 2500, value: 3000 }, { month: "février", value: 2500 }, { month: "mars", value: 2500 }, { month: "avril", value: 1700 }, { month: "mai", value: 1700 }, { month: "juin", value: 1700 }, { month: "juillet", value: 1700 }, { month: "aout", value: 2500 }, { month: "septembre", value: 1700 }, { month: "octobre", value: 1700 }, { month: "novembre", value: 1700 }, { month: "décembre", value: 1700 }]} | ${2008.3333333333333}
    `(
      "Salaires : $salaries ; catégorie pro : $catPro ; type de licenciement = $typeLicenciement => $expectedResult €",
      ({ salaries, catPro, typeLicenciement, expectedResult }) => {
        expect(
          ReferenceSalary.computeReferenceSalary({
            catPro,
            salaires: salaries,
            typeLicenciement,
          })
        ).toEqual(expectedResult);
      }
    );
  });
});
