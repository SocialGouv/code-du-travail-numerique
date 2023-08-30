import Metas from "../../../src/common/Metas";
import { useIframeResizer } from "../../../src/common/hooks";
import { SITE_URL } from "../../../src/config";
import { LetterModel, LetterModelProps } from "../../../src/modeles";
import { handleError } from "../../../src/lib/fetch-error";
import styled from "styled-components";
import { theme, Paragraph, Wrapper, PageTitle } from "@socialgouv/cdtn-ui";
import { LogoLink } from "../../../src/widgets";
import Html from "../../../src/common/Html";
import { isHTML } from "../../../src/lib/converter";

function Widgets(props: LetterModelProps): JSX.Element {
  useIframeResizer();

  return (
    <>
      <Metas
        title={`Modèles de courrier - ${props.title}`}
        description={props.description}
        overrideCanonical={SITE_URL + "/modeles-de-courriers"}
      />
      <StyledHeader>
        <StyledTitle small stripe="left">
          {props.title}
        </StyledTitle>
        <LogoLink></LogoLink>
      </StyledHeader>
      <IntroWrapper variant="dark">
        {isHTML(props.description) ? (
          <Html>{props.description}</Html>
        ) : (
          <Paragraph noMargin>{props.description}</Paragraph>
        )}
      </IntroWrapper>
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

const { spacings } = theme;

const IntroWrapper = styled(Wrapper)`
  margin: ${spacings.base} auto;

  & div > *:first-child {
    margin-top: 0;
  }

  & div > *:last-child {
    margin-bottom: 0;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  header {
    margin: 0;
  }
`;

const StyledTitle = styled(PageTitle)`
  flex: 1;
`;