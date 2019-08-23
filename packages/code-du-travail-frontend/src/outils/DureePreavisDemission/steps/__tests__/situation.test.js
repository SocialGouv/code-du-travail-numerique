import {
  filterSituations,
  getNextQuestionKey,
  getOptions,
  getPastQuestions,
  recapSituation
} from "../situation";

jest.mock("@cdt/data...preavis-demission/data.json", () => [
  {
    criteria: { foo: "baz", bar: "baz", branche: { idcc: "10", label: "dix" } }
  },
  { criteria: { foo: "foo", branche: { idcc: "10", label: "dix" } } },
  {
    criteria: {
      foo: "bar",
      bar: "foo",
      branche: { idcc: "20", label: "vingt" }
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
    it("should return only situation that match branche:10", () => {
      expect(filterSituations({ branche: "10" })).toEqual([
        {
          criteria: {
            foo: "baz",
            bar: "baz",
            branche: { idcc: "10", label: "dix" }
          }
        },
        { criteria: { foo: "foo", branche: { idcc: "10", label: "dix" } } }
      ]);
    });
    it("should render only situation that match foo and branch", () => {
      expect(filterSituations({ foo: "baz", branche: "10" })).toEqual([
        {
          criteria: {
            foo: "baz",
            bar: "baz",
            branche: { idcc: "10", label: "dix" }
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
    it("should return bar question key", () => {
      const situations = filterSituations();
      expect(getNextQuestionKey(situations, { branche: "10" })).toBe("bar");
    });
  });
  describe("getOptions", () => {
    it("should return options for a question key", () => {
      const situations = filterSituations();
      expect(getOptions(situations, "foo")).toEqual([
        ["bar", "bar"],
        ["baz", "baz"],
        ["foo", "foo"]
      ]);
    });
    it("should return options for a question key, given a situation", () => {
      const situations = filterSituations({ branche: "10" });

      expect(getOptions(situations, "foo")).toEqual([
        ["baz", "baz"],
        ["foo", "foo"]
      ]);
    });
  });
  describe("getPastQuestions", () => {
    it("should return empty questions array", () => {
      expect(getPastQuestions({})).toEqual([]);
    });
    it("should return a tuple array of questions key and questions option for branche", () => {
      expect(getPastQuestions({ branche: "10" })).toEqual([
        [
          "branche",
          [["10", "dix"], ["20", "vingt"], ["0000", "Je ne sais pas"]]
        ]
      ]);
    });
    it("should return a tuple array of questions key and questions option for branch and bar", () => {
      expect(getPastQuestions({ branche: "10", foo: "bar" })).toEqual([
        [
          "branche",
          [["10", "dix"], ["20", "vingt"], ["0000", "Je ne sais pas"]]
        ],
        ["foo", [["baz", "baz"], ["foo", "foo"]]]
      ]);
    });
  });
  describe("recapSituation", () => {
    it("should return a text recap", () => {
      expect(
        recapSituation({
          catégorie: "Etam",
          ancienneté: 30,
          groupe: "IV",
          echelon: 375,
          coefficient: 12
        })
      ).toMatchInlineSnapshot(`
<React.Fragment>
  <React.Fragment>
    <React.Fragment>
      <React.Fragment>
        <React.Fragment>
          appartenant à la catégorie
          <em>
            Etam
          </em>
        </React.Fragment>
        ,
        <React.Fragment>
          avec
          <em>
            30
          </em>
           d’ancienneté
        </React.Fragment>
      </React.Fragment>
      ,
      <React.Fragment>
        dans le groupe
        <em>
          IV
        </em>
      </React.Fragment>
    </React.Fragment>
    ,
    <React.Fragment>
      avec un échelon de
      <em>
        375
      </em>
    </React.Fragment>
  </React.Fragment>
  ,
  <React.Fragment>
    avec un coefficient
    <em>
      12
    </em>
  </React.Fragment>
</React.Fragment>
`);
    });
  });
});
