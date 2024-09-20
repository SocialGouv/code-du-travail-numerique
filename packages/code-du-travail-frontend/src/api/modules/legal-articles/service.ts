import { getLegalArticle } from "./queries";
import { DocumentElasticResult, ElasticLaborCodeArticle } from "./type";
import { getItemBySlug } from "../items";

export const getLegalArticleBySlug = async (
  slug: string
): Promise<DocumentElasticResult<ElasticLaborCodeArticle> | undefined> => {
  const body = getLegalArticle(slug);
  return await getItemBySlug<
    ElasticLaborCodeArticle,
    keyof DocumentElasticResult<ElasticLaborCodeArticle>
  >(["description", "title", "dateDebut", "html", "url", "notaHtml"], body);
};
