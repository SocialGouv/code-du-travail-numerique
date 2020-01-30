// Import prerequisite packages
const next = require("next");
const Koa = require("koa");
const Router = require("koa-router");
const helmet = require("koa-helmet");
var bodyParser = require("koa-bodyparser");
/**
 * this env variable is use to target developpement / staging deployement
 * in order to block indexing bot using a x-robot-header and an appropriate robots.txt
 */
const IS_PRODUCTION_DEPLOYMENT =
  process.env.IS_PRODUCTION_DEPLOYMENT === "true";
const PORT = parseInt(process.env.FRONTEND_PORT, 10) || 3000;
const FRONTEND_HOST = process.env.FRONTEND_HOST || `http://localhost:${PORT}`;
const PROD_HOSTNAME = process.env.PROD_HOSTNAME || "code.travail.gouv.fr";

const dev = process.env.NODE_ENV !== "production";

const robotsDev = ["User-agent: *", "Disallow: /"].join("\n");
const robotsProd = [
  "User-agent: *",
  "Disallow: /assets/",
  "Disallow: /images/",
  "",
  `Sitemap: https://${PROD_HOSTNAME}/sitemap.xml`
].join("\n");

// Initialize NextJs instance and expose request handler
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  if (dev) {
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
            "*.fabrique.social.gouv.fr"
          ],
          scriptSrc: [
            "'self'",
            "'unsafe-inline'",
            "https://mon-entreprise.fr",
            "https://www.googletagmanager.com",
            "*.fabrique.social.gouv.fr"
          ],
          frameSrc: ["https://mon-entreprise.fr"],
          frameAncestors: ["'none'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: [
            "'self'",
            "https://travail-emploi.gouv.fr",
            "https://mon-entreprise.fr",
            "https://ad.doubleclick.net"
          ],
          ...(dev && { reportUri: "/report-violation" })
        },
        reportOnly: () => dev
      }
    })
  );
  if (dev) {
    router.post("/report-violation", ctx => {
      if (ctx.request.body) {
        console.log("CSP Violation: ", ctx.request.body);
      } else {
        console.log("CSP Violation: No data received!");
      }

      ctx.status = 204;
    });
  }
  if (IS_PRODUCTION_DEPLOYMENT) {
    server.use(async function(ctx) {
      const isProdUrl = ctx.host === PROD_HOSTNAME;
      const isHealthCheckUrl = ctx.path === "/health";
      if (!isProdUrl && !isHealthCheckUrl) {
        ctx.status = 301;
        ctx.redirect(`https://${PROD_HOSTNAME}${ctx.originalUrl}`);
        return;
      }
    });
  } else {
    server.use(async function(ctx, next) {
      ctx.set({ "X-Robots-Tag": "noindex, nofollow, nosnippet" });
      await next();
    });
  }

  router.get("/health", async ctx => {
    ctx.body = { status: "up and running" };
  });

  router.get("/robots.txt", async ctx => {
    ctx.respond = IS_PRODUCTION_DEPLOYMENT ? robotsProd : robotsDev;
  });

  router.all("*", async ctx => {
    await nextHandler(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, next) => {
    ctx.status = 200;
    await next();
  });

  // centralize error logging
  server.on("error", ({ code, message }) => {
    console.error(`${code} - ${message}`);
  });
  server.use(router.routes());
  server.listen(PORT, () => {
    console.log(`
  › Ready on ${FRONTEND_HOST}

  Environment:

  - process.env.NODE_ENV : ${process.env.NODE_ENV || "development"}
`);
  });
});
