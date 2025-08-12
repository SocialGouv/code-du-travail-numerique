import { DsfrLayout } from "../../../src/modules/layout";
import { fetchRelatedItems } from "../../../src/modules/documents";
import { fetchTool } from "../../../src/modules/outils";
import { notFound } from "next/navigation";
import { generateDefaultMetadata } from "../../../src/modules/common/metas";
import HeuresRechercheEmploiSimulator from "src/modules/outils/heures-recherche-emploi/HeuresRechercheEmploiSimulator";

export async function generateMetadata() {
  const { metaTitle, metaDescription } = await getTool();

  return generateDefaultMetadata({
    title: metaTitle,
    description: metaDescription,
    path: `/outils/heures-recherche-emploi`,
  });
}

async function HeuresRechercheEmploi() {
  const tool = await getTool();
  const relatedItems = await fetchRelatedItems(
    { _id: tool._id },
    "heures-recherche-emploi"
  );
  return (
    <DsfrLayout>
      <HeuresRechercheEmploiSimulator
        title={tool.title}
        displayTitle={tool.displayTitle}
        relatedItems={relatedItems}
      />
    </DsfrLayout>
  );
}

const getTool = async () => {
  const tool = await fetchTool("heures-recherche-emploi");

  if (!tool) {
    return notFound();
  }
  return tool;
};

export default HeuresRechercheEmploi;
