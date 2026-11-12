import { withSentryConfig } from "@sentry/nextjs/config";

const MappingReplacement = await import("./redirects.json", {
  with: { type: "json" },
});

// Options de build Sentry (2e et dernier argument de `withSentryConfig`).
// https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/build/
const sentryConfig = {
  org: process.env.NEXT_PUBLIC_SENTRY_ORG,
  project: process.env.NEXT_PUBLIC_SENTRY_PROJECT,
  sentryUrl: process.env.NEXT_PUBLIC_SENTRY_URL,
  authToken: process.env.SENTRY_AUTH_TOKEN,

  silent: false,
  debug: true,

  // Sans nom fourni, le SDK tente de le déduire (variables CI, git), ce qui
  // échoue dans l'image Docker : aucune release n'est alors créée.
  release: {
    name: process.env.NEXT_PUBLIC_SENTRY_RELEASE || undefined,
    deploy: {
      env: process.env.NEXT_PUBLIC_SENTRY_ENV || "development",
    },
  },

  // Source maps : chemins par défaut du SDK (compatibles Turbopack), élargis
  // aux chunks client de Next.js.
  widenClientFileUpload: true,

  webpack: {
    treeshake: {
      removeDebugLogging: true,
    },
  },

  // Instrumentation des dépendances serveur au build (Sentry v11) : désactivée.
  // Elle externalise `@sentry/server-runtime-injection` sous un alias symlinké
  // dans `.next/node_modules`, qui ne survit pas à la copie de `.next` dans
  // l'image et le conteneur d'init (crash au démarrage). Aucune des librairies
  // instrumentées (pg, redis, express…) n'est utilisée ici.
  buildTimeInstrumentation: false,
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
  transpilePackages: [
    "@codegouvfr/react-dsfr",
    "import-in-the-middle",
    "require-in-the-middle",
    // html-react-parser@6 lib (CJS) depends on these ESM-only packages
    "domhandler",
    "domelementtype",
    "htmlparser2",
    "entities",
    "dom-serializer",
    "domutils",
    // uuid@14+ ships ESM-only
    "uuid",
  ],
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
      // `widget-loader.js` is meant to be embedded on third-party websites.
      // When used with Subresource Integrity (SRI), browsers fetch it with CORS.
      {
        source: "/widget-loader.js",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, OPTIONS",
          },
        ],
      },
      // `/widget.js` is meant to be embedded on third-party websites. When used
      // with Subresource Integrity (SRI), browsers fetch it with CORS.
      {
        source: "/widget.js",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, OPTIONS",
          },
        ],
      },
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

export default withSentryConfig(moduleExports, sentryConfig);
