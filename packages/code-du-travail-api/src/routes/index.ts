const router = require("koa-router")();

router.get("/", async (ctx: any) => {
  ctx.body = { message: "running" };
});

export default router;
