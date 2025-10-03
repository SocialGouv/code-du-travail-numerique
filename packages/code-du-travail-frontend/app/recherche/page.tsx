import { Metadata } from "next";
import { searchWithQuery } from "../../src/api";
import { SearchPageClient } from "../../src/modules/recherche";
import { DsfrLayout } from "src/modules/layout";

type SearchPageProps = {
  searchParams: Promise<{ query?: string }>;
};

export async function generateMetadata(
  props: SearchPageProps
): Promise<Metadata> {
  const searchParams = await props.searchParams;
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

export default async function SearchPage(props: SearchPageProps) {
  const searchParams = await props.searchParams;
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
