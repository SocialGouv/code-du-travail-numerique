import "@testing-library/jest-dom";

import MockDate from "mockdate";

import * as mockRouter from "next-router-mock";

const useRouter = mockRouter.useRouter;

jest.mock("next/navigation", () => ({
  ...mockRouter,
  useSearchParams: () => {
    const router = useRouter();
    const path = router.query;
    return new URLSearchParams(path);
  },
  usePathname: jest.fn(),
}));

MockDate.set("2020-1-4");

if (typeof window !== "undefined") {
  window.scrollTo = jest.fn();
  /**
   * this removes the reach-ui warning that check modal css import
   */
  require("@reach/utils").checkStyles = jest.fn();
  global.setImmediate = jest.useRealTimers;
  global.TextEncoder = require("util").TextEncoder;
  global.TextDecoder = require("util").TextDecoder;
}

jest.mock("../src/config", () => ({
  SITE_URL: "http://api.url",
  BUCKET_URL: "bucket.url",
  BUCKET_FOLDER: "preview",
  BUCKET_SITEMAP_FOLDER: "sitemap",
  PACKAGE_VERSION: "vX.Y.Z",
  ENTERPRISE_API_URL: "https://api-entreprise",
  API_GEO_URL: "https://api-geo",
  SUGGEST_DEBOUNCE_DELAY: 300,
  SUGGEST_MAX_RESULTS: 5,
  MAX_RELATED_ITEMS_MODELS_AND_TOOLS: 2,
  MAX_RELATED_ITEMS_ARTICLES: 4,
}));
