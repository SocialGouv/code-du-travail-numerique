import React from "react";
import Link from "next/link";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";
import { getRouteBySource } from "@cdt/sources";
import {
  ArrowLink,
  Container,
  FlatList,
  Heading,
  Title,
  PageTitle,
  theme
} from "@socialgouv/react-ui";

import Answer from "../../src/common/Answer";
import { Layout } from "../../src/layout/Layout";
import {
  AsideContent,
  MainAsideLayout,
  MainContent
} from "../../src/layout/AnswerLayout";
import Metas from "../../src/common/Metas";
import Html from "../../src/common/Html";
import Mdx from "../../src/common/Mdx";

import { Breadcrumbs } from "../../src/common/Breadcrumbs";
import { ListLink } from "../../src/search/SearchResults/Results";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

function DossierThematique({ dossier, ogImage, pageUrl }) {
  if (!dossier) {
    return <Answer emptyMessage="Cet dossier thématique n'a pas été trouvé" />;
  }
  const { title, description, refs, asideContent } = dossier;

  const mainRefs = refs.filter(({ type }) => type === "main");
  const secondaryRefs = refs.filter(({ type }) => type === "secondary");
  // const themeRefs = refs.filter(({ type }) => type === "theme");
  const templateRefs = refs.filter(({ type }) => type === "template");
  const componentMappings = {
    ul: FlatList,
    a: LeftArrowLink
  };
  return (
    <Layout>
      <Metas
        url={pageUrl}
        title={`${title}`}
        description={title}
        image={ogImage}
      />
      <Breadcrumbs items={[{ slug: "/dossiers", label: "dossiers" }]} />
      <Container narrow>
        <PageTitle>{title}</PageTitle>
        <Html>{description}</Html>
      </Container>
      <MainAsideLayout>
        <MainContent hasResults>
          <Container>
            <Title>L’essentiel</Title>
            <FlatList>
              {mainRefs.map(item => (
                <StyledListItem key={item.slug}>
                  <ListLink item={item} />
                </StyledListItem>
              ))}
            </FlatList>
            <Title>Pour aller plus loin</Title>
            <FlatList>
              {secondaryRefs.map(item => (
                <StyledListItem key={item.slug}>
                  <ListLink item={item} />
                </StyledListItem>
              ))}
            </FlatList>
          </Container>
        </MainContent>
        <AsideContent>
          <Container>
            <Heading>Modèles utiles</Heading>
            <FlatList>
              {templateRefs.map(({ source, slug, title }) => (
                <li key={slug}>
                  <InternalLink source={source} slug={slug} passHref>
                    <LeftArrowLink>{title}</LeftArrowLink>
                  </InternalLink>
                </li>
              ))}
            </FlatList>
            <Heading>Liens utiles</Heading>
            <Mdx markdown={asideContent} components={componentMappings} />
          </Container>
        </AsideContent>
      </MainAsideLayout>
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

const { spacings } = theme;

const LeftArrowLink = styled(ArrowLink).attrs(() => ({
  arrowPosition: "left",
  className: "no-after"
}))`
  word-break: break-word;
`;

const InternalLink = ({ source, slug, ...props }) => {
  let rootSlug = slug;
  let hash;
  if (slug.includes("#")) {
    [rootSlug, hash] = slug.split("#");
  }
  hash = hash ? `#${hash}` : "";
  rootSlug = rootSlug ? `/${rootSlug}` : "";
  const route = getRouteBySource(source);
  return (
    <Link
      href={`/${route}${rootSlug ? "/[slug]" : ""}`}
      as={`/${route}${rootSlug}${hash}`}
      {...props}
    />
  );
};

const StyledListItem = styled.li`
  margin-bottom: ${spacings.medium};
`;

export default DossierThematique;
