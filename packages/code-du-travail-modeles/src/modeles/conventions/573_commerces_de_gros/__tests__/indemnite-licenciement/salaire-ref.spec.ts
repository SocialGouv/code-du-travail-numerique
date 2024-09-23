import {
  QuestionOuiNonWithQuote,
  ReferenceSalaryFactory,
  SupportedCc,
} from "../../../../common";

describe("Calcul du salaire pour la CC 573", () => {
  const refSalary = new ReferenceSalaryFactory().create(SupportedCc.IDCC0573);

  describe("Cas standard", () => {
    test.each`
      licenciementEco                | salaries                                                                                                                                                                                                                                                                                                                                                                                                                                   | expectedResult
      ${QuestionOuiNonWithQuote.non} | ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                      | ${0}
      ${QuestionOuiNonWithQuote.non} | ${[{ month: "janvier", prime: 2500, value: 3000 }, { month: "février", value: 2500 }, { month: "mars", value: 2500 }, { month: "avril", value: 1700 }, { month: "mai", value: 1700 }, { month: "juin", value: 1700 }, { month: "juillet", value: 1700 }, { month: "aout", value: 2500 }, { month: "septembre", value: 1700 }, { month: "octobre", value: 1700 }, { month: "novembre", value: 1700 }, { month: "décembre", value: 1700 }]}  | ${2008.3333333333333}
      ${QuestionOuiNonWithQuote.non} | ${[{ month: "janvier", prime: 2500, value: 3000 }, { month: "février", value: 2500 }, { month: "mars", value: 2500 }, { month: "avril", value: 1700 }, { month: "mai", value: 1700 }, { month: "juin", value: 1700 }, { month: "juillet", value: 1700 }, { month: "aout", value: 2500 }, { month: "septembre", value: 1700 }, { month: "octobre", value: 1700 }, { month: "novembre", value: 1700 }, { month: "décembre", value: 17000 }]} | ${6175}
      ${QuestionOuiNonWithQuote.oui} | ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                      | ${0}
      ${QuestionOuiNonWithQuote.oui} | ${[{ month: "janvier", prime: 2500, value: 3000 }, { month: "février", value: 2500 }, { month: "mars", value: 2500 }, { month: "avril", value: 1700 }, { month: "mai", value: 1700 }, { month: "juin", value: 1700 }, { month: "juillet", value: 1700 }, { month: "aout", value: 2500 }, { month: "septembre", value: 1700 }, { month: "octobre", value: 1700 }, { month: "novembre", value: 1700 }, { month: "décembre", value: 17000 }]} | ${3283.3333333333335}
    `(
      "Salaires : $salaries ; licenciementEco: $licenciementEco => $expectedResult €",
      ({ salaries, licenciementEco, expectedResult }) => {
        expect(
          refSalary.computeReferenceSalary({
            licenciementEco,
            salaires: salaries,
          })
        ).toEqual(expectedResult);
      }
    );
  });
});
