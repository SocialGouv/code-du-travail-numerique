import { DsfrLayout } from "src/modules/layout";
import { generateDefaultMetadata } from "src/modules/common/metas";
import { fetchNewsList, NewsList } from "src/modules/actualite";
import { NEWS_RSS_FEED } from "src/modules/actualite/rss";
import { Metadata } from "next";

type Props = {
  searchParams: Promise<{ page?: string }>;
};

const getPageNumber = async (searchParams: Props["searchParams"]) => {
  const { page } = await searchParams;
  return Math.max(1, parseInt(page ?? "1", 10) || 1);
};

// Chaque page de la liste a son titre et sa canonical, pour ne pas être vue
// comme un doublon de la première.
export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const pageNumber = await getPageNumber(searchParams);
  return generateDefaultMetadata({
    title: pageNumber > 1 ? `Actualités - page ${pageNumber}` : "Actualités",
    description: "Découvrez toutes les actualités liées au code du travail.",
    path: pageNumber > 1 ? `/actualite?page=${pageNumber}` : "/actualite",
    feed: NEWS_RSS_FEED,
  });
}

async function Index({ searchParams }: Props) {
  const pageNumber = await getPageNumber(searchParams);

  const { items, totalPages } = await fetchNewsList(
    ["title", "content", "date", "slug"],
    { page: pageNumber }
  );

  return (
    <DsfrLayout>
      <NewsList news={items} currentPage={pageNumber} totalPages={totalPages} />
    </DsfrLayout>
  );
}

export default Index;
