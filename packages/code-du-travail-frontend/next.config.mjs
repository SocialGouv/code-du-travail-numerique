import { withSentryConfig } from "@sentry/nextjs";
import MappingReplacement from "./redirects.json" assert { type: "json" };

const ContentSecurityPolicy = `
img-src 'self' https://travail-emploi.gouv.fr https://www.service-public.fr;
script-src 'self' https://mon-entreprise.urssaf.fr https://matomo.fabrique.social.gouv.fr ${
  process.env.NEXT_PUBLIC_APP_ENV !== "production" && "'unsafe-eval'"
};
connect-src 'self' https://geo.api.gouv.fr ${process.env.NEXT_PUBLIC_SENTRY_BASE_URL} https://matomo.fabrique.social.gouv.fr;
worker-src 'self' blob:;
report-uri ${process.env.NEXT_PUBLIC_SENTRY_BASE_URL}/api/${
  process.env.NEXT_PUBLIC_SENTRY_PROJECT_ID
}/security/?sentry_key=${process.env.NEXT_PUBLIC_SENTRY_PUBLIC_KEY}&sentry_environment=${process.env.NEXT_PUBLIC_SENTRY_ENV};
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
  experimental: { instrumentationHook: true },
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
