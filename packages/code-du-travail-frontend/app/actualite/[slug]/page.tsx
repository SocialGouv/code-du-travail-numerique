import { notFound } from "next/navigation";
import { DsfrLayout } from "src/modules/layout";

import { generateDefaultMetadata } from "src/modules/common/metas";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { fetchNews, format, News, NewsContainer } from "src/modules/actualite";
import { Metadata } from "next";
import { NewsArticleJsonLd } from "src/modules/seo/jsonld";
import { NEWS_RSS_FEED } from "src/modules/actualite/rss";
import { getNewsModifiedTime } from "src/modules/actualite/dates";
import { toIsoDateTimeParis } from "src/modules/utils/date";
import { toUrl } from "src/modules/utils/url";

export async function generateMetadata(
  props: PageProps<"/actualite/[slug]">
): Promise<Metadata> {
  const params = await props.params;
  const news = await fetchNews(params.slug, [
    "title",
    "meta_title",
    "meta_description",
    "date",
    "updatedAt",
    "image",
  ]);

  if (!news) {
    return notFound();
  }

  return generateDefaultMetadata({
    // Méta titre saisi dans l'admin, sinon le titre de l'actualité.
    title: news.meta_title?.trim() || news.title,
    description: news.meta_description,
    robots: "index, follow, max-image-preview:large",
    path: `/${getRouteBySource(SOURCES.NEWS)}/${params.slug}`,
    feed: NEWS_RSS_FEED,
    // og:type article + article:published_time / article:modified_time (mêmes
    // ISO que le JSON-LD).
    article: {
      publishedTime: toIsoDateTimeParis(news.date),
      modifiedTime: getNewsModifiedTime(news.date, news.updatedAt),
    },
    ...(news.image && {
      image: {
        url: toUrl(news.image.filename),
        alt: news.image.alt,
        width: news.image.width,
        height: news.image.height,
      },
    }),
  });
}

async function NewsPage(props: PageProps<"/actualite/[slug]">) {
  const params = await props.params;
  const news = await getNews(params.slug);

  if (!news) {
    return notFound();
  }

  return (
    <DsfrLayout>
      <NewsArticleJsonLd
        headline={news.title}
        url={`/actualite/${params.slug}`}
        datePublished={news.date}
        dateModified={news.modifiedTime}
        description={news.meta_description}
        image={
          news.image && {
            url: news.image.url,
            width: news.image.width,
            height: news.image.height,
          }
        }
        citations={news.references.map((reference) => reference.url)}
      />
      <NewsContainer news={news} />
    </DsfrLayout>
  );
}

const getNews = async (slug: string): Promise<News> => {
  const news = await fetchNews(slug, [
    "title",
    "meta_title",
    "meta_description",
    "date",
    "updatedAt",
    "content",
    "linkedContent",
    "image",
    "links",
    "references",
  ]);

  if (!news) {
    return notFound();
  }
  return format(news);
};

export default NewsPage;
