import elasticsearchClient from "../../conf/elasticsearch";
import { API_BASE_URL, CDTN_ADMIN_VERSION } from "../v1.prefix";
const Router = require("koa-router");
const { DOCUMENTS  } = require("@socialgouv/cdtn-elasticsearch");
const { getRelatedItems  } = require("../items/getRelatedItems");
const { getSheetMTQuery  } = require("./search.elastic.js");
const ES_INDEX_PREFIX = process.env.ES_INDEX_PREFIX || "cdtn";
const index = `${ES_INDEX_PREFIX}-${CDTN_ADMIN_VERSION}_${DOCUMENTS}`;
const router = new Router({
    prefix: API_BASE_URL
});
/**
 * Return the sheet-mt that match a given slug
 *
 * @example
 * http://localhost:1337/api/v1/sheets-mt/:slug
 *
 * @returns {Object} An object containing the matching sheet-mt .
 */ router.get("/sheets-mt/:slug", async (ctx)=>{
    const { slug  } = ctx.params;
    const body = getSheetMTQuery({
        slug
    });
    const response = await elasticsearchClient.search({
        body,
        index
    });
    if (response.body.hits.hits.length === 0) {
        ctx.throw(404, `there is no sheet mt that match ${slug}`);
    }
    const sheetMT = response.body.hits.hits[0];
    const relatedItems = await getRelatedItems({
        covisits: sheetMT._source.covisits,
        settings: sheetMT._source.title,
        slug,
        title: sheetMT._source.title
    });
    delete sheetMT._source.covisits;
    ctx.body = {
        ...sheetMT,
        relatedItems
    };
});
export default router;

//# sourceMappingURL=index.js.map