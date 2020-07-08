const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");

const conventionsRoutes = require("./routes/conventions");
const docsRoutes = require("./routes/docs");
const docsCountRoutes = require("./routes/docs-count");
const highlightRoutes = require("./routes/highlights");
const idccRoutes = require("./routes/idcc");
const itemsRoutes = require("./routes/items");
const modelesRoutes = require("./routes/modeles");
const statsRoute = require("./routes/stats");
const searchRoutes = require("./routes/search");
const sheetMTRoutes = require("./routes/sheets-mt");
const suggestRoute = require("./routes/suggest");
const themesRoute = require("./routes/themes");
const dossiersRoute = require("./routes/dossiers");
const glossaryRoute = require("./routes/glossary");
const versionRoutes = require("./routes/version");

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
    logger.error(error);
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

app.use(conventionsRoutes.routes());
app.use(docsRoutes);
app.use(docsCountRoutes.routes());
app.use(highlightRoutes.routes());
app.use(idccRoutes.routes());
app.use(itemsRoutes.routes());
app.use(modelesRoutes.routes());
app.use(searchRoutes.routes());
app.use(sheetMTRoutes.routes());
app.use(statsRoute.routes());
app.use(suggestRoute.routes());
app.use(themesRoute.routes());
app.use(dossiersRoute.routes());
app.use(glossaryRoute.routes());
app.use(versionRoutes.routes());

if (process.env.NODE_ENV !== "production") {
  logger.info("-- DEV MODE ---");
}

// Server.
const server = app.listen(PORT, () => {
  logger.info(`Server listening on port: ${PORT}`);
});

module.exports = server;
