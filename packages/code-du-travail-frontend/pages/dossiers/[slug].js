import React, { useState } from "react";
import Link from "next/link";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";
import {
  ArrowLink,
  Container,
  FlatList,
  icons,
  IconStripe,
  PageTitle,
  Section,
  Select,
  TableOfContent,
  theme,
  Wrapper,
} from "@socialgouv/react-ui";

import Answer from "../../src/common/Answer";
import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

function DossierThematique({ dossier, ogImage, pageUrl }) {
  const [filter, setFilter] = useState("");

  if (!dossier) {
    return <Answer emptyMessage="Ce dossier thématique n'a pas été trouvé" />;
  }
  const { description = "", metaDescription, categories, title } = dossier;

  const sortedCategories = categories.sort(
    (previous, next) => previous.position - next.position
  );

  return (
    <Layout>
      <Metas
        url={pageUrl}
        title={title}
        description={metaDescription || description || title}
        image={ogImage}
      />
      <Section>
        <Container narrow>
          <PageTitle subtitle={description}>{title}</PageTitle>
          <SelectWrapper>
            <Select
              onChange={(event) => {
                setFilter(event.target.value);
              }}
            >
              <option value="">Tous les contenus</option>
              {sortedCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.shortTitle || category.title}
                </option>
              ))}
            </Select>
          </SelectWrapper>
        </Container>
        <MainContainer>
          <FixedWrapper>
            <NavTitle>Sommaire</NavTitle>
            <TableOfContent
              ids={sortedCategories.map((category) => category.id)}
            />
          </FixedWrapper>
          <Content>
            {sortedCategories
              .filter((category) => (filter ? category.id === filter : true))
              .map(({ icon, id, refs, shortTitle, title }, index) => (
                <StyledWrapper
                  key={id}
                  {...(index === 0 && { variant: "light" })}
                >
                  <IconStripe centered icon={icons[icon]}>
                    <H2 id={id} data-short-title={shortTitle}>
                      {title}
                    </H2>
                  </IconStripe>
                  <StyledFlatList>
                    {refs.map((ref) => (
                      <Li key={ref.url || ref.externalUrl}>
                        <DossierLink {...ref} />
                      </Li>
                    ))}
                  </StyledFlatList>
                </StyledWrapper>
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

const { breakpoints, fonts, spacings } = theme;

const SelectWrapper = styled.div`
  display: none;
  text-align: center;
  @media (max-width: ${breakpoints.tablet}) {
    display: block;
    margin-bottom: ${spacings.large};
  }
`;

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

const NavTitle = styled.strong`
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

const H2 = styled.h2`
  margin: 0;
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
    const [, sourceRoute, slug] = url.split("/");
    return (
      <Link href={`/${sourceRoute}${slug ? "/[slug]" : ""}`} as={url} passHref>
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

const LeftArrowLink = styled(ArrowLink).attrs(() => ({
  arrowPosition: "left",
  className: "no-after",
}))`
  word-break: break-word;
`;

export default DossierThematique;
