import {
  filterSituations,
  getNextQuestionKey,
  getOptions,
  getPastQuestions,
  recapSituation
} from "../situation";

jest.mock("@cdt/data...preavis-demission/data.json", () => [
  {
    criteria: { foo: "2| baz", bar: "baz", branche: { id: "10", label: "dix" } }
  },
  { criteria: { foo: "1| foo", branche: { id: "10", label: "dix" } } },
  {
    criteria: {
      foo: "3| bar",
      bar: "foo",
      branche: { id: "20", label: "vingt" }
    }
  }
]);

describe("situations", () => {
  describe("filterSituations", () => {
    it("should return all situations", () => {
      expect(filterSituations().length).toEqual(3);
    });
    it("should return no situation", () => {
      expect(filterSituations({ foo: "bim" }).length).toBe(0);
    });
    it("should return only situation that match id:10", () => {
      expect(filterSituations({ branche: "10" })).toEqual([
        {
          criteria: {
            foo: "2| baz",
            bar: "baz",
            branche: { id: "10", label: "dix" }
          }
        },
        { criteria: { foo: "1| foo", branche: { id: "10", label: "dix" } } }
      ]);
    });
    it("should render only situation that match foo and branch", () => {
      expect(filterSituations({ foo: "2| baz", branche: "10" })).toEqual([
        {
          criteria: {
            foo: "2| baz",
            bar: "baz",
            branche: { id: "10", label: "dix" }
          }
        }
      ]);
    });
  });

  describe("getNextQuestions", () => {
    it("should return branche question key", () => {
      const situations = filterSituations();
      expect(getNextQuestionKey(situations)).toBe("branche");
    });
    it("should return foo question key", () => {
      const situations = filterSituations();
      expect(getNextQuestionKey(situations, { branche: "10" })).toBe("foo");
    });
  });

  describe("getOptions", () => {
    it("should return options for a question key", () => {
      const situations = filterSituations();
      expect(getOptions(situations, "foo")).toEqual([
        ["1| foo", "foo"],
        ["2| baz", "baz"],
        ["3| bar", "bar"]
      ]);
    });
    it("should return options for a question key, given a situation", () => {
      const situations = filterSituations({ branche: "10" });

      expect(getOptions(situations, "foo")).toEqual([
        ["1| foo", "foo"],
        ["2| baz", "baz"]
      ]);
    });
  });
  describe("getPastQuestions", () => {
    it("should return empty questions array", () => {
      expect(getPastQuestions({})).toEqual([]);
    });
    it("should return a tuple array of questions key and questions option for branche", () => {
      expect(getPastQuestions({ branche: "10" })).toEqual([
        ["branche", [["10", "dix"], ["20", "vingt"]]]
      ]);
    });
    it("should return a tuple array of questions key and questions option for branch and bar", () => {
      expect(getPastQuestions({ branche: "10", foo: "2| baz" })).toEqual([
        ["branche", [["10", "dix"], ["20", "vingt"]]],
        ["foo", [["1| foo", "foo"], ["2| baz", "baz"]]]
      ]);
    });
  });
  describe("recapSituation", () => {
    it("should return a text recap", () => {
      expect(
        recapSituation({
          catégorie: "Etam",
          ancienneté: "30",
          groupe: "IV",
          echelon: "375",
          coefficient: "12"
        })
      ).toMatchSnapshot();
    });
  });
});
