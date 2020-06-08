// Import prerequisite packages
const next = require("next");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const helmet = require("koa-helmet");
const mount = require("koa-mount");
const Router = require("koa-router");
const send = require("koa-send");
const Sentry = require("@sentry/node");
const path = require("path");
const redirects = require("./redirects.json");

/**
 * this env variable is use to target developpement / staging deployement
 * in order to block indexing bot using a x-robot-header and an appropriate robots.txt
 */
const IS_PRODUCTION_DEPLOYMENT =
  process.env.IS_PRODUCTION_DEPLOYMENT === "true";
const PORT = parseInt(process.env.FRONTEND_PORT, 10) || 3000;
const FRONTEND_HOST = process.env.FRONTEND_HOST || `http://localhost:${PORT}`;
const PROD_HOSTNAME = process.env.PROD_HOSTNAME || "code.travail.gouv.fr";
const SENTRY_PUBLIC_DSN = process.env.SENTRY_PUBLIC_DSN;
const PACKAGE_VERSION = process.env.VERSION || "";

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

// Initialize NextJs instance and expose request handler
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
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
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://mon-entreprise.fr",
        "https://www.googletagmanager.com",
        "*.fabrique.social.gouv.fr",
        "https://cdnjs.cloudflare.com",
      ],
      frameSrc: [
        "'self'",
        "https://mon-entreprise.fr",
        "https://matomo.fabrique.social.gouv.fr",
      ],
      "font-src": ["'self'", "data:", "blob:"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: [
        "'self'",
        "data:",
        "*.fabrique.social.gouv.fr",
        "https://travail-emploi.gouv.fr",
        "https://mon-entreprise.fr",
        "https://ad.doubleclick.net",
      ],
      ...(SENTRY_PUBLIC_DSN && { reportUri: getSentryCspUrl() }),
      ...(dev && { reportUri: "/report-violation" }),
    },
    reportOnly: () => dev,
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
        console.log("CSP Violation: ", ctx.request.body);
      } else {
        console.log("CSP Violation: No data received!");
      }
      ctx.status = 204;
    });
  }
  if (IS_PRODUCTION_DEPLOYMENT) {
    server.use(async function (ctx, next) {
      const isProdUrl = ctx.host === PROD_HOSTNAME;
      const isHealthCheckUrl = ctx.path === "/health";
      if (!isProdUrl && !isHealthCheckUrl) {
        const productionUrl = `https://${PROD_HOSTNAME}${ctx.originalUrl}`;
        console.log(
          `redirects ${ctx.host}${ctx.originalUrl} to production url ${productionUrl}`
        );
        ctx.status = 301;
        ctx.redirect(productionUrl);
        return;
      }
      await next();
    });
  } else {
    server.use(async function (ctx, next) {
      ctx.set({ "X-Robots-Tag": "noindex, nofollow, nosnippet" });
      await next();
    });
  }

  router.get("/health", async (ctx) => {
    ctx.body = { status: "up and running" };
  });

  router.get("/robots.txt", async (ctx) => {
    ctx.body = IS_PRODUCTION_DEPLOYMENT ? robotsProd : robotsDev;
  });

  const DOCS_DIR = path.join(
    path.dirname(require.resolve("@cdt/data...editorial_content"))
  );

  router.use(
    mount("/docs", async (ctx) => {
      await send(ctx, ctx.path, { root: DOCS_DIR });
    })
  );

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
  server.listen(PORT, () => {
    console.log(`
  › Ready on ${FRONTEND_HOST}

  Environment:

  - process.env.NODE_ENV : ${process.env.NODE_ENV || "development"}
  - version: ${PACKAGE_VERSION}
  - is deployed on prod(${PROD_HOSTNAME}): ${IS_PRODUCTION_DEPLOYMENT}
  - sentry: ${SENTRY_PUBLIC_DSN},

`);
  });
});
