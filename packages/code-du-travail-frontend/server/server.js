// Custom server using Express.
const express = require("express");
const next = require("next");
const expressSitemap = require("express-sitemap-xml");
const getUrls = require("./get-urls");
/**
 * this env variable is use to target developpement / staging deployement
 * in order to block indexing bot using a x-robot-header and an appropriate robots.txt
 */
const IS_PRODUCTION_DEPLOYMENT =
  process.env.IS_PRODUCTION_DEPLOYMENT === "true";
const PORT = process.env.FRONTEND_PORT || 3000;
const FRONTEND_HOST = process.env.FRONTEND_HOST || `http://localhost:${PORT}`;
const dev = process.env.NODE_ENV !== "production";
const PROD_HOSTNAME = process.env.PROD_HOSTNAME || "code.travail.gouv.fr";

const app = next({ dev });
const handler = app.getRequestHandler();
const HEALTH = "health";

/**
 * This middleware is only used for dev / staging deployement
 * to block crawler that come to the page without checking robots.txt
 */
const disallowRobots = (_, res, next) => {
  res.setHeader("X-Robots-Tag", "noindex, nofollow, nosnippet");
  next();
};

const robotsProd = [
  "User-agent: *",
  "Disallow: /assets/",
  "Disallow: /images/",
  "",
  `Sitemap: ${FRONTEND_HOST}/sitemap.xml`
].join("\n");

const robotsDev = ["User-agent: *", "Disallow: /"].join("\n");

const robotTxtHandler = (req, res) => {
  res
    .status(200)
    .set("Content-Type", "text/plain")
    .send(IS_PRODUCTION_DEPLOYMENT ? robotsProd : robotsDev);
};

const redirectHostname = (req, res, next) => {
  const isProdUrl = req.get("Host") === PROD_HOSTNAME;
  const isHealthCheckUrl = req.path === HEALTH;
  if (!isProdUrl && !isHealthCheckUrl) {
    return res.redirect(301, `https://${PROD_HOSTNAME}${req.originalUrl}`);
  }
  return next();
};

app.prepare().then(() => {
  const server = express();
  server.get(`/${HEALTH}`, (_, res) =>
    res.status(200).json({ status: "up and running" })
  );
  server.get("/robots.txt", robotTxtHandler);
  server.use(expressSitemap(getUrls, FRONTEND_HOST));

  if (IS_PRODUCTION_DEPLOYMENT) {
    server.use(redirectHostname);
  } else {
    server.use(disallowRobots);
  }
  server.use(handler);
  server.listen(PORT, err => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`

  > Ready on ${FRONTEND_HOST}

  Environment:

    - process.env.NODE_ENV : ${process.env.NODE_ENV}

`);
  });
});
