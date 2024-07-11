import Metas from "../../../src/common/Metas";
import { useIframeResizer } from "../../../src/common/hooks";
import { SITE_URL } from "../../../src/config";
import { LetterModel, LetterModelProps } from "../../../src/modeles";
import styled from "styled-components";
import { theme, Paragraph, Wrapper, PageTitle } from "@socialgouv/cdtn-ui";
import { LogoLink } from "../../../src/widgets";
import Html from "../../../src/common/Html";
import { isHTML } from "../../../src/lib";
import { getByIdsModeles } from "../../../src/api";

function Widgets(props: LetterModelProps): JSX.Element {
  useIframeResizer();

  return (
    <>
      <Metas
        title={`Modèles de courrier - ${props.title}`}
        description={props.intro}
        overrideCanonical={SITE_URL + "/modeles-de-courriers"}
      />
      <StyledHeader>
        <StyledTitle stripe="left" variant="secondary">
          {props.title}
        </StyledTitle>
        <LogoLink></LogoLink>
      </StyledHeader>
      <IntroWrapper variant="dark">
        {isHTML(props.intro) ? (
          <Html>{props.intro}</Html>
        ) : (
          <Paragraph noMargin>{props.intro}</Paragraph>
        )}
      </IntroWrapper>
      <LetterModel {...props} />
    </>
  );
}

export const getServerSideProps = async ({ query }) => {
  const modeles = await getByIdsModeles([query.id]);
  if (!modeles.length) {
    return {
      notFound: true,
    };
  }
  return { props: { relatedItems: [], ...(modeles.length ? modeles[0] : {}) } };
};

export default Widgets;

const { spacings, fonts } = theme;

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

  h1 {
    font-size: ${fonts.sizes.headings.xmedium};
  }
`;
