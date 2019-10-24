import {
  getSituationsFor,
  filterSituations,
  getNextQuestionKey,
  getOptions,
  getPastQuestions,
  isNotYetProcessed
} from "../situations.utils";

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
      const situations = getSituationsFor(data, { idcc });
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
      const situations = getSituationsFor(data, { idcc: "10" });

      expect(getOptions(situations, "foo")).toEqual([
        ["1| foo", "foo"],
        ["2| baz", "baz"]
      ]);
    });
  });

  describe("getPastQuestions", () => {
    it("should return empty questions array", () => {
      const situations = getSituationsFor(data, { idcc: "10" });
      expect(getPastQuestions(situations, {})).toEqual([]);
    });

    it("should return a tuple array of questions key and questions option for branch and bar", () => {
      const situations = getSituationsFor(data, { idcc: "10" });
      expect(getPastQuestions(situations, { foo: "2| baz" })).toEqual([
        ["foo", [["1| foo", "foo"], ["2| baz", "baz"]]]
      ]);
    });
  });

  describe("isNotYetProcessed", () => {
    it("should return true if there no matching cc", () => {
      expect(isNotYetProcessed(data, "toto")).toBe(true);
    });
    it("should return false if there matching cc", () => {
      expect(isNotYetProcessed(data, "20")).toBe(false);
    });
  });
});
