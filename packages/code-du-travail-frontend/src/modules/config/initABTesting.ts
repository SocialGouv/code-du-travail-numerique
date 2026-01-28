export type ABTestName = string;
export type ABTestVariant = string;

export type ABTestVariation = {
  name: ABTestVariant;
};

export type ABTestDefinition = {
  /** Matomo experiment name */
  name: ABTestName;
  /** Percentage of visitors included (0-100) */
  percentage: number;
  /** Available variations */
  variations: ABTestVariation[];
  /** Optional experiment window */
  startDateTime?: string;
  endDateTime?: string;
  /** Optional custom participation rule */
  trigger?: () => boolean;
};

type MatomoABTestState = {
  abTest: ABTestName;
  variant: ABTestVariant | null;
  isReady: boolean;
};

declare global {
  interface Window {
    /**
     * Stores activated Matomo A/B tests.
     * Keyed by test name to support multiple experiments.
     */
    __MATOMO_AB_TEST__?: Record<string, MatomoABTestState>;
  }
}

type InitABTestingParams = {
  enabled: boolean;
  pathname: string;
  excludeUrlsPatterns?: RegExp[];
  tests: ABTestDefinition[];
};

export function initABTesting({
  enabled,
  pathname,
  excludeUrlsPatterns,
  tests,
}: InitABTestingParams) {
  if (!enabled) return;

  const paq = (
    typeof window !== "undefined" ? (window as any)?._paq : undefined
  ) as any[] | undefined;
  if (!paq) return;

  const isExcludedUrl = (path: string): boolean => {
    if (!excludeUrlsPatterns || excludeUrlsPatterns.length === 0) return false;
    return excludeUrlsPatterns.some((pattern) => pattern.test(path));
  };

  if (!pathname || isExcludedUrl(pathname)) {
    return;
  }

  if (!tests || tests.length === 0) {
    return;
  }

  window.__MATOMO_AB_TEST__ = window.__MATOMO_AB_TEST__ ?? {};

  for (const test of tests) {
    // Ensure we always have an entry, even before Matomo activates a variant
    if (!window.__MATOMO_AB_TEST__[test.name]) {
      window.__MATOMO_AB_TEST__[test.name] = {
        abTest: test.name,
        variant: null,
        isReady: false,
      };
    }

    const onVariantActivated = (variant: ABTestVariant) => {
      window.__MATOMO_AB_TEST__ = window.__MATOMO_AB_TEST__ ?? {};
      window.__MATOMO_AB_TEST__[test.name] = {
        abTest: test.name,
        variant,
        isReady: true,
      };
    };

    const abTestConfig: any = {
      name: test.name,
      percentage: test.percentage,
      includedTargets: [
        { attribute: "url", inverted: "0", type: "any", value: "" },
      ],
      excludedTargets: [],
      variations: test.variations.map((v) => ({
        name: v.name,
        activate: function () {
          onVariantActivated(v.name);
        },
      })),
      trigger:
        test.trigger ??
        function () {
          return true;
        },
    };

    if (test.startDateTime) abTestConfig.startDateTime = test.startDateTime;
    if (test.endDateTime) abTestConfig.endDateTime = test.endDateTime;

    paq.push(["AbTesting::create", abTestConfig]);
  }
}
