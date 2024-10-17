import {
  fetchModel,
  getTitle,
} from "../../../../src/modules/modeles-de-courriers";
import { notFound } from "next/navigation";
import { LetterModelContent } from "../../../../src/modules/modeles-de-courriers/components/LetterModelContent";
import { WidgetWithIframeResizer } from "../../../../src/modules/widgets/WidgetWithIframeResizer";
import { generateDefaultMetadata } from "../../../../src/modules/common/metas";
import { SITE_URL } from "../../../../src/config";

export async function generateMetadata({ params }) {
  const { title, type, metaDescription, meta_title, slug } = await getModel(
    params.id
  );
  const category = `Modèle ${type !== "fichier" ? `de ${type}` : "à télécharger"}`;

  return generateDefaultMetadata({
    title: `${category} : ${meta_title ?? title}`,
    description: metaDescription,
    overrideCanonical: `${SITE_URL}/modeles-de-courriers/${slug}`,
    path: `${SITE_URL}/modeles-de-courriers/${slug}`,
  });
}

async function WidgetModel({ params }) {
  const { title, ...model } = await getModel(params.id);

  const titleFormatted = getTitle(params.slug, title);
  return (
    <WidgetWithIframeResizer title={titleFormatted}>
      <LetterModelContent title={titleFormatted} {...model} />
    </WidgetWithIframeResizer>
  );
}

const getModel = async (id: string) => {
  const modele = await fetchModel({ _id: id });

  if (!modele) {
    return notFound();
  }
  return modele;
};

export default WidgetModel;
