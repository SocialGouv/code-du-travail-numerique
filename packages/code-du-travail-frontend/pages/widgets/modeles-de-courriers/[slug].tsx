import Metas from "../../../src/common/Metas";
import { useIframeResizer } from "../../../src/common/hooks";
import { SITE_URL } from "../../../src/config";
import { LetterModel, LetterModelProps } from "../../../src/modeles";
import { handleError } from "../../../src/lib/fetch-error";

function Widgets(props: LetterModelProps): JSX.Element {
  useIframeResizer();

  return (
    <>
      <Metas
        title={`Modèles de courrier - ${props.title}`}
        description={props.description}
        overrideCanonical={SITE_URL + "/modeles-de-courriers"}
      />
      <LetterModel {...props} />
    </>
  );
}

const fetchCourrier = ({ slug }) =>
  fetch(`${SITE_URL}/api/items/modeles_de_courriers/${slug}`);

export const getServerSideProps = async ({ query }) => {
  const response = await fetchCourrier(query);
  if (!response.ok) {
    return handleError(response);
  }

  const data = await response.json();
  return { props: { relatedItems: data.relatedItems, ...data._source } };
};

export default Widgets;
