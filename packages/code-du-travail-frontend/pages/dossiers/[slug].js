import {
  ArrowLink,
  Button,
  Container,
  FlatList,
  icons,
  IconStripe,
  PageTitle,
  Section,
  TableOfContent,
  theme,
  ViewMore,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import getConfig from "next/config";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import Answer from "../../src/common/Answer";
import Metas from "../../src/common/Metas";
import { Layout } from "../../src/layout/Layout";

const { breakpoints, fonts, spacings } = theme;

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

function DossierThematique({ dossier }) {
  if (!dossier) {
    return <Answer emptyMessage="Ce dossier thématique n'a pas été trouvé" />;
  }
  const {
    description = "",
    metaDescription,
    populars,
    sections = [],
    title,
  } = dossier;

  return (
    <Layout>
      <Metas
        title={title}
        description={metaDescription || description || title}
      />
      <Section>
        <Container narrow>
          <PageTitle subtitle={description}>{title}</PageTitle>
        </Container>
        <MainContainer>
          <FixedWrapper>
            <NavTitle>Sommaire</NavTitle>
            <TableOfContent
              contents={sections.flatMap(({ label, categories }) => [
                { label },
                ...categories.map((category) => ({
                  id: category.id,
                })),
              ])}
            />
          </FixedWrapper>
          <Content>
            {populars.length > 0 && (
              <PopularWrapper variant="light">
                <IconStripe centered icon={icons["Populars"]}>
                  <H3 as="h2" stripe="none" id="populaires">
                    Contenus populaires
                  </H3>
                </IconStripe>
                <StyledFlatList>
                  {populars.map((ref) => (
                    <Li key={ref.url || ref.externalUrl}>
                      <DossierLink {...ref} />
                    </Li>
                  ))}
                </StyledFlatList>
              </PopularWrapper>
            )}
            {sections.map(({ label, categories }) => (
              <React.Fragment key={label || "sans-label"}>
                <H2>{label}</H2>
                {categories.map(({ id, ...props }) => (
                  <Category key={id} id={id} {...props} />
                ))}
              </React.Fragment>
            ))}
          </Content>
        </MainContainer>
      </Section>
    </Layout>
  );
}

DossierThematique.getInitialProps = async ({ query: { slug } }) => {
  const responseContainer = await fetch(`${API_URL}/dossiers/${slug}`);
  if (!responseContainer.ok) {
    return { statusCode: responseContainer.status };
  }
  const dossier = await responseContainer.json();
  return { dossier };
};

const Category = ({ id, icon, title, shortTitle, refs = [] }) => {
  return (
    <StyledWrapper>
      {icon ? (
        <IconStripe centered icon={icons[icon]}>
          <H3 id={id} data-short-title={shortTitle}>
            {title}
          </H3>
        </IconStripe>
      ) : (
        <H3 stripe="none" id={id} data-short-title={shortTitle}>
          {title}
        </H3>
      )}
      <ViewMore
        initialSize={4}
        listContainer={StyledFlatList}
        button={(onClick) => (
          <SeeAll variant="flat" small onClick={onClick}>
            Voir tout
          </SeeAll>
        )}
      >
        {refs.map((ref) => (
          <Li key={ref.url || ref.externalUrl}>
            <DossierLink {...ref} />
          </Li>
        ))}
      </ViewMore>
    </StyledWrapper>
  );
};

const MainContainer = styled(Container)`
  display: flex;
  align-items: flex-start;
  @media (max-width: ${breakpoints.tablet}) {
    display: block;
  }
`;

const FixedWrapper = styled.div`
  position: sticky;
  top: 14rem;
  z-index: 1;
  width: calc(30% - ${spacings.larger});
  margin-right: ${spacings.larger};
  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

const NavTitle = styled.strong.attrs({
  "aria-level": "2",
  role: "heading",
})`
  display: block;
  margin-bottom: ${spacings.small};
  font-size: ${fonts.sizes.headings.small};
`;

const Content = styled.div`
  width: 75%;
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }
`;

const StyledWrapper = styled(Wrapper)`
  margin-bottom: ${spacings.large};
  padding-top: ${spacings.large};
  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: ${spacings.xmedium};
  }
`;

const PopularWrapper = styled(StyledWrapper)`
  margin-bottom: 6rem;
`;

const H2 = styled.h2`
  margin: ${spacings.larger} 0 ${spacings.small} 0;
  color: ${({ theme }) => theme.altText};
  font-weight: bold;
  font-size: ${fonts.sizes.headings.mobileMedium};
  font-family: "Open Sans", sans-serif;
  text-transform: uppercase;
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.headings.xmedium};
  }
`;

const H3 = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.title};
  font-weight: normal;
  font-size: ${fonts.sizes.headings.medium};
  font-family: "Merriweather", serif;
  line-height: ${fonts.lineHeightTitle};
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.headings.xmedium};
  }
`;

const StyledFlatList = styled(FlatList)`
  display: flex;
  flex-wrap: wrap;
  margin-top: ${spacings.large};
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    margin-top: ${spacings.xmedium};
  }
`;

const Li = styled.li`
  width: 48%;
  padding-bottom: ${spacings.small};
  &:nth-child(even) {
    margin-left: 4%;
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    &:nth-child(even) {
      margin-left: 0;
    }
  }
`;

const DossierLink = ({ url, title }) => {
  if (!url.includes("http")) {
    return (
      <Link href={url} passHref>
        <LeftArrowLink>{title}</LeftArrowLink>
      </Link>
    );
  }
  return (
    <LeftArrowLink href={url} rel="noopener noreferrer" target="_blank">
      {title}
    </LeftArrowLink>
  );
};

const LeftArrowLink = styled(ArrowLink).attrs((props) => ({
  ...(props.target === "_blank" && {
    "aria-label": `${props.children} (nouvelle fenêtre)`,
  }),
  arrowPosition: "left",
}))`
  word-break: break-word;
`;

const SeeAll = styled(Button)`
  align-self: flex-start;
  margin-top: ${spacings.small};
  @media (max-width: ${breakpoints.mobile}) {
    align-self: stretch;
  }
`;

export default DossierThematique;
