import { NextApiRequest, NextApiResponse } from "next";
import { NotFoundError } from "../../utils";
import { getIdccByQuery } from "./service";

export class IdccController {
  private req: NextApiRequest;
  private res: NextApiResponse;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
  }

  public async get() {
    try {
      const { q } = this.req.query;
      const response = await getIdccByQuery(q as string);
      this.res.status(200).json(response);
    } catch (error) {
      if (error instanceof NotFoundError) {
        this.res.status(404).json({ message: "No idcc has been counted" });
      } else {
        this.res.status(500).json({
          message: "Error during fetching idcc",
        });
      }
    }
  }
}

router.get("/sheets-mt/:slug", async (ctx) => {
  const { slug } = ctx.params;
  const body = getSheetMTQuery({ slug });
  const response = await elasticsearchClient.search({
    body,
    index,
  });
  if (response.body.hits.hits.length === 0) {
    ctx.throw(404, `there is no sheet mt that match ${slug}`);
  }

  const sheetMT = response.body.hits.hits[0];

  const relatedItems = await getRelatedItems({
    covisits: sheetMT._source.covisits,
    settings: sheetMT._source.title,
    slug,
    title: sheetMT._source.title,
  });

  delete sheetMT._source.covisits;

  ctx.body = {
    ...sheetMT,
    relatedItems,
  };
});
