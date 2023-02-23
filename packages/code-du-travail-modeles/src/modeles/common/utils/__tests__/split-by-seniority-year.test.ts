import { parse } from "date-fns";

import { splitBySeniorityCalendarYear, splitBySeniorityYear } from "../";

const date2020 = parse("05/04/2020", "dd/MM/yyyy", new Date());
const date2021LessOneDay = parse("04/04/2021", "dd/MM/yyyy", new Date());
const date2021 = parse("05/04/2021", "dd/MM/yyyy", new Date());
const date2022LessOneDay = parse("04/04/2022", "dd/MM/yyyy", new Date());
const date2022 = parse("05/04/2022", "dd/MM/yyyy", new Date());
const exitIn2020 = parse("10/11/2020", "dd/MM/yyyy", new Date());
const exitIn2021 = parse("12/06/2021", "dd/MM/yyyy", new Date());
const exitIn2022 = parse("12/06/2022", "dd/MM/yyyy", new Date());
// Bug when the month/day of the start date are after the month/day of the end date
const case1 = {
  entryData: parse("12/11/2019", "dd/MM/yyyy", new Date()),
  exitDate: parse("01/01/2022", "dd/MM/yyyy", new Date()),
  expectedSplit: [
    {
      begin: parse("12/11/2019", "dd/MM/yyyy", new Date()),
      end: parse("11/11/2020", "dd/MM/yyyy", new Date()),
    },
    {
      begin: parse("12/11/2020", "dd/MM/yyyy", new Date()),
      end: parse("11/11/2021", "dd/MM/yyyy", new Date()),
    },
    {
      begin: parse("12/11/2021", "dd/MM/yyyy", new Date()),
      end: parse("01/01/2022", "dd/MM/yyyy", new Date()),
    },
  ],
};

describe("Découpage par année d'ancienneté", () => {
  test.each`
    entryDate          | exitDate          | expectedSplit
    ${date2021}        | ${date2020}       | ${[]}
    ${date2020}        | ${exitIn2020}     | ${[{ begin: date2020, end: exitIn2020 }]}
    ${date2020} | ${exitIn2021} | ${[{ begin: date2020, end: date2021LessOneDay }, {
    begin: date2021,
    end: exitIn2021,
  }]}
    ${date2020} | ${exitIn2022} | ${[{ begin: date2020, end: date2021LessOneDay }, {
    begin: date2021,
    end: date2022LessOneDay,
  }, { begin: date2022, end: exitIn2022 }]}
    ${date2020} | ${exitIn2022} | ${[{ begin: date2020, end: date2021LessOneDay }, {
    begin: date2021,
    end: date2022LessOneDay,
  }, { begin: date2022, end: exitIn2022 }]}
    ${case1.entryData} | ${case1.exitDate} | ${case1.expectedSplit}
  `(
    "Avec $entryDate et $exitDate on attend le découpage par année suivant $expectedSplit",
    ({ entryDate, exitDate, expectedSplit }) => {
      const result = splitBySeniorityYear(entryDate, exitDate);

      expect(result).toStrictEqual(expectedSplit);
    }
  );
});

const begin2020 = new Date(2020, 0, 1);
const end2020 = new Date(2020, 11, 31);
const begin2021 = new Date(2021, 0, 1);
const end2021 = new Date(2021, 11, 31);
const begin2022 = new Date(2022, 0, 1);
const end2022 = new Date(2022, 11, 31);
describe("Découpage par année d'ancienneté calendaire (janv -> déc)", () => {
  test.each`
    entryDate   | exitDate      | expectedSplit
    ${date2021} | ${date2020}   | ${[]}
    ${date2020} | ${exitIn2020} | ${[{ begin: begin2020, end: end2020 }]}
    ${date2020} | ${exitIn2021} | ${[{ begin: begin2020, end: end2020 }, { begin: begin2021, end: end2021 }]}
    ${date2020} | ${exitIn2022} | ${[{ begin: begin2020, end: end2020 }, {
    begin: begin2021,
    end: end2021,
  }, { begin: begin2022, end: end2022 }]}
    ${date2020} | ${exitIn2022} | ${[{ begin: begin2020, end: end2020 }, {
    begin: begin2021,
    end: end2021,
  }, { begin: begin2022, end: end2022 }]}
  `(
    "Avec $entryDate et $exitDate on attend le découpage par année suivant $expectedSplit",
    ({ entryDate, exitDate, expectedSplit }) => {
      const result = splitBySeniorityCalendarYear(entryDate, exitDate);

      expect(result).toStrictEqual(expectedSplit);
    }
  );
});
