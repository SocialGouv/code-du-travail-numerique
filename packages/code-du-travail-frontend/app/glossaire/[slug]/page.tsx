import { notFound } from "next/navigation";
import { DsfrLayout } from "../../../src/modules/layout";

import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { GlossaryTermDetail } from "src/modules/glossaire/GlossaryTermDetail";
import { fetchGlossary } from "../../../src/modules/glossaire/queries";

export async function generateMetadata({ params }) {
  const glossary = await fetchGlossary();
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

async function GlossaryTermPage({ params }) {
  const glossary = await fetchGlossary();
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
}

export default GlossaryTermPage;
