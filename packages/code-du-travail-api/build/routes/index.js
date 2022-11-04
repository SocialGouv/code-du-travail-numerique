const router = require("koa-router")();
router.get("/", (ctx)=>{
    ctx.body = {
        message: "running"
    };
});
export default router;

//# sourceMappingURL=index.js.map