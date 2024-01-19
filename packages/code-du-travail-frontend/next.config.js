const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const ContentSecurityPolicy = `
default-src 'self' *.travail.gouv.fr *.data.gouv.fr *.fabrique.social.gouv.fr;
img-src 'self' data: *.fabrique.social.gouv.fr https://travail-emploi.gouv.fr https://mon-entreprise.urssaf.fr https://www.service-public.fr https://cdtnadminprod.blob.core.windows.net https://cdtnadmindev.blob.core.windows.net *.adform.net;
script-src 'self' https://mon-entreprise.urssaf.fr *.fabrique.social.gouv.fr https://cdnjs.cloudflare.com *.adform.net ${
  process.env.NEXT_PUBLIC_APP_ENV !== "production" && "'unsafe-eval'"
};
frame-src 'self' https://mon-entreprise.urssaf.fr https://matomo.fabrique.social.gouv.fr *.dailymotion.com https://cdtnadminprod.blob.core.windows.net;
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
  webpack: config => {
    config.module.rules.push({
      test: /\.woff2$/,
      type: "asset/resource"
    });
    return config;
  },
  //This option requires Next 13.1 or newer, if you can't update you can use this plugin instead: https://github.com/martpie/next-transpile-modules
  transpilePackages: [
    "@codegouvfr/react-dsfr",
    "tss-react" // This is for MUI or if you use htts://tss-react.dev
  ],
  eslint: {
    ignoreDuringBuilds: true,
  },
  staticPageGenerationTimeout: 60 * 5, // 5 minutes
};

const moduleExports = {
  ...nextConfig,
  async headers() {
    let headers = [
      // {
      //   key: "X-Content-Type-Options",
      //   value: "nosniff",
      // },
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

module.exports = withBundleAnalyzer(
  withSentryConfig(moduleExports, sentryConfig)
);
