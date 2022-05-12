import { Unit } from "../../../lib";
import {
  convertPeriodToHumanDate,
  Extra,
  getExtra,
  getUnit,
  getValue,
} from "../extractDates";

describe("extractDates", () => {
  describe("convertPeriodToHumanDate", () => {
    it.each`
      period                        | fromDate                  | result
      ${"1 jour"}                   | ${new Date("2022-01-14")} | ${null}
      ${"2 jours"}                  | ${new Date("2022-01-14")} | ${"samedi 15 janvier"}
      ${"7 jours"}                  | ${new Date("2022-01-14")} | ${"jeudi 20 janvier"}
      ${"1 mois"}                   | ${new Date("2022-01-14")} | ${"lundi 14 février"}
      ${"2 mois"}                   | ${new Date("2022-01-14")} | ${"lundi 14 mars"}
      ${"12 mois"}                  | ${new Date("2022-01-14")} | ${"samedi 14 janvier"}
      ${"15 mois"}                  | ${new Date("2022-01-14")} | ${"vendredi 14 avril"}
      ${"1 an"}                     | ${new Date("2022-01-14")} | ${null}
      ${"2 ans"}                    | ${new Date("2022-01-14")} | ${null}
      ${"1 semaine"}                | ${new Date("2022-01-14")} | ${"jeudi 20 janvier"}
      ${"2 semaines"}               | ${new Date("2022-01-14")} | ${"jeudi 27 janvier"}
      ${"15 jours"}                 | ${new Date("2022-01-14")} | ${"vendredi 28 janvier"}
      ${"15 jours calendaires"}     | ${new Date("2022-01-14")} | ${"vendredi 28 janvier"}
      ${"14 jours"}                 | ${new Date("2022-01-14")} | ${"jeudi 27 janvier"}
      ${"1 jour ouvré"}             | ${new Date("2022-01-14")} | ${null}
      ${"2 jours ouvrés"}           | ${new Date("2022-01-14")} | ${null}
      ${"3 jours ouvrés"}           | ${new Date("2022-01-14")} | ${null}
      ${"3 jour ouvré"}             | ${new Date("2022-01-14")} | ${null}
      ${"10 jours ouvrés"}          | ${new Date("2022-01-14")} | ${null}
      ${"1 mois et demi"}           | ${new Date("2022-01-14")} | ${"lundi 28 février"}
      ${"1 mois et demi"}           | ${new Date("2022-01-07")} | ${"lundi 21 février"}
      ${"3 mois et demi"}           | ${new Date("2022-01-14")} | ${"jeudi 28 avril"}
      ${"1.5 mois"}                 | ${new Date("2022-01-07")} | ${"lundi 21 février"}
      ${"3.5 mois"}                 | ${new Date("2022-01-14")} | ${"jeudi 28 avril"}
      ${"1 jour et demi"}           | ${new Date("2022-01-14")} | ${null}
      ${"2 jours et demi"}          | ${new Date("2022-01-14")} | ${null}
      ${"1 an et demi"}             | ${new Date("2022-01-14")} | ${null}
      ${"1 mois de date à date"}    | ${new Date("2022-01-14")} | ${"lundi 14 février"}
      ${"1 semaine de date à date"} | ${new Date("2022-01-14")} | ${"vendredi 21 janvier"}
      ${"7 jours calendaires"}      | ${new Date("2022-01-14")} | ${"jeudi 20 janvier"}
      ${"blabla"}                   | ${new Date("2022-01-14")} | ${null}
      ${"blabla jours"}             | ${new Date("2022-01-14")} | ${null}
    `(
      "should return $result for $period from $fromDate",
      ({ period, fromDate, result }) => {
        expect(convertPeriodToHumanDate(period, fromDate, true)).toBe(result);
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

  describe("getUnit", () => {
    it.each`
      period                        | result
      ${"1 jour"}                   | ${Unit.DAY}
      ${"7 jours ouvrés"}           | ${Unit.DAY}
      ${"1 jour ouvré"}             | ${Unit.DAY}
      ${"1 mois et demi"}           | ${Unit.MONTH}
      ${"1 mois de date à date"}    | ${Unit.MONTH}
      ${"blabla"}                   | ${null}
      ${"7 jours calendaires"}      | ${Unit.DAY}
      ${"1 semaine de date à date"} | ${Unit.WEEK}
    `("should return $result for $period", ({ period, result }) => {
      expect(getUnit(period)).toBe(result);
    });
  });

  describe("getValue", () => {
    it.each`
      period                   | result
      ${"1 jour"}              | ${1}
      ${"7 jours ouvrés"}      | ${7}
      ${"1 jour ouvré"}        | ${1}
      ${"2 mois et demi"}      | ${2}
      ${"blabla"}              | ${null}
      ${"7 jours calendaires"} | ${7}
    `("should return $result for $period", ({ period, result }) => {
      expect(getValue(period)).toBe(result);
    });
  });
});
