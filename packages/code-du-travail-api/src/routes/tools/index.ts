import type { Tool } from "@socialgouv/cdtn-utils";

import { API_BASE_URL } from "../v1.prefix";
import { getTool, getTools } from "./service";

const Router = require("koa-router");

const router = new Router({ prefix: API_BASE_URL });

router.get("/tools", async (ctx: any) => {
  const { ids: idsString, slugs: slugsString } = ctx.query;
  const ids = idsString?.split(",");
  const slugs = slugsString?.split(",");
  const tools = await getTools({ ids, slugs });
  if (tools.body.hits.total.value === 0) {
    ctx.throw(404, `there is no tools that match query`);
  }
  ctx.body = tools.body.hits.hits as Tool[];
});

router.get("/tools/:slug", async (ctx: any) => {
  const tool = await getTool(ctx.params.slug);
  if (tool.body.hits.total.value === 0) {
    ctx.throw(404, `there is no tools that match query`);
  }
  if (tool.body.hits.total.value > 1) {
    ctx.throw(500, `there is more than one tool that match query`);
  }
  ctx.body = tool.body.hits.hits[0] as Tool;
});

export default router;
