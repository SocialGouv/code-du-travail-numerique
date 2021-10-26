const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const helmet = require("koa-helmet");
const Router = require("koa-router");
const Sentry = require("@sentry/node");
const redirects = require("./redirects.json");
const { logger } = require("@socialgouv/cdtn-logger");

const IS_PRODUCTION_DEPLOYMENT =
  process.env.IS_PRODUCTION_DEPLOYMENT === "true";
const PORT = parseInt(process.env.FRONTEND_PORT, 10) || 3000;
const FRONTEND_HOST = process.env.FRONTEND_HOST || `http://localhost:${PORT}`;
const PROD_HOSTNAME = process.env.PROD_HOSTNAME || "code.travail.gouv.fr";
const SENTRY_PUBLIC_DSN = process.env.SENTRY_PUBLIC_DSN;
const PACKAGE_VERSION = process.env.VERSION || "";
const AZURE_BASE_URL =
  process.env.AZURE_BASE_URL || "https://cdtnadmindev.blob.core.windows.net";

function getSentryCspUrl() {
  // NOTE(douglasduteil): is pre production if we can find the version in the url
  // All "http://<version>-code-travail.dev.frabrique.social.gouv.fr" are preprod
  // "http://code.travail.gouv.fr" is prod

  const isPreProduction =
    PACKAGE_VERSION && /^v\d+-\d+-\d+/.test(FRONTEND_HOST);
  const environment = isPreProduction ? "preproduction" : "production";

  return `${SENTRY_PUBLIC_DSN}&sentry_environment=${environment}&sentry_release=${PACKAGE_VERSION}`;
}

const dev = process.env.NODE_ENV !== "production";

const robotsDev = ["User-agent: *", "Disallow: /"].join("\n");
const robotsProd = [
  "User-agent: *",
  "Disallow: /assets/",
  "Disallow: /images/",
  "",
  `Sitemap: https://${PROD_HOSTNAME}/sitemap.xml`,
].join("\n");

async function getKoaServer({ nextApp }) {
  const nextHandler = nextApp.getRequestHandler();
  const server = new Koa();
  const router = new Router();

  const cspConfig = {
    directives: {
      defaultSrc: [
        "'self'",
        "*.travail.gouv.fr",
        "*.data.gouv.fr",
        "*.fabrique.social.gouv.fr",
      ],
      "font-src": ["'self'", "data:", "blob:"],
      frameSrc: [
        "'self'",
        "https://mon-entreprise.fr",
        "https://matomo.fabrique.social.gouv.fr",
        "*.dailymotion.com",
      ],
      imgSrc: [
        "'self'",
        "data:",
        "*.fabrique.social.gouv.fr",
        "https://travail-emploi.gouv.fr",
        "https://mon-entreprise.fr",
        AZURE_BASE_URL,
      ],
      scriptSrc: [
        "'self'",
        "https://mon-entreprise.fr",
        "*.fabrique.social.gouv.fr",
        "https://cdnjs.cloudflare.com",
      ],
      styleSrc: ["'self'", "'unsafe-inline'"],
      ...(SENTRY_PUBLIC_DSN && { reportUri: getSentryCspUrl() }),
      ...(dev && { reportUri: "/report-violation" }),
    },
    reportOnly: dev,
  };
  if (dev) {
    // handle local csp reportUri endpoint
    server.use(bodyParser());
    cspConfig.directives.defaultSrc.push("http://127.0.0.1:*/");
    cspConfig.directives.scriptSrc.push("'unsafe-eval'");
  }
  server.use(helmet.contentSecurityPolicy(cspConfig));

  if (dev) {
    router.post("/report-violation", (ctx) => {
      if (ctx.request.body) {
        logger.warning("CSP Violation: ", ctx.request.body);
      } else {
        logger.warning("CSP Violation: No data received!");
      }
      ctx.status = 204;
    });
  }
  if (!IS_PRODUCTION_DEPLOYMENT) {
    server.use(async function (ctx, next) {
      ctx.set({ "X-Robots-Tag": "noindex, nofollow, nosnippet" });
      await next();
    });
  }

  router.get("/health", async (ctx) => {
    ctx.body = { status: "up and running" };
  });

  router.get("/robots.txt", async (ctx) => {
    ctx.type = "text/plain";
    ctx.body = IS_PRODUCTION_DEPLOYMENT ? robotsProd : robotsDev;
  });

  redirects.forEach(({ baseUrl, code, redirectUrl }) => {
    router.get(baseUrl, async (ctx) => {
      ctx.status = code;
      ctx.set("Location", redirectUrl);
      ctx.redirect(redirectUrl);
    });
  });

  router.all("(.*)", async (ctx) => {
    await nextHandler(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, next) => {
    ctx.status = 200;
    await next();
  });

  // centralize error logging
  server.on("error", (err, ctx) => {
    Sentry.withScope(function (scope) {
      scope.setTag(`koa`, true);
      scope.addEventProcessor(function (event) {
        return Sentry.Handlers.parseRequest(event, ctx.request);
      });
      Sentry.captureException(err);
    });
  });

  server.use(router.routes());
  return server;
}

module.exports = { getKoaServer };
