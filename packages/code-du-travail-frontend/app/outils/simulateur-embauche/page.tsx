import { DsfrLayout } from "../../../src/modules/layout";
import { fetchRelatedItems } from "../../../src/modules/documents";
import { fetchTool } from "../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import HiringSimulator from "../../../src/modules/outils/simulateur-embauche/HiringSimulator";
import { ToolSeoContent } from "../../../src/modules/outils/common/seo-content";

// Overrides the CMS meta title: "officiel" sets the page apart from private
// converters in search results, and the brand suffix is dropped to keep the
// query terms visible in the snippet (#7586).
const META_TITLE = "Simulateur officiel - Calcul du salaire brut en net";

export async function generateMetadata() {
  const { metaDescription } = await getTool();

  return generateDefaultMetadata({
    title: META_TITLE,
    noTitleAdd: true,
    description: metaDescription,
    path: `/outils/simulateur-embauche`,
  });
}

async function HiringSimulatorPage() {
  const tool = await getTool();
  const relatedItems = await fetchRelatedItems(
    { _id: tool._id },
    "simulateur-embauche"
  );
  return (
    <DsfrLayout>
      <HiringSimulator
        title={tool.displayTitle}
        breadcrumbTitle={tool.title}
        relatedItems={relatedItems}
        seoContent={<ToolSeoContent slug="simulateur-embauche" />}
        description={tool.description}
      />
    </DsfrLayout>
  );
}

const getTool = async () => {
  const tool = await fetchTool("simulateur-embauche");

  if (!tool) {
    return notFound();
  }
  return tool;
};

export default HiringSimulatorPage;
