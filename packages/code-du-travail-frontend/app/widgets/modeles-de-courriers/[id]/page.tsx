import {
  fetchModel,
  getTitle,
} from "../../../../src/modules/modeles-de-courriers";
import { notFound } from "next/navigation";
import { LetterModelContent } from "../../../../src/modules/modeles-de-courriers/components/LetterModelContent";
import { WidgetWithIframeResizer } from "../../../../src/modules/widgets/WidgetWithIframeResizer"; // import { useIframeResizer } from "../../../../src/common/hooks";

async function WidgetModel({ params }) {
  const { title, ...model } = await getModel(params.id);

  const titleFormatted = getTitle(params.slug, title);
  return (
    <WidgetWithIframeResizer title={titleFormatted}>
      <LetterModelContent title={titleFormatted} {...model} />
    </WidgetWithIframeResizer>
  );
}

export const getModel = async (id: string) => {
  const modele = await fetchModel({ _id: id });

  if (!modele) {
    return notFound();
  }
  return modele;
};

export default WidgetModel;
