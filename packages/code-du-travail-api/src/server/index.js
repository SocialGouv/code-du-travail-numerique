require("dotenv").config();
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");

// const corsConf = require('./conf/cors')

const docsCount = require("./routes/docs-count");
const idccRoutes = require("./routes/idcc");
const conventionsRoutes = require("./routes/conventions");
const itemsRoutes = require("./routes/items");
const modelesRoutes = require("./routes/modeles");
const toolsRoutes = require("./routes/tools");
const searchRoutes = require("./routes/search");
const versionRoutes = require("./routes/version");
const docsRoutes = require("./routes/docs");
const themesRoute = require("./routes/themes");

const { logger } = require("./utils/logger");

const app = new Koa();
const PORT = process.env.PORT || 1337;

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

app.use(docsCount.routes());
app.use(idccRoutes.routes());
app.use(conventionsRoutes.routes());
app.use(modelesRoutes.routes());
app.use(toolsRoutes.routes());
app.use(searchRoutes.routes());
app.use(itemsRoutes.routes());
app.use(versionRoutes.routes());
app.use(themesRoute.routes());

app.use(docsRoutes);

if (process.env.NODE_ENV !== "production") {
  const Router = require("koa-router");
  const nlpRoutes = new Router({ prefix: "/nlp" });
  console.log("DEV MODE");
  nlpRoutes.get("/suggest", async ctx => {
    ctx.body = [];
  });
  nlpRoutes.get("/api/search", async ctx => {
    ctx.body = [];
  });
  app.use(nlpRoutes.routes());
}

// centralize error logging
app.on("error", ({ statusCode, message }) => {
  logger.error(`${statusCode} - ${message}`);
});

// Server.
const server = app.listen(PORT, () => {
  logger.info(`Server listening on port: ${PORT}`);
});

module.exports = server;
