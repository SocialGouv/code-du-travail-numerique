import {
  getSupportedAgreement,
  SupportedCcIndemniteLicenciement,
} from "../supported-agreements";

test("Get supported agreement", () => {
  expect(getSupportedAgreement(16)).toBe(
    SupportedCcIndemniteLicenciement.IDCC0016
  );
});

test("Get supported agreement failed", () => {
  expect(getSupportedAgreement(3233)).toBeNull();
});
