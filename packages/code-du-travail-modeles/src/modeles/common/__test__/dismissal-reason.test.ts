import { DismissalReasonDefault } from "../dismissal-reason";

describe("DismissalReasonDefault", () => {
  let dismissalReason = new DismissalReasonDefault();

  beforeEach(() => {
    dismissalReason = new DismissalReasonDefault();
  });

  describe("dismissalTypes", () => {
    test("should return an empty array", () => {
      const result = dismissalReason.dismissalTypes();
      expect(result).toEqual([]);
    });
  });
});
