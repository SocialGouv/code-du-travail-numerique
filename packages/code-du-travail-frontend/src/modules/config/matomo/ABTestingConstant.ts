import { SITE_URL } from "../../../config";

export enum ABTesting {
  SEARCH = "Search",
}

export enum ABTestVariant {
  ORIGINAL = "original",
  NEUTRAL = "neutral",
  NATURAL = "natural",
}

export const ABTestingConfig = (
  callback: (test: ABTesting, variant: ABTestVariant) => void
) => ({
  name: ABTesting.SEARCH,
  percentage: 100,
  includedTargets: [
    {
      attribute: "url",
      inverted: "0",
      type: "equals_exactly",
      value: SITE_URL,
    },
  ],
  excludedTargets: [],
  variations: [
    {
      name: ABTestVariant.ORIGINAL,
      activate: function () {
        console.log("[AB Testing] Original version");
        callback(ABTesting.SEARCH, ABTestVariant.ORIGINAL);
      },
    },
    {
      name: ABTestVariant.NEUTRAL,
      activate: function () {
        console.log("[AB Testing] Neutral version");
        callback(ABTesting.SEARCH, ABTestVariant.NEUTRAL);
      },
    },
    {
      name: ABTestVariant.NATURAL,
      activate: function () {
        console.log("[AB Testing] Natural language version");
        callback(ABTesting.SEARCH, ABTestVariant.NATURAL);
      },
    },
  ],
  trigger: function () {
    return true; // here you can further customize which of your visitors will participate in this experiment
  },
});
