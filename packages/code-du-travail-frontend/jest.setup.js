import "@testing-library/jest-dom";

import * as mockRouter from "next-router-mock";

import MockDate from "mockdate";

MockDate.set("2020-1-4");

const useRouter = mockRouter.useRouter;

if (typeof window !== "undefined") {
  window.scrollTo = jest.fn();
  global.setImmediate = jest.useRealTimers;
  global.TextEncoder = require("util").TextEncoder;
  global.TextDecoder = require("util").TextDecoder;
  global.ReadableStream = require("stream").Readable;
}

jest.mock("next/navigation", () => ({
  ...mockRouter,
  useSearchParams: () => {
    const router = useRouter();
    const path = router.query;
    return new URLSearchParams(path);
  },
  usePathname: jest.fn(),
}));

jest.mock("@sentry/nextjs", () => ({
  init: jest.fn(),
  captureException: jest.fn(),
  captureMessage: jest.fn(),
}));

jest.mock("./src/config.ts", () => ({
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
