import { detectIfPostalCode } from "../utils";

describe("detectIfPostalCode", () => {
  test("should return true for valid postal code", () => {
    const postalCode = "12345";
    const result = detectIfPostalCode(postalCode);
    expect(result).toBe(true);
  });

  test("should return false for invalid postal code", () => {
    const postalCode = "ABCDE";
    const result = detectIfPostalCode(postalCode);
    expect(result).toBe(false);
  });
});
