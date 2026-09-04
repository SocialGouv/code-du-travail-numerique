import { DsfrLayout } from "../../../src/modules/layout";
import { fetchRelatedItems } from "../../../src/modules/documents";
import { fetchTool } from "../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import {
  fetchSmicReference,
  HiringSimulatorPage as HiringSimulatorView,
} from "../../../src/modules/outils/simulateur-embauche";

export async function generateMetadata() {
  const { metaTitle, metaDescription } = await getTool();

  return generateDefaultMetadata({
    title: metaTitle,
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
  // Préchargé côté serveur et mis en cache 24 h : le bouton « SMIC » est
  // disponible dès le premier rendu sans qu'un appel parte au chargement de la
  // page la plus consultée du site. `null` en cas d'échec — la page se rend
  // quand même, seul le bouton disparaît.
  const smicReference = await fetchSmicReference();

  return (
    <DsfrLayout>
      <HiringSimulatorView
        title={tool.displayTitle}
        breadcrumbTitle={tool.title}
        relatedItems={relatedItems}
        description={tool.description}
        smicReference={smicReference}
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
