"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const router = require("koa-router")();

router.get("/", async (ctx) => {
  ctx.body = { message: "running" };
});
var _default = router;
exports.default = _default;
