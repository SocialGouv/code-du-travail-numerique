import { Metadata } from "next";
import { searchWithQuery } from "../../src/api";
import { SearchPageClient } from "../../src/modules/recherche";
import { DsfrLayout } from "src/modules/layout";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type SearchPageProps = {
  searchParams: { query?: string };
};

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const query = searchParams.query || "";

  return {
    title: query
      ? `Recherche ${query} - Code du travail numérique`
      : "Recherche - Code du travail numérique",
    description:
      "Posez votre question sur le droit du travail et obtenez une réponse personnalisée à vos questions (formation, rupture de contrat, démission, indemnités).",
    robots: "noindex, nofollow",
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.query || "";

  let items = { articles: [], documents: [], themes: [] };

  if (query) {
    items = (await searchWithQuery(query, false, undefined)) as any;
  }

  return (
    <DsfrLayout>
      <SearchPageClient query={query} items={items} />
    </DsfrLayout>
  );
}
