import { withSentryConfig } from "@sentry/nextjs";
import MappingReplacement from "./redirects.json" assert { type: "json" };

const ContentSecurityPolicy = `
img-src 'self' https://travail-emploi.gouv.fr https://www.service-public.fr https://cdtn-prod-public.s3.gra.io.cloud.ovh.net https://matomo.fabrique.social.gouv.fr;
script-src 'self' https://mon-entreprise.urssaf.fr https://matomo.fabrique.social.gouv.fr ${
  process.env.NEXT_PUBLIC_APP_ENV !== "production" ? "'unsafe-eval'" : ""
};
frame-src 'self' https://mon-entreprise.urssaf.fr https://matomo.fabrique.social.gouv.fr *.dailymotion.com;
connect-src 'self' https://geo.api.gouv.fr https://sentry2.fabrique.social.gouv.fr https://matomo.fabrique.social.gouv.fr;
worker-src 'self' blob:;
`;

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
  poweredByHeader: false,
  compiler: {
    reactRemoveProperties:
      process.env.NEXT_PUBLIC_APP_ENV === "production"
        ? { properties: ["data-testid"] }
        : false,
    styledComponents: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  staticPageGenerationTimeout: 60 * 5, // 5 minutes
  experimental: {
    instrumentationHook: true,
  },
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
      {
        key: "Content-Security-Policy",
        value: ContentSecurityPolicy.replace(/\n/g, " ").trim(),
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
    return MappingReplacement;
  },
};

export default withSentryConfig(moduleExports, sentryConfig);
