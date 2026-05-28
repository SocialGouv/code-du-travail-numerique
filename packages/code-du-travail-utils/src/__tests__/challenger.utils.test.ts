import { computeChallengerReference } from "../challenger.utils";

const SMIC_HOURLY = 12.02;

test("smic_hourly", () => {
  expect(computeChallengerReference("smic_hourly", null, SMIC_HOURLY)).toBe(
    12.02
  );
});

test("smic_monthly_35h", () => {
  expect(
    computeChallengerReference("smic_monthly_35h", null, SMIC_HOURLY)
  ).toBeCloseTo(1823.03, 2);
});

test("smic_monthly_custom with 30h/week", () => {
  expect(
    computeChallengerReference("smic_monthly_custom", "30", SMIC_HOURLY)
  ).toBeCloseTo(1562.6, 2);
});

test("smic_annual", () => {
  expect(
    computeChallengerReference("smic_annual", null, SMIC_HOURLY)
  ).toBeCloseTo(21876.4, 1);
});

test("smic_annual_custom_monthly with 160h/month", () => {
  expect(
    computeChallengerReference("smic_annual_custom_monthly", "160", SMIC_HOURLY)
  ).toBeCloseTo(23078.4, 2);
});

test("smic_annual_custom_week with 30h/week", () => {
  expect(
    computeChallengerReference("smic_annual_custom_week", "30", SMIC_HOURLY)
  ).toBeCloseTo(18751.2, 2);
});

test("smic_monthly_percent with 70%", () => {
  expect(
    computeChallengerReference("smic_monthly_percent", "70", SMIC_HOURLY)
  ).toBeCloseTo(1276.12, 2);
});

test("smic_monthly_multiple with factor 2", () => {
  expect(
    computeChallengerReference("smic_monthly_multiple", "2", SMIC_HOURLY)
  ).toBeCloseTo(3646.07, 2);
});
