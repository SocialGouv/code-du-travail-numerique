// Custom server using Express.

const express = require("express");
const next = require("next");

const routes = require("./routes");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = routes.getRequestHandler(app);

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";
const API_URL = process.env.API_URL || "http://127.0.0.1:1337/api/v1";
const SENTRY_PUBLIC_DSN = process.env.SENTRY_PUBLIC_DSN;
const PIWIK_URL = process.env.PIWIK_URL;
const PIWIK_SITE_ID = process.env.PIWIK_SITE_ID;

app.prepare().then(() => {
  express()
    .use(handler)
    .listen(PORT, err => {
      if (err) throw err;
      console.log(`

  > Ready on http://localhost:${PORT}

  Environment:

    - process.env.NODE_ENV : ${NODE_ENV}
    - process.env.API_URL : ${API_URL}
    - process.env.SENTRY_PUBLIC_DSN : ${SENTRY_PUBLIC_DSN}
    - process.env.PIWIK_URL : ${PIWIK_URL}
    - process.env.PIWIK_SITE_ID : ${PIWIK_SITE_ID}

`);
    });
});
