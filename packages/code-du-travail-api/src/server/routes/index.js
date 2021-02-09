const router = require("koa-router")();
const elasticsearchClient = require("../conf/elasticsearch.js");

router.get("/", async (ctx) => {
  const { body } = await elasticsearchClient.info();

  ctx.body = { message: "running" };
});

module.exports = router;
