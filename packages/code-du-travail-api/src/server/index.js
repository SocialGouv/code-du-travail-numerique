const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const Koa = require('koa')

const corsConf = require('./conf/cors')
const apiRoutes = require('./routes/api')

const app = new Koa()
const PORT = process.env.PORT || 1337

app.use(cors(corsConf.config))
app.use(bodyParser())
app.use(apiRoutes.routes())

// Server.
const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})

module.exports = server
