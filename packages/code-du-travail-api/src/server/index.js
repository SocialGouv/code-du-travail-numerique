// Set up Elastic APM agent: the agent must be started before any other modules.
// https://www.elastic.co/guide/en/apm/agent/nodejs/current/koa.html
require('elastic-apm-node').start({
  serviceName: 'code-du-travail-api',
  serverUrl: process.env.APM_SERVER_URL,
  active: process.env.APM_SERVER_ACTIVE,
})

require('dotenv').config()
const path = require('path')
const bodyParser = require('koa-bodyparser')
const mount = require('koa-mount')
const send = require('koa-send')
const cors = require('@koa/cors')
const DOCS_DIR = '../../../code-du-travail-data/dataset/courrier-type/docx'
const Koa = require('koa')
// const corsConf = require('./conf/cors')
const apiRoutes = require('./routes/api')
const API_BASE_URL = require('./routes/api').BASE_URL

const app = new Koa()
const PORT = process.env.API_PORT || 1337

app.use(cors())
app.use(bodyParser())
app.use(apiRoutes.routes())

// Mount '/docs‘ to allow standart mail template download (docx file)
app.use(mount(`${API_BASE_URL}/docs`, async ctx => {
  await send(ctx, ctx.path, { root: path.join(__dirname, DOCS_DIR) })
}))

// Server.
const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})

module.exports = server
