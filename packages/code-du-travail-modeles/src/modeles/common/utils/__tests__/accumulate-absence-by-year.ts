import { parse } from "date-fns";

import { accumulateAbsenceByYear } from "../";

const date2020 = parse("05/04/2020", "dd/MM/yyyy", new Date());
const date2021LessOneDay = parse("04/04/2021", "dd/MM/yyyy", new Date());
const date2021 = parse("05/04/2021", "dd/MM/yyyy", new Date());
const exitIn2020 = parse("10/11/2020", "dd/MM/yyyy", new Date());
const exitIn2021 = parse("12/06/2021", "dd/MM/yyyy", new Date());

describe("Accumulation d'absence par année", () => {
  test.each`
    absences                                                                                              | years                                                                                   | expectedOutput
    ${[]}                                                                                                 | ${[]}                                                                                   | ${[]}
    ${[{ durationInMonth: 1, startedAt: "02/06/2020" }]}                                                  | ${[{ begin: date2020, end: exitIn2020 }]}                                               | ${[{ totalAbsenceInMonth: 1, year: 2020 }]}
    ${[{ durationInMonth: 1, startedAt: "10/05/2020" }, { durationInMonth: 2, startedAt: "10/07/2020" }]} | ${[{ begin: date2020, end: exitIn2020 }]}                                               | ${[{ totalAbsenceInMonth: 3, year: 2020 }]}
    ${[{ durationInMonth: 3, startedAt: "10/07/2020" }, { durationInMonth: 2, startedAt: "10/04/2021" }]} | ${[{ begin: date2020, end: date2021LessOneDay }, { begin: date2021, end: exitIn2021 }]} | ${[{ totalAbsenceInMonth: 3, year: 2020 }, { totalAbsenceInMonth: 2, year: 2021 }]}
    ${[{ durationInMonth: 1, startedAt: "20/03/2021" }]}                                                  | ${[{ begin: date2020, end: date2021LessOneDay }, { begin: date2021, end: exitIn2021 }]} | ${[{ totalAbsenceInMonth: 0.5, year: 2020 }, { totalAbsenceInMonth: 0.4666666666666667, year: 2021 }]}
  `(
    "Avec $absences.length absence(s) et $years.length année(s) on attend $expectedOutput.length découpe(s) par année",
    ({ absences, years, expectedOutput }) => {
      const result = accumulateAbsenceByYear(absences, years);

      expect(result).toEqual(expectedOutput);
    }
  );
});
