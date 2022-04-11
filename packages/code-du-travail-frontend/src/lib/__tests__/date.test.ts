import { convertPeriodToHumanDate, Extra, getExtra } from "../date";

describe("convertPeriodToHumanDate", () => {
  it.each`
    period                        | fromDate                  | result
    ${"1 jour"}                   | ${new Date("2022-01-14")} | ${"15 janvier"}
    ${"7 jours"}                  | ${new Date("2022-01-14")} | ${"21 janvier"}
    ${"1 mois"}                   | ${new Date("2022-01-14")} | ${"14 février"}
    ${"2 mois"}                   | ${new Date("2022-01-14")} | ${"14 mars"}
    ${"12 mois"}                  | ${new Date("2022-01-14")} | ${"14 janvier 2023"}
    ${"15 mois"}                  | ${new Date("2022-01-14")} | ${"14 avril 2023"}
    ${"1 an"}                     | ${new Date("2022-01-14")} | ${"14 janvier 2023"}
    ${"2 ans"}                    | ${new Date("2022-01-14")} | ${"14 janvier 2024"}
    ${"1 semaine"}                | ${new Date("2022-01-14")} | ${"21 janvier"}
    ${"15 jours"}                 | ${new Date("2022-01-14")} | ${"28 janvier"}
    ${"14 jours"}                 | ${new Date("2022-01-14")} | ${"28 janvier"}
    ${"1 jour ouvré"}             | ${new Date("2022-01-14")} | ${null}
    ${"2 jours ouvrés"}           | ${new Date("2022-01-14")} | ${null}
    ${"3 jours ouvrés"}           | ${new Date("2022-01-14")} | ${null}
    ${"10 jours ouvrés"}          | ${new Date("2022-01-14")} | ${null}
    ${"1 mois et demi"}           | ${new Date("2022-01-14")} | ${"28 février"}
    ${"3 mois et demi"}           | ${new Date("2022-01-14")} | ${"28 avril"}
    ${"1 jour et demi"}           | ${new Date("2022-01-14")} | ${null}
    ${"2 jours et demi"}          | ${new Date("2022-01-14")} | ${null}
    ${"1 an et demi"}             | ${new Date("2022-01-14")} | ${null}
    ${"1 mois de date à date"}    | ${new Date("2022-01-14")} | ${"14 février"}
    ${"1 semaine de date à date"} | ${new Date("2022-01-14")} | ${"21 janvier"}
    ${"7 jours calendaires"}      | ${new Date("2022-01-14")} | ${"21 janvier"}
    ${"blabla"}                   | ${new Date("2022-01-14")} | ${null}
    ${"blabla jours"}             | ${new Date("2022-01-14")} | ${null}
  `(
    "should return $result for $period from $fromDate",
    ({ period, fromDate, result }) => {
      expect(convertPeriodToHumanDate(period, fromDate)).toBe(result);
    }
  );
});

describe("getExtra", () => {
  it.each`
    period                        | result
    ${"1 jour"}                   | ${null}
    ${"7 jours ouvrés"}           | ${Extra.OPEN}
    ${"1 jour ouvré"}             | ${Extra.OPEN}
    ${"1 an et demi"}             | ${Extra.MID}
    ${"1 mois de date à date"}    | ${Extra.FROM_TO}
    ${"blabla"}                   | ${null}
    ${"7 jours calendaires"}      | ${Extra.CALENDAR}
    ${"1 semaine de date à date"} | ${Extra.FROM_TO}
  `("should return $result for $period", ({ period, result }) => {
    expect(getExtra(period)).toBe(result);
  });
});
