import {
  parseDuration,
  findLongestDuration,
  compareDurations,
  isPeriod,
  compareValues,
} from "../comparator";

describe("parseDuration", () => {
  it("should parse days correctly", () => {
    const result = parseDuration("8 jours");
    expect(result).toEqual({
      value: 8,
      unit: "jours",
      originalText: "8 jours",
      totalDays: 8,
    });
  });

  it("should parse calendar days correctly", () => {
    const result = parseDuration("8 jours calendaires");
    expect(result).toEqual({
      value: 8,
      unit: "jours",
      originalText: "8 jours calendaires",
      totalDays: 8,
    });
  });

  it("should parse weeks correctly", () => {
    const result = parseDuration("3 semaines");
    expect(result).toEqual({
      value: 3,
      unit: "semaines",
      originalText: "3 semaines",
      totalDays: 21,
    });
  });

  it("should parse months correctly", () => {
    const result = parseDuration("4 mois");
    expect(result).toEqual({
      value: 4,
      unit: "mois",
      originalText: "4 mois",
      totalDays: 120,
    });
  });

  it('should parse months with "de date à date" correctly', () => {
    const result = parseDuration("4 mois de date à date");
    expect(result).toEqual({
      value: 4,
      unit: "mois",
      originalText: "4 mois de date à date",
      totalDays: 120,
    });
  });

  it("should handle singular forms", () => {
    expect(parseDuration("1 jour")).toEqual({
      value: 1,
      unit: "jours",
      originalText: "1 jour",
      totalDays: 1,
    });

    expect(parseDuration("1 semaine")).toEqual({
      value: 1,
      unit: "semaines",
      originalText: "1 semaine",
      totalDays: 7,
    });

    expect(parseDuration("1 mois")).toEqual({
      value: 1,
      unit: "mois",
      originalText: "1 mois",
      totalDays: 30,
    });
  });

  it("should handle case insensitive input", () => {
    expect(parseDuration("8 JOURS")).toEqual({
      value: 8,
      unit: "jours",
      originalText: "8 JOURS",
      totalDays: 8,
    });

    expect(parseDuration("3 SEMAINES")).toEqual({
      value: 3,
      unit: "semaines",
      originalText: "3 SEMAINES",
      totalDays: 21,
    });
  });

  it("should return null for invalid input", () => {
    expect(parseDuration("invalid text")).toBeNull();
    expect(parseDuration("abc jours")).toBeNull();
    expect(parseDuration("")).toBeNull();
  });

  it("should handle extra spaces", () => {
    expect(parseDuration("  8   jours  ")).toEqual({
      value: 8,
      unit: "jours",
      originalText: "  8   jours  ",
      totalDays: 8,
    });
  });

  it('should parse durations with "et demi" correctly', () => {
    expect(parseDuration("2 semaines et demi")).toEqual({
      value: 2,
      unit: "semaines",
      originalText: "2 semaines et demi",
      totalDays: 29, // 2 * 7 + 15
    });

    expect(parseDuration("1 mois et demi")).toEqual({
      value: 1,
      unit: "mois",
      originalText: "1 mois et demi",
      totalDays: 45, // 1 * 30 + 15
    });

    expect(parseDuration("3 mois et demi")).toEqual({
      value: 3,
      unit: "mois",
      originalText: "3 mois et demi",
      totalDays: 105, // 3 * 30 + 15
    });
  });

  it("should parse month variations correctly", () => {
    expect(parseDuration("1 mois ouvré")).toEqual({
      value: 1,
      unit: "mois",
      originalText: "1 mois ouvré",
      totalDays: 30,
    });

    expect(parseDuration("2 mois ouvrés")).toEqual({
      value: 2,
      unit: "mois",
      originalText: "2 mois ouvrés",
      totalDays: 60,
    });

    expect(parseDuration("1 mois et des bananes")).toEqual({
      value: 1,
      unit: "mois",
      originalText: "1 mois et des bananes",
      totalDays: 30,
    });

    expect(parseDuration("un mois")).toEqual({
      value: 1,
      unit: "mois",
      originalText: "un mois",
      totalDays: 30,
    });

    expect(parseDuration("une semaine")).toEqual({
      value: 1,
      unit: "semaines",
      originalText: "une semaine",
      totalDays: 7,
    });
  });
});

describe("findLongestDuration", () => {
  it("should return the longest duration from multiple durations", () => {
    const durations = ["8 jours", "3 semaines", "2 mois"];
    const result = findLongestDuration(durations);

    expect(result).toEqual({
      value: 2,
      unit: "mois",
      originalText: "2 mois",
      totalDays: 60,
    });
  });

  it("should handle the example case from requirements", () => {
    const durations = [
      "8 jours calendaires",
      "3 semaines",
      "4 mois de date à date",
      "8 mois",
      "2 semaines",
    ];
    const result = findLongestDuration(durations);

    expect(result).toEqual({
      value: 8,
      unit: "mois",
      originalText: "8 mois",
      totalDays: 240,
    });
  });

  it("should return null for empty array", () => {
    expect(findLongestDuration([])).toBeNull();
  });

  it("should return null for array with invalid durations", () => {
    expect(findLongestDuration(["invalid", "also invalid"])).toBeNull();
  });

  it("should handle mixed valid and invalid durations", () => {
    const durations = ["invalid", "3 semaines", "also invalid", "1 mois"];
    const result = findLongestDuration(durations);

    expect(result).toEqual({
      value: 1,
      unit: "mois",
      originalText: "1 mois",
      totalDays: 30,
    });
  });

  it("should handle durations with same total days", () => {
    const durations = ["14 jours", "2 semaines"]; // Both equal 14 days
    const result = findLongestDuration(durations);

    // Should return the first one found (14 jours)
    expect(result).toEqual({
      value: 14,
      unit: "jours",
      originalText: "14 jours",
      totalDays: 14,
    });
  });
});

