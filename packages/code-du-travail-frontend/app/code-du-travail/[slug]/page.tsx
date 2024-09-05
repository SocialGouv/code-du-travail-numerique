import { getLabelBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { LaborCodeArticle } from "@socialgouv/cdtn-types";
import { format } from "date-fns";
import frLocale from "date-fns/locale/fr";
import React from "react";
import { replaceArticlesRefs } from "../../../src/lib/replaceArticlesRefs";
import { getBySourceAndSlugItems } from "../../../src/api";
import { DsfrLayout } from "../../../src/modules/layout";
import { notFound } from "next/navigation";
import Article from "../../../src/modules/code-du-travail/article";

async function Fiche({ params }: { params: { slug: string } }) {
  const { title, description, dateDebut, html, url, notaHtml, relatedItems } =
    await getArticle(params.slug);

  const fixedHtml = replaceArticlesRefs("https://legifrance.gouv.fr", html);
  return (
    <DsfrLayout>
      {/*<Metas title={title} description={description} />*/}
      <Article
        suptitle={getLabelBySource(SOURCES.CDT)}
        title={title}
        relatedItems={relatedItems}
        date={
          dateDebut &&
          format(new Date(dateDebut), "dd/MM/yyyy", {
            locale: frLocale,
          })
        }
        html={fixedHtml}
        source={{ name: "Code du travail", url }}
        notaHtml={notaHtml}
        metaDescription={description}
      ></Article>
    </DsfrLayout>
  );
}

const getArticle = async (slug: string): Promise<any> => {
  const data = await getBySourceAndSlugItems<LaborCodeArticle>(
    "code_du_travail",
    slug
  );
  if (!data?._source) {
    return notFound();
  }

  return { relatedItems: data.relatedItems, ...data._source };
};

export default Fiche;
