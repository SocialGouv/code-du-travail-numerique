const withTranspileModule = require("next-transpile-modules")([
  "@socialgouv/cdtn-sources",
  "@socialgouv/cdtn-slugify",
  "@cdt/data",
  "lit-element",
  "lit-html",
  "parse5",
  "p-debounce",
  "is-plain-obj",
]);
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const { withSentryConfig } = require("@sentry/nextjs");

const compose =
  (...fns) =>
  (args) =>
    fns.reduceRight((arg, fn) => fn(arg), args);

const nextConfig = {
  devIndicators: {
    autoPrerender: false,
  },
  poweredByHeader: false,
  publicRuntimeConfig: {
    API_ENTREPRISE_URL:
      process.env.API_ENTREPRISE_URL ||
      "https://entreprise.data.gouv.fr/api/sirene",
    API_SIRET2IDCC_URL:
      process.env.API_SIRET2IDCC_URL ||
      "https://siret2idcc.fabrique.social.gouv.fr/api/v2",
    API_URL: process.env.API_URL || "http://127.0.0.1:1337/api/v1",
    AZURE_BASE_URL: process.env.AZURE_BASE_URL,
    AZURE_CONTAINER: process.env.AZURE_CONTAINER,
    COMMIT: process.env.COMMIT,
    FRONTEND_HOST: process.env.FRONTEND_HOST
      ? `https://${process.env.FRONTEND_HOST}`
      : `http://localhost:${process.env.FRONTEND_PORT || 3000}`,
    PACKAGE_VERSION: process.env.VERSION || require("./package.json").version,
    PIWIK_SITE_ID: process.env.PIWIK_SITE_ID,
    PIWIK_URL: process.env.PIWIK_URL,
  },
  sentry: {
    disableClientWebpackPlugin: true,
    disableServerWebpackPlugin: true,
  },
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = {
  // async headers() {
  //   return [
  //     {
  //       headers: securityHeaders,
  //       // Apply these headers to all routes in your application.
  //       source: "/:path*",
  //     },
  //   ];
  // },

  // const cspConfig = {
  //   directives: {
  //     defaultSrc: [
  //       "'self'",
  //       "*.travail.gouv.fr",
  //       "*.data.gouv.fr",
  //       "*.fabrique.social.gouv.fr",
  //     ],
  //     "font-src": ["'self'", "data:", "blob:"],
  //     frameSrc: [
  //       "'self'",
  //       "https://mon-entreprise.urssaf.fr",
  //       "https://matomo.fabrique.social.gouv.fr",
  //       "*.dailymotion.com",
  //     ],
  //     imgSrc: [
  //       "'self'",
  //       "data:",
  //       "*.fabrique.social.gouv.fr",
  //       "https://travail-emploi.gouv.fr",
  //       "https://mon-entreprise.urssaf.fr",
  //       AZURE_BASE_URL,
  //     ],
  //     scriptSrc: [
  //       "'self'",
  //       "https://mon-entreprise.urssaf.fr",
  //       "*.fabrique.social.gouv.fr",
  //       "https://cdnjs.cloudflare.com",
  //     ],
  //     styleSrc: ["'self'", "'unsafe-inline'"],
  //     ...(process.env.NEXT_PUBLIC_SENTRY_DSN && {
  //       reportUri: process.env.NEXT_PUBLIC_SENTRY_DSN,
  //     }),
  //   },
  // };

  // if (!IS_PRODUCTION_DEPLOYMENT) {
  //   server.use(async function (ctx, next) {
  //     ctx.set({ "X-Robots-Tag": "noindex, nofollow, nosnippet" });
  //     await next();
  //   });
  // }

  // router.get("/robots.txt", async (ctx) => {
  //   ctx.type = "text/plain";
  //   ctx.body = IS_PRODUCTION_DEPLOYMENT ? robotsProd : robotsDev;
  // });

  async redirects() {
    return [
      {
        destination: "/api/sitemap",
        permanent: false,
        source: "/sitemap.xml",
      },
      {
        destination: "/themes/:slug",
        permanent: true,
        source: "/themes/(\\d{1,}-):slug",
      },
    ];
  },
  ...compose(
    withBundleAnalyzer,
    withTranspileModule,
    withSentryConfig
  )(nextConfig),
};
