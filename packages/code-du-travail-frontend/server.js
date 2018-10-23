// Custom server using Express.
const express = require("express");
const next = require("next");

const routes = require("./routes");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = routes.getRequestHandler(app);

const PORT = process.env.FRONTEND_PORT || 3000;

require("dotenv").config();

app.prepare().then(() => {
  express()
    .use(handler)
    .listen(PORT, err => {
      if (err) throw err;
      console.log(`

  > Ready on http://localhost:${PORT}

  Environment:

    - process.env.NODE_ENV : ${process.env.NODE_ENV}

`);
    });
});
