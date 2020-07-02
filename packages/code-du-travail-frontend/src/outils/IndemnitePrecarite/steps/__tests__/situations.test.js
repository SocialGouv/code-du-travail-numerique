import data from "@cdt/data...prime-precarite/precarite.data.json";

import { getSituationsFor } from "../../../common/situations.utils";
import { isNotYetProcessed, validateSituation } from "../situation";

jest.mock("@cdt/data...prime-precarite/precarite.data.json", () => [
  { criteria: { cddType: "1| foo", hasCdiProposal: "baz" }, idcc: 10 },
  { criteria: { cddType: "1| foo", hasCdiRenewal: "bar" }, idcc: 10 },
  { criteria: { cddType: "2| baz" }, idcc: 10 },
  {
    allowBonus: false,
    criteria: {
      cddType: "3| bar",
    },
    endMessage: "nope",
    hasConventionalProvision: true,
    idcc: 20,
  },
  {
    allowBonus: true,
    criteria: {
      cddType: "4| baz",
    },
    hasConventionalProvision: true,
    idcc: 20,
  },
  {
    criteria: {},
    hasConventionalProvision: null,
    idcc: 30,
  },
]);

describe("situations", () => {
  describe("validateSituation", () => {
    it("should return correct error message", () => {
      const situations = getSituationsFor(data, { idcc: 20 });
      expect(validateSituation(situations, { cddType: "3| bar" })).toEqual({
        criteria: { cddType: "nope" },
      });
    });
    it("should not touch error message if multiple situations match", () => {
      const situations = getSituationsFor(data, { idcc: 20 });
      expect(
        validateSituation(situations, {}, { criteria: { cddType: "yoyo" } })
      ).toEqual({
        criteria: { cddType: "yoyo" },
      });
    });
    it("should override previous error message", () => {
      const situations = getSituationsFor(data, { idcc: 20 });
      expect(
        validateSituation(
          situations,
          { cddType: "4| baz" },
          { criteria: { cddType: "yoyo" } }
        )
      ).toEqual({
        criteria: { cddType: undefined },
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
