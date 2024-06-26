import { withSentryConfig } from "@sentry/nextjs";
import MappingReplacement from "./redirects.json" assert { type: "json" };

const ContentSecurityPolicy = `
default-src 'self' *.travail.gouv.fr *.data.gouv.fr *.fabrique.social.gouv.fr;
img-src 'self' data: *.fabrique.social.gouv.fr https://travail-emploi.gouv.fr https://mon-entreprise.urssaf.fr https://www.service-public.fr https://cdtn-prod-public.s3.gra.io.cloud.ovh.net;
script-src 'self' https://mon-entreprise.urssaf.fr *.fabrique.social.gouv.fr https://cdnjs.cloudflare.com ${
  process.env.NEXT_PUBLIC_APP_ENV !== "production" && "'unsafe-eval'"
};
frame-src 'self' https://mon-entreprise.urssaf.fr https://matomo.fabrique.social.gouv.fr *.dailymotion.com https://cdtn-prod-public.s3.gra.io.cloud.ovh.net;
style-src 'self' 'unsafe-inline';
font-src 'self' data: blob:;
worker-src 'self' blob:;
child-src 'self' blob:;
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
    ];
    if (process.env.NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT) {
      headers.push({
        key: "X-Robots-Tag",
        value: "all",
      });
      headers.push({
        key: "Content-Security-Policy",
        value: ContentSecurityPolicy.replace(/\n/g, " ").trim(),
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
