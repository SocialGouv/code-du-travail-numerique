import Engine from "publicodes";

import { mergeModels } from "../../../../internal/merger";

const engine = new Engine(mergeModels());

describe("Indemnité légale de licenciement pour un employé", () => {
  test.each`
    beginDate       | endDate         | absence | salary  | expectedCompensation
    ${"22/02/2022"} | ${"21/02/2022"} | ${0}    | ${0}    | ${0}
    ${"22/02/2020"} | ${"22/02/2022"} | ${0}    | ${0}    | ${0}
    ${"22/10/2019"} | ${"21/02/2022"} | ${0}    | ${0}    | ${0}
    ${"22/01/2022"} | ${"21/02/2022"} | ${0}    | ${1000} | ${0}
    ${"22/08/2021"} | ${"21/02/2022"} | ${0}    | ${1000} | ${0}
    ${"22/06/2021"} | ${"20/02/2022"} | ${0}    | ${1000} | ${0}
    ${"22/03/2021"} | ${"21/02/2022"} | ${0}    | ${2000} | ${460.27}
    ${"22/01/2021"} | ${"21/02/2022"} | ${0}    | ${2000} | ${541.1}
    ${"22/02/2020"} | ${"21/02/2022"} | ${0}    | ${2000} | ${1000}
    ${"22/10/2019"} | ${"21/02/2022"} | ${0}    | ${2000} | ${1168.49}
    ${"22/02/2022"} | ${"21/02/2022"} | ${6}    | ${0}    | ${0}
    ${"22/02/2020"} | ${"22/02/2022"} | ${6}    | ${0}    | ${0}
    ${"22/10/2019"} | ${"21/02/2022"} | ${6}    | ${0}    | ${0}
    ${"22/01/2022"} | ${"21/02/2022"} | ${6}    | ${1000} | ${0}
    ${"22/08/2021"} | ${"21/02/2022"} | ${6}    | ${1000} | ${0}
    ${"22/06/2021"} | ${"20/02/2022"} | ${6}    | ${1000} | ${0}
    ${"22/03/2021"} | ${"21/02/2022"} | ${6}    | ${2000} | ${0}
    ${"22/01/2021"} | ${"21/02/2022"} | ${6}    | ${2000} | ${0}
    ${"22/02/2020"} | ${"21/02/2022"} | ${6}    | ${2000} | ${750}
    ${"22/10/2019"} | ${"21/02/2022"} | ${6}    | ${2000} | ${918.49}
  `(
    "date de début: $beginDate, date de fin: $endDate, nombre de mois d'absences: $absence, salaire de référence: $salary => $expectedCompensation €",
    ({ beginDate, endDate, absence, salary, expectedCompensation }) => {
      const result = engine
        .setSituation({
          "contrat salarié . convention collective": "''",
          "contrat salarié . date d'embauche": beginDate,
          "contrat salarié . date de fin de contrat": endDate,
          "contrat salarié . salaire de référence": salary,
          "contrat salarié . total absences": absence,
          "contrat salarié . travailleur handicapé": "non",
          "indemnité de licenciement": "oui",
        })
        .evaluate("contrat salarié . indemnité de licenciement");
      expect(result.nodeValue).toEqual(expectedCompensation);
      expect(result.unit?.numerators).toEqual(["€"]);
      expect(result.missingVariables).toEqual({});
    }
  );
});
