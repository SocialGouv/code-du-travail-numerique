import { notFound } from "next/navigation";
import { DsfrLayout } from "../../../src/modules/layout";
import { getGlossary } from "../../../src/api/modules/glossary/service";

import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { REVALIDATE_TIME } from "../../../src/config";
import { GlossaryTermDetail } from "src/modules/glossaire/GlossaryTermDetail";

export const dynamic = "force-static";
export const revalidate = REVALIDATE_TIME;

export async function generateMetadata({ params }) {
  const glossary = await getGlossary();
  const term = glossary.find((term) => params.slug === term.slug);

  if (!term) {
    return {};
  }

  return generateDefaultMetadata({
    title: term.term,
    description: term.definition,
    path: `/${getRouteBySource(SOURCES.GLOSSARY)}/${params.slug}`,
  });
}

export async function generateStaticParams() {
  try {
    const glossary = await getGlossary();
    return glossary.map((term) => ({
      slug: term.slug,
    }));
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du glossaire pour les pages statiques:",
      error
    );
    return [];
  }
}

async function GlossaryTermPage({ params }) {
  try {
    const glossary = await getGlossary();
    const term = glossary.find((term) => params.slug === term.slug);

    if (!term) {
      return notFound();
    }

    return (
      <DsfrLayout>
        <GlossaryTermDetail
          term={term.term}
          definition={term.definition}
          references={term.references}
        />
      </DsfrLayout>
    );
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du terme de glossaire:",
      error
    );
    return notFound();
  }
}

export default GlossaryTermPage;
