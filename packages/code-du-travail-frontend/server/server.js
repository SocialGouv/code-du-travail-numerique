// Import prerequisite packages
const next = require("next");
const Koa = require("koa");
const Router = require("koa-router");
const helmet = require("koa-helmet");
const bodyParser = require("koa-bodyparser");
const Sentry = require("@sentry/node");

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

  if (dev) {
    // handle local csp reportUri endpoint
    server.use(bodyParser());
  }
  server.use(
    helmet({
      contentSecurityPolicy: {
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
            "https://cdn.jsdelivr.net",
            "https://unpkg.com",
          ],
          frameSrc: [
            "https://mon-entreprise.fr",
            "https://matomo.fabrique.social.gouv.fr",
          ],
          frameAncestors: ["'none'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: [
            "'self'",
            "data:",
            "*.fabrique.social.gouv.fr",
            "https://travail-emploi.gouv.fr",
            "https://mon-entreprise.fr",
            "https://ad.doubleclick.net",
          ],
          ...(dev && { reportUri: "/report-violation" }),
          ...(!dev && SENTRY_PUBLIC_DSN && { reportUri: getSentryCspUrl() }),
        },
        reportOnly: () => dev,
      },
    })
  );
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
        ctx.status = 301;
        ctx.redirect(`https://${PROD_HOSTNAME}${ctx.originalUrl}`);
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
    ctx.respond = IS_PRODUCTION_DEPLOYMENT ? robotsProd : robotsDev;
  });

  router.all("*", async (ctx) => {
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
