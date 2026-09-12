import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import { SITE_URL } from "../../../src/config";
import { WidgetWithIframeResizer } from "src/modules/widgets/WidgetWithIframeResizer";
import { CalculateurIndemniteRetraite } from "src/modules/outils/indemnite-retraite";
import {
  getIndemniteRetraiteTool,
  INDEMNITE_RETRAITE_SLUG,
} from "src/modules/outils/indemnite-retraite/tool";

export async function generateMetadata() {
  const { tool } = await getIndemniteRetraiteTool();

  return generateDefaultMetadata({
    title: `Simulateur - ${tool.title}`,
    description: tool.description,
    path: `${SITE_URL}/widgets/${INDEMNITE_RETRAITE_SLUG}`,
    overrideCanonical: `${SITE_URL}/outils/${INDEMNITE_RETRAITE_SLUG}`,
    robots: "noindex,nofollow",
  });
}

async function IndemniteRetraiteWidget() {
  const { tool } = await getIndemniteRetraiteTool();
  return (
    <WidgetWithIframeResizer title={tool.displayTitle || tool.title}>
      <CalculateurIndemniteRetraite title={tool.title} />
    </WidgetWithIframeResizer>
  );
}

export default IndemniteRetraiteWidget;