describe("compareDurations", () => {
  it("should return the longer of two durations", () => {
    const result = compareDurations("8 jours", "2 semaines");

    expect(result).toEqual({
      value: 2,
      unit: "semaines",
      originalText: "2 semaines",
      totalDays: 14,
    });
  });

  it("should return the first duration if they are equal", () => {
    const result = compareDurations("7 jours", "1 semaine");

    expect(result).toEqual({
      value: 7,
      unit: "jours",
      originalText: "7 jours",
      totalDays: 7,
    });
  });

  it("should return null if both durations are invalid", () => {
    expect(compareDurations("invalid1", "invalid2")).toBeNull();
  });

  it("should return the valid duration if one is invalid", () => {
    const result = compareDurations("invalid", "3 semaines");

    expect(result).toEqual({
      value: 3,
      unit: "semaines",
      originalText: "3 semaines",
      totalDays: 21,
    });
  });
});

describe("Duration conversion accuracy", () => {
  it("should correctly convert weeks to days", () => {
    expect(parseDuration("1 semaine")?.totalDays).toBe(7);
    expect(parseDuration("2 semaines")?.totalDays).toBe(14);
    expect(parseDuration("4 semaines")?.totalDays).toBe(28);
  });

  it("should correctly convert months to days (30-day approximation)", () => {
    expect(parseDuration("1 mois")?.totalDays).toBe(30);
    expect(parseDuration("2 mois")?.totalDays).toBe(60);
    expect(parseDuration("6 mois")?.totalDays).toBe(180);
  });

  it("should handle comparative scenarios", () => {
    // 4 weeks = 28 days vs 1 month = 30 days
    const result = compareDurations("4 semaines", "1 mois");
    expect(result?.unit).toBe("mois");
    expect(result?.totalDays).toBe(30);
  });
});

describe("isPeriod", () => {
  it("should detect periods correctly", () => {
    expect(isPeriod("2 semaines")).toBe(true);
    expect(isPeriod("1 mois")).toBe(true);
    expect(isPeriod("5 jours")).toBe(true);
    expect(isPeriod("2 semaines et demi")).toBe(true);
    expect(isPeriod("1 mois ouvré")).toBe(true);
  });

  it("should not detect non-periods", () => {
    expect(isPeriod(123)).toBe(false);
    expect(isPeriod("hello world")).toBe(false);
    expect(isPeriod("abc")).toBe(false);
    expect(isPeriod(null)).toBe(false);
    expect(isPeriod(undefined)).toBe(false);
  });
});

describe("compareValues", () => {
  it("should compare periods correctly", () => {
    const result = compareValues("2 semaines", "1 mois");
    expect(result.chosenValue).toBe("1 mois");
    expect(result.chosenType).toBe("SECOND");
    expect(result.isPeriodComparison).toBe(true);
  });

  it("should handle same period durations", () => {
    const result = compareValues("30 jours", "1 mois");
    expect(result.chosenType).toBe("SAME");
    expect(result.isPeriodComparison).toBe(true);
  });

  it("should compare numeric values correctly", () => {
    const result = compareValues(100, 50);
    expect(result.chosenValue).toBe(100);
    expect(result.chosenType).toBe("FIRST");
    expect(result.isPeriodComparison).toBe(false);
  });

  it("should handle mixed types with default to first", () => {
    const result = compareValues("2 semaines", 123);
    expect(result.chosenValue).toBe("2 semaines");
    expect(result.chosenType).toBe("FIRST");
    expect(result.isPeriodComparison).toBe(true);
  });

  it('should handle period with "et demi"', () => {
    const result = compareValues("1 mois et demi", "2 mois");
    expect(result.chosenValue).toBe("2 mois");
    expect(result.chosenType).toBe("SECOND");
    expect(result.isPeriodComparison).toBe(true);
  });

  it('should handle period with "mois" et "jours calendaires"', () => {
    const result = compareValues("2 mois", "8 jours calendaires");
    expect(result.chosenValue).toBe("2 mois");
    expect(result.chosenType).toBe("FIRST");
    expect(result.isPeriodComparison).toBe(true);
  });

  it("should compare two numbers", () => {
    const result = compareValues(8, 12);
    expect(result).toEqual({
      chosenType: "SECOND",
      chosenValue: 12,
      isPeriodComparison: false,
    });
  });

  it("should compare two string with a space", () => {
    const result = compareValues("8 ", "12 ");
    expect(result).toEqual({
      chosenType: "SECOND",
      chosenValue: "12 ",
      isPeriodComparison: false,
    });
  });

  it("should compare two amounts", () => {
    const result = compareValues("8000 €", "12000 €");
    expect(result).toEqual({
      chosenType: "SECOND",
      chosenValue: "12000 €",
      isPeriodComparison: false,
    });
  });
});
