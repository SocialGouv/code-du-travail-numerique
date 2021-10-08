const router = require("koa-router")();

router.get("/", async (ctx) => {
  ctx.body = { message: "running" };
});

export default router;
