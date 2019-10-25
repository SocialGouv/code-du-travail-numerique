import { getSituationsFor } from "../../../common/situations.utils";
import { isNotYetProcessed, validateSituation } from "../situation";

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
  describe("validateSituation", () => {
    it("should return correct error message", () => {
      const situations = getSituationsFor(data, { idcc: "20" });
      expect(validateSituation(situations, { foo: "3| bar" })).toEqual({
        criteria: { foo: "nope" }
      });
    });
    it("should not touch error message if multiple situations match", () => {
      const situations = getSituationsFor(data, { idcc: "20" });
      expect(
        validateSituation(situations, {}, { criteria: { foo: "yoyo" } })
      ).toEqual({
        criteria: { foo: "yoyo" }
      });
    });
    it("should override previous error message", () => {
      const situations = getSituationsFor(data, { idcc: "20" });
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
