import { DsfrLayout } from "../../src/modules/layout";
import { generateDefaultMetadata } from "../../src/modules/common/metas";
import { SITE_URL } from "../../src/config";
import { GlossaryList } from "../../src/modules/glossaire/GlossaryList";
import { fetchGlossary } from "../../src/modules/glossaire/queries";

export const metadata = generateDefaultMetadata({
  title: "Glossaire",
  description:
    "Retrouvez l'ensemble des termes utilisés fréquemment sur le Code du travail numérique et leur explication",
  path: "/glossaire",
  overrideCanonical: `${SITE_URL}/glossaire`,
});

async function GlossaryPage() {
  const glossary = await fetchGlossary();

  return (
    <DsfrLayout>
      <GlossaryList glossary={glossary} />
    </DsfrLayout>
  );
}

export default GlossaryPage;
