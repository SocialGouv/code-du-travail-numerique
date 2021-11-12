// Import prerequisite packages
const next = require("next");
const { getKoaServer } = require("./koaServer");
/**
 * this env variable is use to target developpement / staging deployement
 * in order to block indexing bot using a x-robot-header and an appropriate robots.txt
 */
const IS_PRODUCTION_DEPLOYMENT =
  process.env.NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT === "true";
const PORT = parseInt(process.env.FRONTEND_PORT, 10) || 3000;
const FRONTEND_HOST = process.env.FRONTEND_HOST || `http://localhost:${PORT}`;
const PROD_HOSTNAME = process.env.PROD_HOSTNAME || "code.travail.gouv.fr";
const NEXT_PUBLIC_SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || "";
const PACKAGE_VERSION = process.env.VERSION || "";

const dev = process.env.NODE_ENV !== "production";

// Initialize NextJs instance and expose request handler
const nextApp = next({ dev });

nextApp.prepare().then(async () => {
  const server = await getKoaServer({
    nextApp,
  });

  server.listen(PORT, () => {
    //eslint-disable-next-line no-console
    console.log(`
  › Ready on ${FRONTEND_HOST}

  Environment:

  - process.env.NODE_ENV : ${process.env.NODE_ENV || "development"}
  - version: ${PACKAGE_VERSION}
  - is deployed on prod(${PROD_HOSTNAME}): ${IS_PRODUCTION_DEPLOYMENT}
  - sentry: ${NEXT_PUBLIC_SENTRY_DSN},

`);
  });

  this.server = server;
});

module.exports = nextApp;
