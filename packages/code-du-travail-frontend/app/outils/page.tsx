import { DsfrLayout } from "../../src/modules/layout";
import { generateDefaultMetadata } from "../../src/modules/common/metas";
import { REVALIDATE_TIME, SITE_URL } from "../../src/config";
import { ToolsList } from "../../src/modules/outils/page-principale/ToolsList";
import { notFound } from "next/navigation";
import { fetchExternalTools, fetchTools } from "../../src/modules/outils";
import { ElasticTool } from "@socialgouv/cdtn-types";

export const metadata = generateDefaultMetadata({
  title: "Outils et simulateurs",
  description:
    "Trouvez des réponses personnalisées selon votre situation grâce à nos outils et simulateurs",
  path: "/outils",
  overrideCanonical: `${SITE_URL}/outils`,
});

export const dynamic = "force-static";
export const revalidate = REVALIDATE_TIME;

export type ToolItem = Pick<
  ElasticTool,
  "id" | "description" | "metaDescription" | "icon" | "title"
> & {
  url: string;
};

async function OutilsPage() {
  const tools = await getTools();

  return (
    <DsfrLayout>
      <ToolsList tools={tools} />
    </DsfrLayout>
  );
}

const getTools = async (): Promise<ToolItem[]> => {
  // // id, description, metaDescription, icon, title, link
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

  return tools
    .map((tool) => ({
      ...tool,
      url: `/outils/${tool.slug}`,
    }))
    .concat(externalTools);
};

export default OutilsPage;
