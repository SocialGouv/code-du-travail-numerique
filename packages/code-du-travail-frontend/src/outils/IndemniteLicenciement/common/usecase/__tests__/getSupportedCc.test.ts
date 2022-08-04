import getSupportedCcIndemniteLicenciement from "../getSupportedCc";

describe("utils - indemnite de licenciement", () => {
  describe("getSupportedCcIndemniteLicenciement", () => {
    test("Get the default CC", () => {
      const supportedCc = getSupportedCcIndemniteLicenciement();
      expect(supportedCc).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            value: "default",
          }),
        ])
      );
    });
  });
});
