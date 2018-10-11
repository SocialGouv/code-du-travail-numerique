// Set up Elastic APM agent: the agent must be started before any other modules.
// https://www.elastic.co/guide/en/apm/agent/nodejs/current/koa.html
require("elastic-apm-node").start({
  serviceName: "code-du-travail-api",
  serverUrl: process.env.APM_SERVER_URL,
  active: process.env.APM_SERVER_ACTIVE
});

require("dotenv").config();

const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const Koa = require("koa");

//const corsConf = require('./conf/cors')
const apiRoutes = require("./routes/api");

const app = new Koa();
const PORT = process.env.PORT || 1337;

app.use(cors());
app.use(bodyParser());
app.use(apiRoutes.routes());

// Server.
const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
