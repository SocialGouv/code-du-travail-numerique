import {
  getSituationsFor,
  filterSituations,
  getNextQuestionKey,
  getOptions,
  getPastQuestions,
  validateSituation,
  isNotYetProcessed
} from "../situation";

import data from "@cdt/data...prime-precarite/precarite.data.json";

jest.mock("@cdt/data...prime-precarite/precarite.data.json", () => [
  { idcc: "10", criteria: { foo: "1| foo", bar: "baz" } },
  { idcc: "10", criteria: { foo: "1| foo", bar: "bar" } },
  { idcc: "10", criteria: { foo: "2| baz" } },
  {
    idcc: "20",
    criteria: {
      foo: "3| bar"
    },
    allowBonus: false,
    endMessage: "nope",
    hasConventionalProvision: true
  },
  {
    idcc: "20",
    criteria: {
      foo: "4| baz"
    },
    allowBonus: true,
    hasConventionalProvision: true
  },
  {
    idcc: "30",
    criteria: {},
    hasConventionalProvision: null
  }
]);

describe("situations", () => {
  describe("getInitialSituations", () => {
    it("should return only situation with corresponding idcc", () => {
      const idcc = "10";
      const situations = getSituationsFor({ idcc });
      expect(situations.length).toBe(3);
      expect(situations.every(situation => idcc === situation.idcc)).toBe(true);
    });
  });

  describe("filterSituations", () => {
    it("should return all situations", () => {
      expect(filterSituations(data).length).toEqual(data.length);
    });
    it("should return no situation", () => {
      expect(filterSituations(data, { foo: "no" }).length).toBe(0);
    });
    it("should render only situation that match foo", () => {
      expect(filterSituations(data, { foo: "1| foo" })).toEqual([
        { idcc: "10", criteria: { foo: "1| foo", bar: "baz" } },
        { idcc: "10", criteria: { foo: "1| foo", bar: "bar" } }
      ]);
    });
  });

  describe("getNextQuestions", () => {
    it("should return foo question key", () => {
      expect(getNextQuestionKey(data)).toBe("foo");
    });
    it("should return bar question key", () => {
      const situations = filterSituations(data, { foo: "1| foo" });
      expect(getNextQuestionKey(situations, { foo: "1| foo" })).toBe("bar");
    });
  });

  describe("getOptions", () => {
    it("should return options for a question key", () => {
      expect(getOptions(data, "foo")).toEqual([
        ["1| foo", "foo"],
        ["2| baz", "baz"],
        ["3| bar", "bar"],
        ["4| baz", "baz"]
      ]);
    });
    it("should return options for a question key, given a situation", () => {
      const situations = getSituationsFor({ idcc: "10" });

      expect(getOptions(situations, "foo")).toEqual([
        ["1| foo", "foo"],
        ["2| baz", "baz"]
      ]);
    });
  });

  describe("getPastQuestions", () => {
    it("should return empty questions array", () => {
      const situations = getSituationsFor({ idcc: "10" });
      expect(getPastQuestions(situations, {})).toEqual([]);
    });

    it("should return a tuple array of questions key and questions option for branch and bar", () => {
      const situations = getSituationsFor({ idcc: "10" });
      expect(getPastQuestions(situations, { foo: "2| baz" })).toEqual([
        ["foo", [["1| foo", "foo"], ["2| baz", "baz"]]]
      ]);
    });
  });

  describe("validateSituation", () => {
    it("should return correct error message", () => {
      const situations = getSituationsFor({ idcc: "20" });
      expect(validateSituation(situations, { foo: "3| bar" })).toEqual({
        criteria: { foo: "nope" }
      });
    });
    it("should not touch error message if multiple situations match", () => {
      const situations = getSituationsFor({ idcc: "20" });
      expect(
        validateSituation(situations, {}, { criteria: { foo: "yoyo" } })
      ).toEqual({
        criteria: { foo: "yoyo" }
      });
    });
    it("should override previous error message", () => {
      const situations = getSituationsFor({ idcc: "20" });
      expect(
        validateSituation(
          situations,
          { foo: "4| baz" },
          { criteria: { foo: "yoyo" } }
        )
      ).toEqual({
        criteria: { foo: undefined }
      });
    });
  });

  describe("isNotYetProcessed", () => {
    it("should return true if there no matching cc", () => {
      expect(isNotYetProcessed("toto")).toBe(true);
    });
    it("should return true if cc hasConventionalProvision to null", () => {
      expect(isNotYetProcessed("30")).toBe(true);
    });
    it("should return false if cc hasConventionalProvision to true", () => {
      expect(isNotYetProcessed("20")).toBe(false);
    });
  });
});
