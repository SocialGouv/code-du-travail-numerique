import { computeRequiredSeniority } from "../requiredSeniority";

describe("requiredSeniority", () => {
  it("should work", () => {
    expect(
      computeRequiredSeniority({
        dateEntree: "01/01/2020",
        dateNotification: "01/02/2022",
      })
    ).toBe(2.0833333333333335);
  });
});
