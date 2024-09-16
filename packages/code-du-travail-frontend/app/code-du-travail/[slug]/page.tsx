import { getLabelBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { LaborCodeArticle } from "@socialgouv/cdtn-types";
import { format } from "date-fns";
import frLocale from "date-fns/locale/fr";
import React from "react";
import { replaceArticlesRefs } from "../../../src/lib/replaceArticlesRefs";
import { getBySourceAndSlugItems } from "../../../src/api";
import { DsfrLayout } from "../../../src/modules/layout";
import { notFound } from "next/navigation";
import ArticleCodeDuTravail from "../../../src/modules/code-du-travail/articleCodeDuTravail";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import { getLegalArticleBySlug } from "../../../src/api/modules/legal-articles";
import { RelatedItemSettings } from "../../../src/api";
import { getRelatedItems } from "../../../src/api/modules/related-items/service";

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
  const relatedItems = await getArticleRelatedItems({ _id }, params.slug);

  const fixedHtml = replaceArticlesRefs("https://legifrance.gouv.fr", html);
  return (
    <DsfrLayout>
      <ArticleCodeDuTravail
        suptitle={getLabelBySource(SOURCES.CDT)}
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
  const article = await getLegalArticleBySlug(slug, [
    "description",
    "title",
    "dateDebut",
    "html",
    "url",
    "notaHtml",
  ]);
  if (!article) {
    return notFound();
  }
  return article;
};

const getArticleRelatedItems = async (
  settings: RelatedItemSettings,
  slug: string
) => {
  const relatedItems = await getRelatedItems(settings, slug);
  return relatedItems;
};

export default Fiche;
