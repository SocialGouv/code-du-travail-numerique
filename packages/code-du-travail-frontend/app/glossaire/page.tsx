import { DsfrLayout } from "../../src/modules/layout";
import { generateDefaultMetadata } from "../../src/modules/common/metas";
import { SITE_URL } from "../../src/config";
import { GlossaryList } from "../../src/modules/glossaire/GlossaryList";
import { getGlossary } from "../../src/api/modules/glossary/service";
import { notFound } from "next/navigation";
import { REVALIDATE_TIME } from "../../src/config";

export const metadata = generateDefaultMetadata({
  title: "Glossaire",
  description:
    "Retrouvez l'ensemble des termes utilisés fréquemment sur le Code du travail numérique et leur explication",
  path: "/glossaire",
  overrideCanonical: `${SITE_URL}/glossaire`,
});

export const dynamic = "force-static";
export const revalidate = REVALIDATE_TIME;

async function GlossaryPage() {
  try {
    const glossary = await getGlossary();

    if (!glossary || glossary.length === 0) {
      return notFound();
    }

    return (
      <DsfrLayout>
        <GlossaryList glossary={glossary} />
      </DsfrLayout>
    );
  } catch (error) {
    console.error("Erreur lors de la récupération du glossaire:", error);
    return notFound();
  }
}

export default GlossaryPage;
