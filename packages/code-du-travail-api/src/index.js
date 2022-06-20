import { logger } from "@socialgouv/cdtn-logger";

import conventionsRoutes from "./routes/conventions";
import docsCountRoutes from "./routes/docs-count";
import dossiersRoute from "./routes/dossiers";
import enterprisesRoute from "./routes/enterprises";
import glossaryRoute from "./routes/glossary";
import highlightRoutes from "./routes/highlights";
import idccRoutes from "./routes/idcc";
import indexRoute from "./routes/index";
import itemsRoutes from "./routes/items";
import modelesRoutes from "./routes/modeles";
import searchRoutes from "./routes/search";
import sheetMTRoutes from "./routes/sheets-mt";
import statsRoute from "./routes/stats";
import suggestRoute from "./routes/suggest";
import themesRoute from "./routes/themes";
import versionRoutes from "./routes/version";

const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");

export const app = new Koa();
const PORT = process.env.PORT || 1337;

app.use(cors());
/**
 * Log every request + catch errors and re-emit them
 * so we can centralize error handling / logging
 * https://github.com/koajs/koa/wiki/Error-Handling
 */
app.use(async (ctx, next) => {
  try {
    logger.info(`Request ${ctx.request.method} ${ctx.request.url}`);
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

app.use(enterprisesRoute.routes());
app.use(conventionsRoutes.routes());
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
app.use(indexRoute.routes());

if (process.env.NODE_ENV !== "production") {
  logger.info("--- DEV MODE ---");
}

// Server.
const server = app.listen(PORT, () => {
  logger.info(`Server listening on port: ${PORT}`);
});

export default server;
