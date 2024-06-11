const ContentSecurityPolicy = `
default-src 'self' *.travail.gouv.fr *.data.gouv.fr *.fabrique.social.gouv.fr;
img-src 'self' data: *.fabrique.social.gouv.fr https://travail-emploi.gouv.fr https://mon-entreprise.urssaf.fr https://www.service-public.fr https://cdtn-prod-public.s3.gra.io.cloud.ovh.net;
script-src 'self' https://mon-entreprise.urssaf.fr *.fabrique.social.gouv.fr https://cdnjs.cloudflare.com ${process.env.NEXT_PUBLIC_APP_ENV !== "production" && "'unsafe-eval'"
  };
frame-src 'self' https://mon-entreprise.urssaf.fr https://matomo.fabrique.social.gouv.fr *.dailymotion.com https://cdtn-prod-public.s3.gra.io.cloud.ovh.net;
style-src 'self' 'unsafe-inline';
font-src 'self' data: blob:;
worker-src 'self' blob:;
child-src 'self' blob:;
`;

const { withSentryConfig } = require("@sentry/nextjs");
const MappingReplacement = require("./redirects");

// See config here : https://github.com/getsentry/sentry-webpack-plugin#options
const sentryConfig = {
  org: process.env.NEXT_PUBLIC_SENTRY_ORG,
  project: process.env.NEXT_PUBLIC_SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  release: process.env.NEXT_PUBLIC_SENTRY_RELEASE,
  url: process.env.NEXT_PUBLIC_SENTRY_URL,
};

const nextConfig = {
  poweredByHeader: false,
  sentry: {
    hideSourceMaps: true,
    widenClientFileUpload: true,
  },
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
  experimental: { instrumentationHook: true }, // for sentry opentelemtry instrumentation
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

module.exports = withSentryConfig(moduleExports, sentryConfig);
