import { withSentryConfig } from "@sentry/nextjs";
import MappingReplacement from "./redirects.json" assert { type: "json" };

const ContentSecurityPolicy = `
img-src 'self' https://travail-emploi.gouv.fr https://www.service-public.fr https://cdtn-prod-public.s3.gra.io.cloud.ovh.net https://matomo.fabrique.social.gouv.fr data:;
script-src 'self' https://mon-entreprise.urssaf.fr https://matomo.fabrique.social.gouv.fr 'unsafe-inline' ${
  process.env.NEXT_PUBLIC_APP_ENV !== "production" && "'unsafe-eval'"
};
frame-src 'self' https://mon-entreprise.urssaf.fr https://matomo.fabrique.social.gouv.fr *.dailymotion.com;
connect-src 'self' https://geo.api.gouv.fr https://sentry.fabrique.social.gouv.fr https://matomo.fabrique.social.gouv.fr;
worker-src 'self' blob:;
report-uri ${process.env.NEXT_PUBLIC_SENTRY_BASE_URL}/api/${
  process.env.NEXT_PUBLIC_SENTRY_PROJECT_ID
}/security/?sentry_key=${
  process.env.NEXT_PUBLIC_SENTRY_PUBLIC_KEY
}&sentry_environment=${process.env.NEXT_PUBLIC_SENTRY_ENV}&sentry_release=${
  process.env.NEXT_PUBLIC_SENTRY_RELEASE
};
`;

const sentryConfig = {
  org: process.env.NEXT_PUBLIC_SENTRY_ORG,
  project: process.env.NEXT_PUBLIC_SENTRY_PROJECT,
  sentryUrl: process.env.NEXT_PUBLIC_SENTRY_URL,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  release: {
    name: process.env.NEXT_PUBLIC_SENTRY_RELEASE,
    setCommits: process.env.NEXT_PUBLIC_COMMIT
      ? {
          repo: "SocialGouv/code-du-travail-numerique",
          commit: process.env.NEXT_PUBLIC_COMMIT,
        }
      : { auto: true },
  },
  hideSourceMaps: true,
  widenClientFileUpload: true,
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
    missingSuspenseWithCSRBailout: false,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.woff2$/,
      type: "asset/resource",
    });
    return config;
  },
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
