import { notFound } from "next/navigation";
import { DsfrLayout } from "src/modules/layout";

import { generateDefaultMetadata } from "src/modules/common/metas";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { fetchNews, format, News, NewsContainer } from "src/modules/actualite";
import { Metadata } from "next";
import { NewsArticleJsonLd } from "src/modules/seo/jsonld";
import { NEWS_RSS_FEED } from "src/modules/actualite/rss";
import { toIsoDateTimeParis } from "src/modules/utils/date";

export async function generateMetadata(
  props: PageProps<"/actualite/[slug]">
): Promise<Metadata> {
  const params = await props.params;
  const news = await fetchNews(params.slug, [
    "title",
    "metaDescription",
    "date",
  ]);

  if (!news) {
    return notFound();
  }

  return generateDefaultMetadata({
    title: news?.title,
    description: news?.metaDescription,
    path: `/${getRouteBySource(SOURCES.NEWS)}/${params.slug}`,
    feed: NEWS_RSS_FEED,
    // og:type article + article:published_time (même ISO que le JSON-LD).
    article: { publishedTime: toIsoDateTimeParis(news.date) },
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
        description={news.meta_description}
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
    "content",
    "linkedContent",
  ]);

  if (!news) {
    return notFound();
  }
  return format(news);
};

export default NewsPage;
