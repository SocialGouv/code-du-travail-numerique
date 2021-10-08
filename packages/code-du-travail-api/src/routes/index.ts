const router = require("koa-router")();

router.get("/", (ctx: { body: { message: string } }) => {
  ctx.body = { message: "running" };
});

export default router;
