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

  // Polyfills for libs (undici/@elastic) that rely on some Web APIs being present in the runtime.
  // - undici expects MessagePort/MessageChannel to exist (browser-like globals)
  // - some code expects ReadableStream (Web Streams)
  try {
    const { MessageChannel, MessagePort } = require("worker_threads");
    global.MessageChannel ??= MessageChannel;
    global.MessagePort ??= MessagePort;
  } catch {
    // ignore
  }

  try {
    const { ReadableStream } = require("stream/web");
    global.ReadableStream ??= ReadableStream;
  } catch {
    // ignore
  }

  Element.prototype.scrollIntoView = jest.fn();
}

jest.mock("next/navigation", () => ({
  ...mockRouter,
  useSearchParams: () => {
    const router = useRouter();
    const path = router.query;
    return new URLSearchParams(path);
  },
  usePathname: jest.fn(() => "/"),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
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

// uuid@13 ships ESM; jest runs in CJS mode here and may choke on node_modules ESM.
// For unit tests we need deterministic *and* unique UUIDs (some tests assert ID uniqueness).
let __uuidCounter = 0;

beforeEach(() => {
  __uuidCounter = 0;
});

jest.mock("uuid", () => ({
  v4: () => {
    const suffix = String(__uuidCounter++).padStart(12, "0");
    return `00000000-0000-4000-8000-${suffix}`;
  },
}));
