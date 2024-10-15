import {
  fetchModelById,
  getTitle,
} from "../../../../src/modules/modeles-de-courriers";
import { notFound } from "next/navigation";
import { LetterModelContent } from "../../../../src/modules/modeles-de-courriers/components/LetterModelContent";
import { WidgetWithIframeResizer } from "../../../../src/modules/widgets/WidgetWithIframeResizer"; // import { useIframeResizer } from "../../../../src/common/hooks";

async function WidgetModel({ params }) {
  const { title, ...model } = await getModel(params.id);

  return (
    <WidgetWithIframeResizer>
      <LetterModelContent title={getTitle(params.slug, title)} {...model} />
    </WidgetWithIframeResizer>
  );
}

export const getModel = async (id: string) => {
  const modele = await fetchModelById(id);

  if (!modele) {
    return notFound();
  }
  return modele;
};

export default WidgetModel;
