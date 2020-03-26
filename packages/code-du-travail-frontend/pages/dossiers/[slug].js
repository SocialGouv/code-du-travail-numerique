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
  Grid,
  Heading,
  PageTitle,
  Section,
  Tile,
  Title,
  icons,
  theme,
} from "@socialgouv/react-ui";

import Answer from "../../src/common/Answer";
import { Layout } from "../../src/layout/Layout";
import {
  AsideContent,
  MainAsideLayout,
  MainContent,
} from "../../src/layout/AnswerLayout";
import Metas from "../../src/common/Metas";
import Mdx from "../../src/common/Mdx";
import { ViewMore } from "../../src/common/ViewMore";

import { ListLink } from "../../src/search/SearchResults/Results";
import { CallToActionTile } from "../../src/common/tiles/CallToAction";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

function DossierThematique({ dossier, ogImage, pageUrl }) {
  if (!dossier) {
    return <Answer emptyMessage="Cet dossier thématique n'a pas été trouvé" />;
  }
  const { title, description = "", refs, asideContent = "" } = dossier;

  const mainRefs = refs.filter(({ type }) => type === "main");
  const secondaryRefs = refs.filter(({ type }) => type === "secondary");
  const themeRefs = refs.filter(({ type }) => type === "theme");
  const templateRefs = refs.filter(({ type }) => type === "template");
  const externalRefs = refs.filter(({ type }) => type === "external");
  const componentMappings = {
    ul: FlatList,
    a: LeftArrowLink,
  };
  return (
    <Layout>
      <Metas
        url={pageUrl}
        title={`${title}`}
        description={title}
        image={ogImage}
      />
      <Section>
        <Container narrow>
          <PageTitle subtitle={description}>{title}</PageTitle>
        </Container>
        <MainAsideLayout>
          <MainContent hasResults>
            <Container>
              <Title id="essentiel">L’essentiel</Title>
              <FlatList>
                {mainRefs.map((item) => (
                  <StyledListItem key={item.slug}>
                    <ListLink item={item} />
                  </StyledListItem>
                ))}
              </FlatList>
              <br />
              <Title id="fiches-pratiques">Pour aller plus loin</Title>
              <ViewMore>
                {secondaryRefs.map((item) => (
                  <StyledListItem key={item.slug}>
                    <ListLink item={item} />
                  </StyledListItem>
                ))}
              </ViewMore>
            </Container>
          </MainContent>
          <AsideContent>
            <Container>
              <Heading id="liens-utiles">Modèles utiles</Heading>
              <FlatList>
                {templateRefs.map(({ source, slug, title }) => (
                  <li key={slug}>
                    <InternalLink source={source} slug={slug} passHref>
                      <LeftArrowLink>{title}</LeftArrowLink>
                    </InternalLink>
                  </li>
                ))}
                {externalRefs.map(({ title, url }) => (
                  <li key={`${title}${url}`}>
                    <LeftArrowLink
                      href={url}
                      rel="noopener nofollow"
                      target="_blank"
                      className="no-after"
                    >
                      {title}
                    </LeftArrowLink>
                  </li>
                ))}
              </FlatList>
              <Heading>Liens utiles</Heading>
              <Mdx markdown={asideContent} components={componentMappings} />
            </Container>
          </AsideContent>
        </MainAsideLayout>
      </Section>
      <Section decorated variant="light">
        <Container>
          <Title id="courriers">
            Les modèles suivants peuvent vous intéresser
          </Title>
          <Grid>
            {templateRefs.map((item) => (
              <InternalLink
                key={item.slug}
                source={item.source}
                slug={item.slug}
              >
                <CallToActionTile
                  action="Consulter"
                  custom
                  icon={icons.Document}
                  title={item.title}
                />
              </InternalLink>
            ))}
            {externalRefs.map(({ action, icon, title, url }) => (
              <CallToActionTile
                key={`${title}${url}`}
                action={action}
                custom
                title={title}
                icon={icons[icon]}
                href={url}
                rel="noopener nofollow"
                target="_blank"
                className="no-after"
              ></CallToActionTile>
            ))}
          </Grid>
          <Title>Les thèmes suivants peuvent vous intéresser</Title>
          <Grid>
            {themeRefs.map((item) => (
              <InternalLink
                key={item.slug}
                source={item.source}
                slug={item.slug}
              >
                <Tile title={item.title} striped />
              </InternalLink>
            ))}
          </Grid>
        </Container>
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

const { spacings } = theme;

const LeftArrowLink = styled(ArrowLink).attrs(() => ({
  arrowPosition: "left",
  className: "no-after",
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
