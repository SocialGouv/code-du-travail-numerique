import { SupportedTypes } from "@socialgouv/modeles-social";
import getSupportedCc from "../getSupportedCc";

describe("utils - indemnite de licenciement", () => {
  describe("getSupportedCc", () => {
    test("Get the default CC", () => {
      const supportedCc = getSupportedCc();
      expect(supportedCc).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            fullySupported: SupportedTypes.FULLY_SUPPORTED,
            idcc: 2264,
          }),
        ]),
      );
    });
  });
});
