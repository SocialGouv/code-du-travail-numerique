const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const helmet = require("koa-helmet");
const mount = require("koa-mount");
const Router = require("koa-router");
const send = require("koa-send");
const path = require("path");

const IS_PRODUCTION_DEPLOYMENT =
  process.env.IS_PRODUCTION_DEPLOYMENT === "true";
const PROD_HOSTNAME = process.env.PROD_HOSTNAME || "code.travail.gouv.fr";
const SENTRY_PUBLIC_DSN = process.env.SENTRY_PUBLIC_DSN;

const dev = process.env.NODE_ENV !== "production";

async function getKoaServer() {
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
        "https://ad.doubleclick.net",
      ],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://mon-entreprise.fr",
        "https://www.googletagmanager.com",
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

  if (IS_PRODUCTION_DEPLOYMENT) {
    server.use(async function (ctx, next) {
      const isProdUrl = ctx.host === PROD_HOSTNAME;
      const isHealthCheckUrl = ctx.path === "/health";
      if (!isProdUrl && !isHealthCheckUrl) {
        const productionUrl = `https://${PROD_HOSTNAME}${ctx.originalUrl}`;
        if (process.env.NODE_ENV !== "test") {
          console.log(
            `301 redirect ${ctx.host}${ctx.originalUrl} to production url ${productionUrl}`
          );
        }
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

  const DOCS_DIR = path.join(
    path.dirname(require.resolve("@cdt/data...editorial_content"))
  );

  router.use(
    mount("/docs", async (ctx) => {
      await send(ctx, ctx.path, { root: DOCS_DIR });
    })
  );

  server.use(router.routes());
  return server;
}

module.exports = { getKoaServer };
