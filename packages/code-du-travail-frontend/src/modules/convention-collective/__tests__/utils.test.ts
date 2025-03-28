import { getIdConvention } from "../utils";

describe("getIdConvention", () => {
  it("should extract idConvention from valid URL", () => {
    const url =
      "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635994";
    expect(getIdConvention(url)).toBe("KALICONT000005635994");
  });

  it("should return null for URL without idConvention", () => {
    const url =
      "https://www.legifrance.gouv.fr/affichIDCC.do?someOtherParam=value";
    expect(getIdConvention(url)).toBeNull();
  });

  it("should return null for invalid URL", () => {
    const url = "not-a-valid-url";
    expect(getIdConvention(url)).toBeNull();
  });

  it("should return null for empty URL", () => {
    expect(getIdConvention("")).toBeNull();
  });

  it("should return null for undefined URL", () => {
    expect(getIdConvention(undefined as unknown as string)).toBeNull();
  });
});
