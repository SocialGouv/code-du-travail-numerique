import Engine from "publicodes";

import { extractSupportedCc } from "../extractSupportedCc";
import { mergeCommonModels } from "../merger";

describe("extractSupportedCc", () => {
  test("Verify that CC 1480 is not supported for indemnité licenciement", () => {
    const supportedCc = extractSupportedCc(new Engine(mergeCommonModels()));
    expect(supportedCc.find(({ idcc }) => idcc === 1480)).toEqual({
      idcc: 1480,
      indemniteLicenciement: "neverSupported",
      preavisRetraite: "fullySupported",
    });
  });
});
