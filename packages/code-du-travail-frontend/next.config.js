const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const ContentSecurityPolicy = `
default-src 'self' *.travail.gouv.fr *.data.gouv.fr *.fabrique.social.gouv.fr;
img-src 'self' data: *.fabrique.social.gouv.fr https://travail-emploi.gouv.fr https://mon-entreprise.urssaf.fr https://cdtnadminprod.blob.core.windows.net https://cdtnadmindev.blob.core.windows.net;
script-src 'self' https://mon-entreprise.urssaf.fr *.fabrique.social.gouv.fr https://cdnjs.cloudflare.com ${
  process.env.NODE_ENV !== "production" && "'unsafe-eval'"
};
frame-src 'self' https://mon-entreprise.urssaf.fr https://matomo.fabrique.social.gouv.fr *.dailymotion.com;
style-src 'self' 'unsafe-inline';
font-src 'self' data: blob:;
prefetch-src 'self' *.fabrique.social.gouv.fr;
`;

const { withSentryConfig } = require("@sentry/nextjs");
const MappingReplacement = require("./redirects");

const compose =
  (...fns) =>
  (args) =>
    fns.reduceRight((arg, fn) => fn(arg), args);

const nextConfig = {
  devIndicators: {
    autoPrerender: false,
  },
  poweredByHeader: false,
  sentry: {
    disableClientWebpackPlugin: true,
    disableServerWebpackPlugin: true,
  },
  compiler: {
    reactRemoveProperties:
      process.env.NODE_ENV === "production"
        ? { properties: ["data-testid"] }
        : false,
    styledComponents: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  staticPageGenerationTimeout: 60 * 5, // 5 minutes
};

module.exports = {
  async headers() {
    let headers;
    if (process.env.NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT) {
      headers = [
        {
          key: "X-Robots-Tag",
          value: "all",
        },
        {
          key: "Content-Security-Policy",
          value: ContentSecurityPolicy.replace(/\n/g, " ").trim(),
        },
      ];
    } else {
      headers = [
        {
          key: "X-Robots-Tag",
          value: "noindex, nofollow, nosnippet",
        },
      ];
    }
    return [
      {
        source: "/:path*",
        headers,
      },
    ];
  },
  async redirects() {
    return MappingReplacement;
  },
  ...compose(withBundleAnalyzer, withSentryConfig)(nextConfig),
};
