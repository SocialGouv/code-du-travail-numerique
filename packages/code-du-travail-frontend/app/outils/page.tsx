import { DsfrLayout } from "../../src/modules/layout";
import { generateDefaultMetadata } from "../../src/modules/common/metas";
import { SITE_URL } from "../../src/config";
import { ToolsList } from "../../src/modules/outils/page-principale/ToolsList";
import { notFound } from "next/navigation";
import { fetchExternalTools, fetchTools } from "../../src/modules/outils";
import { withIndemniteRetraiteTile } from "../../src/modules/outils/indemnite-retraite/tool";
import { ElasticTool } from "@socialgouv/cdtn-types";

export const metadata = generateDefaultMetadata({
  title: "Simulateurs",
  description:
    "Trouvez des réponses personnalisées selon votre situation grâce à nos outils et simulateurs",
  path: "/outils",
  overrideCanonical: `${SITE_URL}/outils`,
});

export type ToolItem = Pick<
  ElasticTool,
  "id" | "description" | "metaDescription" | "icon" | "title"
> & {
  url: string;
};

async function OutilsPage() {
  const { tools, externalTools } = await getTools();

  return (
    <DsfrLayout>
      <ToolsList tools={tools} externalTools={externalTools} />
    </DsfrLayout>
  );
}

const getTools = async (): Promise<{
  tools: ToolItem[];
  externalTools: ToolItem[];
}> => {
  const tools = await fetchTools([
    "slug",
    "id",
    "description",
    "metaDescription",
    "icon",
    "title",
  ]);
  const externalTools = await fetchExternalTools([
    "slug",
    "id",
    "description",
    "metaDescription",
    "icon",
    "title",
    "url",
  ]);

  if (!tools || tools.length === 0) {
    return notFound();
  }

  return {
    // TODO(#7131) : retirer `withIndemniteRetraiteTile` avec le repli de
    // `src/modules/outils/indemnite-retraite/tool.ts`, une fois le document
    // Elasticsearch du simulateur créé côté cdtn-admin.
    tools: withIndemniteRetraiteTile(
      tools.map((tool) => ({
        ...tool,
        url: `/outils/${tool.slug}`,
      }))
    ),
    externalTools,
  };
};

export default OutilsPage;
