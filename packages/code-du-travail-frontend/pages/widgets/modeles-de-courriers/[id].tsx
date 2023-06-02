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

const fetchCourrier = ({ id }) =>
  fetch(`${SITE_URL}/api/items?source=modeles_de_courriers&id=${id}`);

export const getServerSideProps = async ({ query }) => {
  const response = await fetchCourrier(query);
  if (!response.ok) {
    return handleError(response);
  }

  const data = await response.json();
  if (!data.length) {
    return handleError({ status: 404 });
  }
  return { props: { relatedItems: [], ...data[0]._source } };
};

export default Widgets;
