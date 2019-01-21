// Set up Elastic APM agent: the agent must be started before any other modules.
// https://www.elastic.co/guide/en/apm/agent/nodejs/current/koa.html
require("elastic-apm-node").start({
  serviceName: "code-du-travail-api",
  serverUrl: process.env.APM_SERVER_URL,
  active: process.env.APM_SERVER_ACTIVE
});

require("dotenv").config();
const path = require("path");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const mount = require("koa-mount");
const send = require("koa-send");
const cors = require("@koa/cors");

const DOCS_DIR =
  process.env.API_DOCS_DIR ||
  "../../../code-du-travail-data/dataset/courrier-type/docx";

// const corsConf = require('./conf/cors')
const apiRoutes = require("./routes/api");
const API_BASE_URL = require("./routes/api").BASE_URL;

const { logger } = require("./utils/logger");

const app = new Koa();
const PORT = process.env.API_PORT || 1337;

/**
 * use a middleware for catching errors and re-emit them
 * so we can centralize error handling / logging
 * https://github.com/koajs/koa/wiki/Error-Handling
 */
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { status: ctx.status, message: err.message };
    ctx.app.emit("error", err, ctx);
  }
});

/**
 * use a middleware for IE 10+ http xmlhttp requests
 * https://blogs.msdn.microsoft.com/ieinternals/2013/09/17/a-quick-look-at-p3p/
 */
app.use(async (ctx, next) => {
  ctx.set("P3P", "NOI ADM DEV PSAi OUR OTRo STP IND COM NAV DEM");
  await next();
});

app.use(cors());
app.use(bodyParser());
app.use(apiRoutes.routes());

// Mount '/docs‘ to allow standart mail template download (docx file)
app.use(
  mount(`${API_BASE_URL}/docs`, async ctx => {
    await send(ctx, ctx.path, { root: path.join(__dirname, DOCS_DIR) });
  })
);

// centralize error logging
app.on("error", error => {
  logger.error(`${error.status || 500} - ${error.message}`);
});

// Server.
const server = app.listen(PORT, () => {
  logger.info(`Server listening on port: ${PORT}`);
  logger.info(`Server docs dir : ${DOCS_DIR}`);
});

module.exports = server;
