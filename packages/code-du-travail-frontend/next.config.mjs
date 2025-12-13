import { withSentryConfig } from "@sentry/nextjs";

const MappingReplacement = await import("./redirects.json", {
  with: { type: "json" },
});

const sentryConfig = {
  // Sentry webpack plugin options
  org: process.env.NEXT_PUBLIC_SENTRY_ORG,
  project: process.env.NEXT_PUBLIC_SENTRY_PROJECT,
  url: process.env.NEXT_PUBLIC_SENTRY_URL,
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Source maps configuration
  sourcemaps: {
    assets: ".next/**/*.{js,map}",
    ignore: ["node_modules/**/*"],
    rewrite: true,
    stripPrefix: ["webpack://_N_E/", "webpack://", "app://"],
    urlPrefix: "app:///_next",
  },

  // Debug and release configuration
  silent: false,
  debug: true,
  release:
    process.env.NEXT_PUBLIC_SENTRY_RELEASE ||
    process.env.NEXT_PUBLIC_GITHUB_SHA ||
    "dev",
  dist: process.env.NEXT_PUBLIC_GITHUB_SHA || "dev",
  setCommits: {
    auto: true,
    ignoreMissing: true,
  },
  deploy: {
    env: process.env.NEXT_PUBLIC_SENTRY_ENV || "development",
    dist: process.env.NEXT_PUBLIC_GITHUB_SHA || "dev",
  },
  injectBuildInformation: true,
};

const sentrySdkConfig = {
  tunnelRoute: false,
  widenClientFileUpload: true,
  hideSourceMaps: false,
  disableLogger: true,

  // Enable component names and release injection
  includeNames: true,
  release: {
    inject: true,
    name:
      process.env.NEXT_PUBLIC_SENTRY_RELEASE ||
      process.env.NEXT_PUBLIC_GITHUB_SHA ||
      "dev",
  },

  // Server instrumentation options
  autoInstrumentServerFunctions: true,
  autoInstrumentMiddleware: true,
  automaticVercelMonitors: true,
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
    // Configure source maps for production
    if (!isServer && !dev) {
      config.devtool = "source-map";
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
    let headers = [
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

export default withSentryConfig(moduleExports, sentryConfig, sentrySdkConfig);
