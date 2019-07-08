// Custom server using Express.
const express = require("express");
const next = require("next");
const routes = require("./routes");

/**
 * this env variable is use to target developpement / staging deployement
 * in order to block indexing bot using a x-robot-header and an appropriate robots.txt
 */
const LIVEPROD = process.env.ENVIRONMENT === "production";
const PORT = process.env.FRONTEND_PORT || 3000;
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handler = routes.getRequestHandler(app);

/**
 * This middleware is only osed for dev / staging deployement
 * to block crawler that come to the page without checking robots.txt
 */
const disallowRobots = (_, res, next) => {
  res.setHeader("X-Robots-Tag", "noindex, nofollow, nosnippet");
  next();
};

const robotTxtHandler = (req, res) => {
  const robotsProd = [
    "User-agent: *",
    "Disallow: /assets/",
    "Disallow: /images/"
  ].join("\n");
  const robotsDev = ["User-agent: *", "Disallow: /"].join("\n");

  res
    .status(200)
    .set("Content-Type", "text/plain")
    .send(LIVEPROD ? robotsProd : robotsDev);
};

app.prepare().then(() => {
  const server = express().get("/robots.txt", robotTxtHandler);
  if (!LIVEPROD) {
    server.use(disallowRobots);
  }
  server.use(handler);
  server.listen(PORT, err => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`

  > Ready on http://localhost:${PORT}

  Environment:

    - process.env.NODE_ENV : ${process.env.NODE_ENV}

`);
  });
});
