import { DsfrLayout } from "../../../src/modules/layout";
import { fetchRelatedItems } from "../../../src/modules/documents";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import IndemniteRetraiteSimulator from "../../../src/modules/outils/indemnite-retraite/IndemniteRetraiteSimulator";
import {
  getIndemniteRetraiteTool,
  INDEMNITE_RETRAITE_SLUG,
} from "../../../src/modules/outils/indemnite-retraite/tool";

export async function generateMetadata() {
  const { tool } = await getIndemniteRetraiteTool();

  return generateDefaultMetadata({
    title: tool.metaTitle,
    description: tool.metaDescription,
    path: `/outils/${INDEMNITE_RETRAITE_SLUG}`,
  });
}

async function IndemniteRetraite() {
  const { tool, isPublished } = await getIndemniteRetraiteTool();
  // Les contenus liés se cherchent par `_id` : sans document en base, il n'y a
  // rien à demander. TODO(#7131) : retirer la condition avec le repli.
  const relatedItems = isPublished
    ? await fetchRelatedItems({ _id: tool._id }, INDEMNITE_RETRAITE_SLUG)
    : [];
  return (
    <DsfrLayout>
      <IndemniteRetraiteSimulator
        title={tool.title}
        displayTitle={tool.displayTitle}
        relatedItems={relatedItems}
      />
    </DsfrLayout>
  );
}

export default IndemniteRetraite;
