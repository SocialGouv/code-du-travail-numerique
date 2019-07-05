// Set up Elastic APM agent: the agent must be started before any other modules.
// https://www.elastic.co/guide/en/apm/agent/nodejs/current/koa.html
require("elastic-apm-node").start({
  serviceName: "code-du-travail-api",
  serverUrl: process.env.APM_SERVER_URL,
  active: process.env.APM_SERVER_ACTIVE
});

require("dotenv").config();
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");

// const corsConf = require('./conf/cors')

const annuaireRoutes = require("./routes/annuaire");
const docsCount = require("./routes/docs-count");
const idccRoutes = require("./routes/idcc");
const itemsRoutes = require("./routes/items");
const modelesRoutes = require("./routes/modeles");
const searchRoutes = require("./routes/search");
const versionRoutes = require("./routes/version");
const docsRoutes = require("./routes/docs");
const themesRoute = require("./routes/themes");

const { logger } = require("./utils/logger");

const app = new Koa();
const PORT = process.env.API_PORT || 1337;

app.use(cors());
/**
 * use a middleware for catching errors and re-emit them
 * so we can centralize error handling / logging
 * https://github.com/koajs/koa/wiki/Error-Handling
 */
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    const { statusCode = 500, message } = error;
    ctx.throw(statusCode, message);
    ctx.app.emit("error", error);
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

app.use(bodyParser());

app.use(annuaireRoutes.routes());
app.use(docsCount.routes());
app.use(idccRoutes.routes());
app.use(modelesRoutes.routes());
app.use(searchRoutes.routes());
app.use(itemsRoutes.routes());
app.use(versionRoutes.routes());
app.use(themesRoute.routes());

app.use(docsRoutes);

// centralize error logging
app.on("error", ({ statusCode, message }) => {
  logger.error(`${statusCode} - ${message}`);
});

// Server.
const server = app.listen(PORT, () => {
  logger.info(`Server listening on port: ${PORT}`);
});

module.exports = server;
