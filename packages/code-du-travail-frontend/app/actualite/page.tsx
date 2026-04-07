import { DsfrLayout } from "src/modules/layout";
import { generateDefaultMetadata } from "src/modules/common/metas";
import { fetchNewsList, NewsList } from "src/modules/actualite";
import { Metadata } from "next";

export const metadata: Metadata = generateDefaultMetadata({
  title: "Actualités",
  description: "Découvrez toutes les actualités liés au code du travail.",
  path: "/actualite",
});

async function Index({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const pageNumber = Math.max(1, parseInt(page ?? "1", 10) || 1);

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
