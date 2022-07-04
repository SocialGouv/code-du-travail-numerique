import { primePrecariteData as data } from "@cdt/data";

import {
  filterSituations,
  getFormProps,
  getNextQuestionKey,
  getOptions,
  getPastQuestions,
  getSituationsFor,
  getSupportedCC,
  recapSituation,
  skipInformations,
  validateUnsupportedAgreement,
} from "../situations.utils";

const criteriaOrder = ["bar", "foo", "baz", "yolo"];

const ccList = [
  { criteria: { bar: "baz", foo: "1| foo" }, idcc: 10 },
  { criteria: { bar: "bar", foo: "1| foo" }, idcc: 10 },
  { criteria: { bar: "baz", foo: "2| baz" }, idcc: 10 },
  { criteria: { bar: "bar", foo: "2| baz" }, idcc: 10 },
  {
    allowBonus: false,
    criteria: { foo: "3| bar" },
    endMessage: "nope",
    hasConventionalProvision: true,
    idcc: 20,
  },
  {
    allowBonus: true,
    criteria: { foo: "4| baz" },
    hasConventionalProvision: true,
    idcc: 20,
  },
  {
    criteria: {},
    hasConventionalProvision: null,
    idcc: 30,
  },
];

jest.mock("@cdt/data", () => ({
  primePrecariteData: [
    { criteria: { bar: "baz", foo: "1| foo" }, idcc: 10 },
    { criteria: { bar: "bar", foo: "1| foo" }, idcc: 10 },
    { criteria: { bar: "baz", foo: "2| baz" }, idcc: 10 },
    { criteria: { bar: "bar", foo: "2| baz" }, idcc: 10 },
    {
      allowBonus: false,
      criteria: { foo: "3| bar" },
      endMessage: "nope",
      hasConventionalProvision: true,
      idcc: 20,
    },
    {
      allowBonus: true,
      criteria: { foo: "4| baz" },
      hasConventionalProvision: true,
      idcc: 20,
    },
    {
      criteria: {},
      hasConventionalProvision: null,
      idcc: 30,
    },
  ],
}));

describe("situations", () => {
  describe("getInitialSituations", () => {
    it("should return only situation with corresponding idcc", () => {
      const idcc = 10;
      const situations = getSituationsFor(data, { idcc });
      expect(situations.length).toBe(4);
      expect(situations.every((situation) => idcc === situation.idcc)).toBe(
        true
      );
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
        { criteria: { bar: "baz", foo: "1| foo" }, idcc: 10 },
        { criteria: { bar: "bar", foo: "1| foo" }, idcc: 10 },
      ]);
    });
  });

  describe("getNextQuestions", () => {
    it("should return foo question key", () => {
      const idcc = 10;
      const situations = getSituationsFor(data, { idcc });
      expect(getNextQuestionKey(situations, criteriaOrder)).toBe("bar");
    });
    it("should return bar question key", () => {
      const idcc = 10;
      const situations = getSituationsFor(data, { idcc });
      expect(
        getNextQuestionKey(situations, criteriaOrder, { foo: "1| foo" })
      ).toBe("bar");
    });
  });

  describe("getOptions", () => {
    it("should return options for a question key", () => {
      expect(getOptions(data, "foo")).toEqual([
        ["1| foo", "foo"],
        ["2| baz", "baz"],
        ["3| bar", "bar"],
        ["4| baz", "baz"],
      ]);
    });
    it("should return options for a question key, given a situation", () => {
      const situations = getSituationsFor(data, { idcc: 10 });

      expect(getOptions(situations, "foo")).toEqual([
        ["1| foo", "foo"],
        ["2| baz", "baz"],
      ]);
    });
  });

  describe("getPastQuestions", () => {
    it("should return empty questions array", () => {
      const situations = getSituationsFor(data, { idcc: 10 });
      expect(getPastQuestions(situations, criteriaOrder, {})).toEqual([]);
    });

    it("should return a tuple array of questions key and questions option for branch and bar", () => {
      const situations = getSituationsFor(data, { idcc: 10 });
      expect(
        getPastQuestions(situations, criteriaOrder, { bar: "baz" })
      ).toEqual([
        [
          "bar",
          [
            ["bar", "bar"],
            ["baz", "baz"],
          ],
        ],
      ]);
    });
  });

  describe("skip information step", () => {
    it("should return true if there no agreement", () => {
      expect(skipInformations(data, undefined)).toBe(true);
    });
    it("should return true if there no matching agreement", () => {
      expect(skipInformations(data, 9999)).toBe(true);
    });
    it("should return true if there matching agreement but only with empty criteria", () => {
      expect(skipInformations(data, 30)).toBe(true);
    });
    it("should return false if there matching agreement", () => {
      expect(skipInformations(data, 20)).toBe(false);
    });
  });

  describe("recapSituation", () => {
    it("should render formated criteria", () => {
      const criteria = {
        ancienneté: "23| moins de un an",
        catégorie: "15| Agents de maîtrise",
      };
      expect(recapSituation(criteria)).toMatchSnapshot();
    });
  });

  describe("getFormProps", () => {
    it("should return anlist keys", () => {
      const key = "bar";
      const initialSituations = getSituationsFor(data, { idcc: 10 });
      const criteria = { bar: "baz", foo: "1| foo" };
      const pastQuestions = getPastQuestions(
        initialSituations,
        criteriaOrder,
        criteria
      );

      expect(
        getFormProps({
          criteria,
          key,
          pastQuestions,
        })
      ).toEqual(["foo"]);
    });
  });

  describe("getSupportedCC", () => {
    it("should return all supported CC", () => {
      const supportedCCResult = getSupportedCC(ccList);
      expect(supportedCCResult).toHaveLength(3);
      expect(supportedCCResult.find((item) => item.idcc === 99999)).toBe(
        undefined
      );
      expect(supportedCCResult.find((item) => item.idcc === 30)).toStrictEqual({
        fullySupported: true,
        idcc: 30,
      });
      expect(supportedCCResult.find((item) => item.idcc === 20)).toStrictEqual({
        fullySupported: true,
        idcc: 20,
      });
    });
  });
  describe("validateUnsupportedAgreement", () => {
    const validate = validateUnsupportedAgreement(ccList);

    it("should return no error if no agreement", () => {
      expect(validate({})).toStrictEqual({});
    });

    it("should return no error if agreement is supported", () => {
      expect(validate({ ccn: { selected: { num: 20 } } })).toStrictEqual({});
    });

    it("should return one error if agreement is not supported", () => {
      expect(
        validate({ ccn: { selected: { num: "unsupported" } } })
      ).toStrictEqual({
        agreementMissing: true,
      });
    });
  });
});
