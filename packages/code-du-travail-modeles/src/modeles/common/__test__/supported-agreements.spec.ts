import { getSupportedAgreement, SupportedCc } from "../supported-agreements";

test("Get supported agreement", () => {
  expect(getSupportedAgreement(16)).toBe(SupportedCc.IDCC0016);
});

test("Get supported agreement failed", () => {
  expect(getSupportedAgreement(3233)).toBeNull();
});
