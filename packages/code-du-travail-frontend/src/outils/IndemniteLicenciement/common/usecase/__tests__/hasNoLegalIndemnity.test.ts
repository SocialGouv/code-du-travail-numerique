import hasNoLegalIndemnity from "../hasNoLegalIndemnity";

describe("hasNoLegalIndemnity", () => {
  test("Get a CC with no legal indemnity", () => {
    expect(hasNoLegalIndemnity(3239)).toEqual(true);
  });
  test("Get a random CC with legal indemnity", () => {
    expect(hasNoLegalIndemnity(1486)).toEqual(false);
  });
});
