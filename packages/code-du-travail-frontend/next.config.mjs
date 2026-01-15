import { withSentryConfig } from "@sentry/nextjs";
import fs from "node:fs";
import path from "node:path";

const MappingReplacement = await import("./redirects.json", {
  with: { type: "json" },
});

// Docker builds often don't include the `.git` directory.
// When missing, `releases set-commits --auto` fails hard in Sentry CLI.
const HAS_GIT_REPO = [".git", "../.git", "../../.git", "../../../.git"].some(
  (p) => fs.existsSync(path.resolve(process.cwd(), p))
);

const RELEASE =
  process.env.NEXT_PUBLIC_SENTRY_RELEASE ||
  process.env.SENTRY_RELEASE ||
  process.env.NEXT_PUBLIC_GITHUB_SHA ||
  process.env.VERCEL_GIT_COMMIT_SHA ||
  "dev";

const DIST =
  process.env.NEXT_PUBLIC_GITHUB_SHA ||
  process.env.VERCEL_GIT_COMMIT_SHA ||
  "dev";

const SENTRY_ORG = process.env.SENTRY_ORG || process.env.NEXT_PUBLIC_SENTRY_ORG;
const SENTRY_PROJECT =
  process.env.SENTRY_PROJECT || process.env.NEXT_PUBLIC_SENTRY_PROJECT;
const SENTRY_URL = process.env.SENTRY_URL || process.env.NEXT_PUBLIC_SENTRY_URL;

// Fail the build on Sentry upload errors in CI/production, but be permissive locally.
const SHOULD_FAIL_ON_SENTRY_BUILD_ERROR =
  process.env.CI === "true" ||
  process.env.VERCEL_ENV === "production" ||
  process.env.NEXT_PUBLIC_APP_ENV === "production" ||
  process.env.NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT === "true";

const sentryBuildOptions = {
  org: SENTRY_ORG,
  project: SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  sentryUrl: SENTRY_URL,

  silent: process.env.SENTRY_DEBUG !== "true",
  debug: process.env.SENTRY_DEBUG === "true",

  // Source maps upload (webpack plugin options)
  sourcemaps: {
    // If you want to fully disable sourcemaps generation/upload, set this to true.
    disable: false,
    assets: ".next/**/*.{js,map}",
    ignore: ["node_modules/**/*"],
    // Sentry defaults to deleting client sourcemaps after upload; we set it explicitly.
    deleteSourcemapsAfterUpload: true,
  },

  // Release management
  release: {
    name: RELEASE,
    dist: DIST,
    ...(HAS_GIT_REPO && process.env.SENTRY_DISABLE_GIT_SET_COMMITS !== "true"
      ? {
          setCommits: {
            auto: true,
            ignoreMissing: true,
          },
        }
      : {}),
    deploy: {
      env:
        process.env.NEXT_PUBLIC_SENTRY_ENV ||
        process.env.SENTRY_ENVIRONMENT ||
        "development",
    },
  },

  // Upload a wider set of client files (Next.js internals + deps) for better stacktraces
  widenClientFileUpload: true,

  // Build-time instrumentation behavior
  webpack: {
    autoInstrumentServerFunctions: true,
    autoInstrumentMiddleware: true,
    autoInstrumentAppDirectory: true,
    automaticVercelMonitors: true,

    // Bundle size optimizations
    treeshake: {
      removeDebugLogging: true,
    },

    // React component name annotations (replays + breadcrumbs)
    reactComponentAnnotation: {
      enabled: true,
    },
  },

  errorHandler: (err) => {
    if (SHOULD_FAIL_ON_SENTRY_BUILD_ERROR) throw err;
    console.warn(err);
  },
};

const nextConfig = {
  // Issue with meta rendering : https://github.com/vercel/next.js/issues/79313
  htmlLimitedBots: /.*/,
  poweredByHeader: false,
  compiler: {
    reactRemoveProperties:
      process.env.NEXT_PUBLIC_APP_ENV === "production"
        ? { properties: ["data-testid"] }
        : false,
  },
  reactCompiler: true,
  staticPageGenerationTimeout: 60 * 5, // 5 minutes
  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.woff2$/,
      type: "asset/resource",
    });

    // Let Sentry manage sourcemap settings (it uses `hidden-source-map` for client builds by default).
    // We only keep our deterministic optimization tweaks.
    if (!isServer && !dev) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        moduleIds: "deterministic",
        chunkIds: "deterministic",
      };
    }

    return config;
  },
  transpilePackages: ["@codegouvfr/react-dsfr"],
};

const moduleExports = {
  ...nextConfig,
  async headers() {
    const headers = [
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
    ];
    if (process.env.NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT) {
      headers.push({
        key: "X-Robots-Tag",
        value: "all",
      });
    } else {
      headers.push({
        key: "X-Robots-Tag",
        value: "noindex, nofollow, nosnippet",
      });
    }
    return [
      {
        source: "/:path*",
        headers,
      },
      {
        source: "/((?!widgets|widget.html$).*)", // all paths except those starting with "/widgets" or /widget.html used in widgets
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
        ],
      },
    ];
  },

  async redirects() {
    return MappingReplacement.default;
  },
};

export default withSentryConfig(moduleExports, sentryBuildOptions);
