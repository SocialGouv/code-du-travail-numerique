import { parse } from "date-fns";

import { splitBySeniorityYear } from "../";

const date2020 = parse("05/04/2020", "dd/MM/yyyy", new Date());
const date2021LessOneDay = parse("04/04/2021", "dd/MM/yyyy", new Date());
const date2021 = parse("05/04/2021", "dd/MM/yyyy", new Date());
const date2022LessOneDay = parse("04/04/2022", "dd/MM/yyyy", new Date());
const date2022 = parse("05/04/2022", "dd/MM/yyyy", new Date());
const exitIn2020 = parse("10/11/2020", "dd/MM/yyyy", new Date());
const exitIn2021 = parse("12/06/2021", "dd/MM/yyyy", new Date());
const exitIn2022 = parse("12/06/2022", "dd/MM/yyyy", new Date());

describe("Découpage par année d'ancienneté", () => {
  test.each`
    entryDate   | exitDate      | expectedSplit
    ${date2021} | ${date2020}   | ${[]}
    ${date2020} | ${exitIn2020} | ${[{ begin: date2020, end: exitIn2020 }]}
    ${date2020} | ${exitIn2021} | ${[{ begin: date2020, end: date2021LessOneDay }, { begin: date2021, end: exitIn2021 }]}
    ${date2020} | ${exitIn2022} | ${[{ begin: date2020, end: date2021LessOneDay }, { begin: date2021, end: date2022LessOneDay }, { begin: date2022, end: exitIn2022 }]}
  `(
    "Avec $entryDate et $exitDate on attend le découpage par année suivant $expectedSplit",
    ({ entryDate, exitDate, expectedSplit }) => {
      const result = splitBySeniorityYear(entryDate, exitDate);

      expect(result).toEqual(expectedSplit);
    }
  );
});
