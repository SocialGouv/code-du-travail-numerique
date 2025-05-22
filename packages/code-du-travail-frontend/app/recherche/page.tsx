import { Metadata } from "next";
import { searchWithQuery } from "../../src/api";
import { SearchPageClient } from "../../src/modules/recherche";
import { DsfrLayout } from "src/modules/layout";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type SearchPageProps = {
  searchParams: { q?: string };
};

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q || "";

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
  const query = searchParams.q || "";

  let items = { articles: [], documents: [], themes: [] };

  if (query) {
    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Search timeout")), 10000)
      );

      const searchPromise = searchWithQuery(query, false, undefined);

      items = (await Promise.race([searchPromise, timeoutPromise])) as any;
    } catch (error) {
      console.error("Error searching:", error);
      items = { articles: [], documents: [], themes: [] };
    }
  }

  return (
    <DsfrLayout>
      <SearchPageClient query={query} items={items} />
    </DsfrLayout>
  );
}
