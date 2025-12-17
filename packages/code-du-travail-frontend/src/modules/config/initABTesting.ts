export enum ABTestVariant {
  SEARCH_V1 = "original",
  SEARCH_V2 = "search_v2",
}

export enum ABTesting {
  SEARCH = "search_ab_test",
}

export function initABTesting(
  pathname: string,
  excludeUrlsPatterns?: RegExp[]
) {
  if (typeof window === "undefined" || !window || !window._paq) return;

  // Initialize default state
  window.__MATOMO_AB_TEST__ = {
    abTest: ABTesting.SEARCH,
    variant: ABTestVariant.SEARCH_V2,
    isReady: false,
  };

  const isExcludedUrl = (path: string): boolean => {
    if (!excludeUrlsPatterns || excludeUrlsPatterns.length === 0) return false;
    return excludeUrlsPatterns.some((pattern) => pattern.test(path));
  };

  if (!pathname || isExcludedUrl(pathname)) {
    return;
  }

  const onVariantActivated = (test: ABTesting, variant: ABTestVariant) => {
    window.__MATOMO_AB_TEST__ = {
      abTest: test,
      variant,
      isReady: true,
    };
    console.log("[AB Testing] Variant activated:", variant);
  };

  const abTestConfig = {
    name: ABTesting.SEARCH,
    percentage: 100,
    includedTargets: [
      { attribute: "url", inverted: "0", type: "any", value: "" },
    ],
    excludedTargets: [],
    startDateTime: "2025/12/02 00:00:00 UTC",
    endDateTime: "2026/02/28 23:59:59 UTC",
    variations: [
      {
        name: ABTestVariant.SEARCH_V1,
        activate: function () {
          console.log("[AB Testing] SEARCH_V1 version");
          onVariantActivated(ABTesting.SEARCH, ABTestVariant.SEARCH_V1);
        },
      },
      {
        name: ABTestVariant.SEARCH_V2,
        activate: function () {
          console.log("[AB Testing] SEARCH_V2 version");
          onVariantActivated(ABTesting.SEARCH, ABTestVariant.SEARCH_V2);
        },
      },
    ],
    trigger: function () {
      return true; // Customize which visitors participate in this experiment
    },
  };

  window._paq.push(["AbTesting::create", abTestConfig]);
}
