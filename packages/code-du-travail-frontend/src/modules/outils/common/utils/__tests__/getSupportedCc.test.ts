import {
  PublicodesSimulator,
  SupportedTypes,
} from "@socialgouv/modeles-social";
import getSupportedCc from "../getSupportedCc";

describe("utils - indemnite de licenciement", () => {
  describe("getSupportedCc", () => {
    test("Get the default CC for indemnité de licenciement", () => {
      const supportedCc = getSupportedCc(
        PublicodesSimulator.INDEMNITE_LICENCIEMENT
      );
      expect(supportedCc).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            fullySupported: SupportedTypes.FULLY_SUPPORTED,
            idcc: 2264,
          }),
        ])
      );
    });

    test("Get the default CC for préavis-demission", () => {
      const supportedCc = getSupportedCc(PublicodesSimulator.PREAVIS_DEMISSION);
      expect(supportedCc).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            fullySupported: SupportedTypes.FULLY_SUPPORTED,
            idcc: 16,
          }),
        ])
      );
    });
  });
});
