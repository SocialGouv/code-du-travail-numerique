import { API_BASE_URL } from "../v1.prefix";
import { getTools } from "./service";

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
  ctx.body = tools.body.hits.hits;
});

export default router;
