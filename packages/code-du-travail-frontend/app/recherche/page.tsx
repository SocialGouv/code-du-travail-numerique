import { Metadata } from "next";
import { SearchPageClient } from "src/modules/recherche";
import { DsfrLayout } from "src/modules/layout";
import { SearchPageClientProps } from "src/modules/recherche/SearchPageClient";
import search from "src/modules/recherche/query";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

  let items: SearchPageClientProps["items"] = {
    topDocuments: [],
    documents: [],
    class: "",
    size: 0,
  };

  if (query) {
    items = await search(query);
  }

  return (
    <DsfrLayout>
      <SearchPageClient query={query} items={items} />
    </DsfrLayout>
  );
}
