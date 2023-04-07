import { parse } from "date-fns";

import { MotifKeys } from "../../motif-keys";
import type { Absence } from "../../types/seniority";
import type { YearDetail } from "../";
import { splitByTwelveMonthsRolling } from "../";

const absences2020: Absence[] = [
  {
    durationInMonth: 1,
    motif: {
      key: MotifKeys.congesSansSolde,
      label: "",
      startAt: () => true,
      value: 1,
    },
    startedAt: "01/09/2020",
  },
];

const absences2020Years: YearDetail[] = [
  {
    begin: parse("01/09/2020", "dd/MM/yyyy", new Date()),
    end: parse("31/08/2021", "dd/MM/yyyy", new Date()),
  },
];

const absencesNoOverlap: Absence[] = [
  {
    durationInMonth: 0.5,
    motif: {
      key: MotifKeys.congesSansSolde,
      label: "",
      startAt: () => true,
      value: 1,
    },
    startedAt: "01/09/2020",
  },
  {
    durationInMonth: 2,
    motif: {
      key: MotifKeys.congesSansSolde,
      label: "",
      startAt: () => true,
      value: 1,
    },
    startedAt: "10/10/2021",
  },
];

const absencesNoOverlapYears: YearDetail[] = [
  {
    begin: parse("01/09/2020", "dd/MM/yyyy", new Date()),
    end: parse("31/08/2021", "dd/MM/yyyy", new Date()),
  },
  {
    begin: parse("10/10/2021", "dd/MM/yyyy", new Date()),
    end: parse("09/10/2022", "dd/MM/yyyy", new Date()),
  },
];

const absencesWithOverlap: Absence[] = [
  {
    durationInMonth: 0.5,
    motif: {
      key: MotifKeys.congesSansSolde,
      label: "",
      startAt: () => true,
      value: 1,
    },
    startedAt: "01/09/2020",
  },
  {
    durationInMonth: 0.5,
    motif: {
      key: MotifKeys.congesSansSolde,
      label: "",
      startAt: () => true,
      value: 1,
    },
    startedAt: "01/03/2021",
  },
  {
    durationInMonth: 2,
    motif: {
      key: MotifKeys.congesSansSolde,
      label: "",
      startAt: () => true,
      value: 1,
    },
    startedAt: "01/09/2021",
  },
];

const absencesWithOverlapYears: YearDetail[] = [
  {
    begin: parse("01/09/2020", "dd/MM/yyyy", new Date()),
    end: parse("31/08/2021", "dd/MM/yyyy", new Date()),
  },
  {
    begin: parse("01/09/2021", "dd/MM/yyyy", new Date()),
    end: parse("31/08/2022", "dd/MM/yyyy", new Date()),
  },
];

describe("Découpage sur 12 mois glissant", () => {
  test.each`
    absences               | expectedSplit
    ${[]}                  | ${[]}
    ${absences2020}        | ${absences2020Years}
    ${absencesNoOverlap}   | ${absencesNoOverlapYears}
    ${absencesWithOverlap} | ${absencesWithOverlapYears}
  `(
    "Avec $absences on attend le découpage par année suivant $expectedSplit",
    ({ absences, expectedSplit }) => {
      const result = splitByTwelveMonthsRolling(absences);

      expect(result).toEqual(expectedSplit);
    }
  );
});
