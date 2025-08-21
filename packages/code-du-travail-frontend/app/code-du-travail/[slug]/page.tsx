import { format } from "date-fns";
import frLocale from "date-fns/locale/fr";
import React from "react";
import { replaceArticlesRefs } from "../../../src/modules/utils/replaceArticlesRefs";
import { DsfrLayout } from "../../../src/modules/layout";
import { notFound } from "next/navigation";
import {
  ArticleCodeDuTravail,
  fetchLegalArticle,
} from "../../../src/modules/code-du-travail";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import { fetchRelatedItems } from "../../../src/modules/documents";

export async function generateMetadata({ params }) {
  const { title, description } = await getArticle(params.slug);

  return generateDefaultMetadata({
    title: title,
    description: description,
    path: `/code-du-travail/${params.slug}`,
  });
}

async function Fiche({ params }) {
  const { _id, title, description, dateDebut, html, url, notaHtml } =
    await getArticle(params.slug);
  const relatedItems = await fetchRelatedItems({ _id }, params.slug);

  const fixedHtml = replaceArticlesRefs("https://legifrance.gouv.fr", html);
  return (
    <DsfrLayout>
      <ArticleCodeDuTravail
        title={title}
        relatedItems={relatedItems}
        date={format(new Date(dateDebut), "dd/MM/yyyy", {
          locale: frLocale,
        })}
        html={fixedHtml}
        url={url}
        notaHtml={notaHtml}
        metaDescription={description}
      />
    </DsfrLayout>
  );
}

const getArticle = async (slug: string) => {
  const article = await fetchLegalArticle(slug);

  if (!article) {
    return notFound();
  }
  return article;
};

export default Fiche;
