import {
  formatDateAsFrenchText,
  parisUtcOffsetAtMidnight,
  parseFrenchDate,
  toIsoDate,
  toIsoDateTimeParis,
  toRfc822DateParis,
} from "../date";

describe("parseFrenchDate()", () => {
  it.each`
    input                          | expected
    ${"18/09/2026"}                | ${{ year: 2026, month: 9, day: 18 }}
    ${"1/9/26"}                    | ${{ year: 2026, month: 9, day: 1 }}
    ${"01/9/2026"}                 | ${{ year: 2026, month: 9, day: 1 }}
    ${" 18/09/2026 "}              | ${{ year: 2026, month: 9, day: 18 }}
    ${"2026-09-18"}                | ${{ year: 2026, month: 9, day: 18 }}
    ${"2026-09-18T00:00:00+02:00"} | ${{ year: 2026, month: 9, day: 18 }}
  `("lit $input", ({ input, expected }) => {
    expect(parseFrenchDate(input)).toEqual(expected);
  });

  it.each([
    undefined,
    "",
    "pas une date",
    "31/02/2026",
    "18/13/2026",
    "0/09/2026",
    "18/09/202",
    "18-09-2026",
  ])("rejette %p", (input) => {
    expect(parseFrenchDate(input)).toBeUndefined();
  });
});

describe("toIsoDate()", () => {
  it("convertit en AAAA-MM-JJ", () => {
    expect(toIsoDate("18/09/2026")).toBe("2026-09-18");
    expect(toIsoDate("1/9/26")).toBe("2026-09-01");
  });

  it("renvoie undefined si invalide", () => {
    expect(toIsoDate("n'importe quoi")).toBeUndefined();
  });
});

describe("parisUtcOffsetAtMidnight()", () => {
  it.each`
    date                                  | offset      | label
    ${{ year: 2026, month: 1, day: 15 }}  | ${"+01:00"} | ${"heure d'hiver"}
    ${{ year: 2026, month: 7, day: 14 }}  | ${"+02:00"} | ${"heure d'été"}
    ${{ year: 2026, month: 3, day: 29 }}  | ${"+01:00"} | ${"jour du passage à l'heure d'été (minuit est encore en heure d'hiver)"}
    ${{ year: 2026, month: 3, day: 30 }}  | ${"+02:00"} | ${"lendemain du passage à l'heure d'été"}
    ${{ year: 2026, month: 10, day: 25 }} | ${"+02:00"} | ${"jour du passage à l'heure d'hiver (minuit est encore en heure d'été)"}
    ${{ year: 2026, month: 10, day: 26 }} | ${"+01:00"} | ${"lendemain du passage à l'heure d'hiver"}
  `("$label → $offset", ({ date, offset }) => {
    expect(parisUtcOffsetAtMidnight(date)).toBe(offset);
  });
});

describe("toIsoDateTimeParis()", () => {
  it("émet minuit heure de Paris avec le fuseau", () => {
    expect(toIsoDateTimeParis("18/09/2026")).toBe("2026-09-18T00:00:00+02:00");
    expect(toIsoDateTimeParis("15/01/2026")).toBe("2026-01-15T00:00:00+01:00");
    expect(toIsoDateTimeParis("1/9/26")).toBe("2026-09-01T00:00:00+02:00");
  });

  it("accepte une date déjà ISO", () => {
    expect(toIsoDateTimeParis("2024-01-01")).toBe("2024-01-01T00:00:00+01:00");
  });

  it("renvoie undefined si invalide", () => {
    expect(toIsoDateTimeParis(undefined)).toBeUndefined();
    expect(toIsoDateTimeParis("pas une date")).toBeUndefined();
  });
});

describe("toRfc822DateParis()", () => {
  it("émet une date RFC 822 à minuit Paris", () => {
    expect(toRfc822DateParis("18/09/2026")).toBe(
      "Fri, 18 Sep 2026 00:00:00 +0200"
    );
    expect(toRfc822DateParis("15/01/2026")).toBe(
      "Thu, 15 Jan 2026 00:00:00 +0100"
    );
    expect(toRfc822DateParis("1/9/26")).toBe("Tue, 01 Sep 2026 00:00:00 +0200");
  });

  it("renvoie undefined si invalide", () => {
    expect(toRfc822DateParis("")).toBeUndefined();
  });
});

describe("formatDateAsFrenchText()", () => {
  it("affiche la date longue en français", () => {
    expect(formatDateAsFrenchText("18/09/2026")).toBe("18 septembre 2026");
    expect(formatDateAsFrenchText("1/9/26")).toBe("1 septembre 2026");
  });

  it("renvoie undefined si invalide", () => {
    expect(formatDateAsFrenchText("31/02/2026")).toBeUndefined();
    expect(formatDateAsFrenchText(undefined)).toBeUndefined();
  });
});
