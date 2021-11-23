const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const helmet = require("koa-helmet");
const Router = require("koa-router");
const redirects = require("./redirects.json");

const IS_PRODUCTION_DEPLOYMENT =
  process.env.NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT === "true";
const PROD_HOSTNAME = process.env.PROD_HOSTNAME || "code.travail.gouv.fr";
const AZURE_BASE_URL =
  process.env.AZURE_BASE_URL || "https://cdtnadmindev.blob.core.windows.net";

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
        "*.doubleclick.net",
      ],
      imgSrc: [
        "'self'",
        "data:",
        "*.fabrique.social.gouv.fr",
        "https://travail-emploi.gouv.fr",
        "https://mon-entreprise.fr",
        AZURE_BASE_URL,
        "*.doubleclick.net",
        "*.xiti.com",
      ],
      scriptSrc: [
        "'self'",
        "https://mon-entreprise.fr",
        "*.fabrique.social.gouv.fr",
        "https://cdnjs.cloudflare.com",
        "https://www.googletagmanager.com",
        "'unsafe-inline'",
        "*.doubleclick.net",
      ],
      styleSrc: ["'self'", "'unsafe-inline'"],
      ...(process.env.NEXT_PUBLIC_SENTRY_DSN && {
        reportUri: process.env.NEXT_PUBLIC_SENTRY_DSN,
      }),
    },
  };
  if (dev) {
    server.use(bodyParser());
    cspConfig.directives.scriptSrc.push("'unsafe-eval'");
  }
  server.use(helmet.contentSecurityPolicy(cspConfig));

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

  server.use(router.routes());
  return server;
}

module.exports = { getKoaServer };
