"use strict";
var _cdtnLogger = require("@socialgouv/cdtn-logger");
var _conventions = _interopRequireDefault(require("./routes/conventions"));
var _docsCount = _interopRequireDefault(require("./routes/docs-count"));
var _dossiers = _interopRequireDefault(require("./routes/dossiers"));
var _glossary = _interopRequireDefault(require("./routes/glossary"));
var _highlights = _interopRequireDefault(require("./routes/highlights"));
var _idcc = _interopRequireDefault(require("./routes/idcc"));
var _index = _interopRequireDefault(require("./routes/index"));
var _items = _interopRequireDefault(require("./routes/items"));
var _modeles = _interopRequireDefault(require("./routes/modeles"));
var _search = _interopRequireDefault(require("./routes/search"));
var _sheetsMt = _interopRequireDefault(require("./routes/sheets-mt"));
var _stats = _interopRequireDefault(require("./routes/stats"));
var _suggest = _interopRequireDefault(require("./routes/suggest"));
var _themes = _interopRequireDefault(require("./routes/themes"));
var _version = _interopRequireDefault(require("./routes/version"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");

const app = new Koa();
const PORT = process.env.PORT || 1337;
app.use(cors());
/**
 * use a middleware for catching errors and re-emit them
 * so we can centralize error handling / logging
 * https://github.com/koajs/koa/wiki/Error-Handling
 */ app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    _cdtnLogger.logger.error(error);
    const { statusCode = 500, message } = error;
    ctx.throw(statusCode, message);
    ctx.app.emit("error", error);
  }
});
/**
 * use a middleware for IE 10+ http xmlhttp requests
 * https://blogs.msdn.microsoft.com/ieinternals/2013/09/17/a-quick-look-at-p3p/
 */ app.use(async (ctx, next) => {
  ctx.set("P3P", "NOI ADM DEV PSAi OUR OTRo STP IND COM NAV DEM");
  await next();
});
app.use(bodyParser());
app.use(_conventions.default.routes());
app.use(_docsCount.default.routes());
app.use(_highlights.default.routes());
app.use(_idcc.default.routes());
app.use(_items.default.routes());
app.use(_modeles.default.routes());
app.use(_search.default.routes());
app.use(_sheetsMt.default.routes());
app.use(_stats.default.routes());
app.use(_suggest.default.routes());
app.use(_themes.default.routes());
app.use(_dossiers.default.routes());
app.use(_glossary.default.routes());
app.use(_version.default.routes());
app.use(_index.default.routes());
if (process.env.NODE_ENV !== "production") {
  _cdtnLogger.logger.info("--- DEV MODE ---");
} // Server.
const server = app.listen(PORT, () => {
  _cdtnLogger.logger.info(`Server listening on port: ${PORT}`);
});
module.exports = server;
