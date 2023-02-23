import type { Absence } from "../../index";
import { calculateDurationByCalendarYear } from "../../index";

describe("Test de la méthode calculateDurationByYear", () => {
  test.each`
    absences                                                                                               | expectedResult
    ${[]}                                                                                                  | ${[]}
    ${[{ durationInMonth: 3, startedAt: "01/01/2020" }]}                                                   | ${[3]}
    ${[{ durationInMonth: 13, startedAt: "01/01/2020" }]}                                                  | ${[12, 1]}
    ${[{ durationInMonth: 13, startedAt: "01/01/2020" }, { durationInMonth: 4, startedAt: "01/01/2021" }]} | ${[12, 5]}
    ${[{ durationInMonth: 3, startedAt: "01/01/2020" }, { durationInMonth: 3, startedAt: "01/01/2020" }]}  | ${[6]}
  `(
    "Calcul du total par année $absences a pour résultat $expectedResult",
    ({ absences, expectedResult }) => {
      const result = calculateDurationByCalendarYear(absences as Absence[]);

      expect(result).toEqual(expectedResult);
    }
  );
});
