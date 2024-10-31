import { SOURCES } from "@socialgouv/cdtn-utils";
import { ElasticLaborCodeArticle } from "./type";
import { DocumentElasticResult, fetchDocument } from "../documents";

export const fetchLegalArticle = async (
  slug: string
): Promise<DocumentElasticResult<ElasticLaborCodeArticle> | undefined> => {
  return await fetchDocument<
    ElasticLaborCodeArticle,
    keyof DocumentElasticResult<ElasticLaborCodeArticle>
  >(["description", "title", "dateDebut", "html", "url", "notaHtml"], {
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.CDT } },
          { term: { slug } },
          { term: { isPublished: true } },
        ],
      },
    }
  });
};
