import {
  Container,
  PageTitle,
  Section,
  theme,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import * as Sentry from "@sentry/nextjs";
import React from "react";
import Metas from "../src/common/Metas";
import { Layout } from "../src/layout/Layout";
import styled from "styled-components";
import Link from "next/link";
import { getSitemapData, GetSitemapPage } from "../src/api";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { REVALIDATE_TIME, SITE_URL } from "../src/config";

const PlanDuSite = ({
  tools,
  modeles,
  contributions,
  agreements,
  themes,
}: GetSitemapPage) => {
  return (
    <Layout>
      <Metas
        title="Plan du site"
        description="Plan du site du Code du travail numérique"
      />
      <Section>
        <Container narrow>
          <PageTitle>Plan du site</PageTitle>
          <Wrapper variant="main">
            <Link href={"/"}>Page d&apos;accueil</Link>
            <StyledSection>
              <Link href={"/outils"}>Boîte à outils</Link>
              <ul>
                {tools.map((tool) => (
                  <StyledLi key={tool.slug}>
                    <Link
                      href={`/${getRouteBySource(SOURCES.TOOLS)}/${tool.slug}`}
                    >
                      {tool.title}
                    </Link>
                  </StyledLi>
                ))}
              </ul>
            </StyledSection>
            <StyledSection>
              <Link href={"/modeles-de-courriers"}>Modèles de documents</Link>
              <ul>
                {modeles.map((modele) => (
                  <StyledLi key={modele.slug}>
                    <Link
                      href={`/${getRouteBySource(SOURCES.LETTERS)}/${
                        modele.slug
                      }`}
                    >
                      {modele.title}
                    </Link>
                  </StyledLi>
                ))}
              </ul>
            </StyledSection>
            <StyledSection>
              <Link href={"/contribution"}>Vos fiches pratiques</Link>
              <ul>
                {contributions.map((contribution) => (
                  <StyledLi key={contribution.slug}>
                    <Link
                      href={`/${getRouteBySource(SOURCES.CONTRIBUTIONS)}/${
                        contribution.slug
                      }`}
                    >
                      {contribution.title}
                    </Link>
                  </StyledLi>
                ))}
              </ul>
            </StyledSection>
            <StyledSection>
              <Link href={"/convention-collective"}>
                Votre convention collective
              </Link>
              <ul>
                {agreements.map((agreement) => (
                  <StyledLi key={agreement.slug}>
                    <Link
                      href={`/${getRouteBySource(SOURCES.CCN)}/${
                        agreement.slug
                      }`}
                    >
                      {agreement.title}
                    </Link>
                  </StyledLi>
                ))}
              </ul>
            </StyledSection>
            <StyledSection>
              <Link href={"/themes"}>Thèmes</Link>
              <ul>
                {themes.map((theme) => (
                  <StyledLi key={theme.slug}>
                    <Link
                      href={`/${getRouteBySource(SOURCES.THEMES)}/${
                        theme.slug
                      }`}
                    >
                      {theme.title}
                    </Link>
                    {theme.children && theme.children.length > 0 && (
                      <ul>
                        {theme.children.map((subTheme) => (
                          <StyledLi key={subTheme.slug}>
                            <Link
                              href={`/${getRouteBySource(SOURCES.THEMES)}/${
                                subTheme.slug
                              }`}
                            >
                              {subTheme.label}
                            </Link>
                            {subTheme.children &&
                              subTheme.children.length > 0 && (
                                <ul>
                                  {subTheme.children.map((item) => (
                                    <StyledLi key={item.slug}>
                                      <Link
                                        href={`/${getRouteBySource(
                                          SOURCES.THEMES
                                        )}/${item.slug}`}
                                      >
                                        {item.label}
                                      </Link>
                                    </StyledLi>
                                  ))}
                                </ul>
                              )}
                          </StyledLi>
                        ))}
                      </ul>
                    )}
                  </StyledLi>
                ))}
              </ul>
            </StyledSection>
          </Wrapper>
        </Container>
      </Section>
    </Layout>
  );
};

export async function getStaticProps() {
  let themes: GetSitemapPage["themes"] = [];
  let tools: GetSitemapPage["tools"] = [];
  let contributions: GetSitemapPage["contributions"] = [];
  let modeles: GetSitemapPage["modeles"] = [];
  let agreements: GetSitemapPage["agreements"] = [];

  try {
    const data: GetSitemapPage = await getSitemapData();
    themes = data.themes;
    tools = data.tools.filter((tool) => tool.source === SOURCES.TOOLS);
    contributions = data.contributions;
    modeles = data.modeles;
    agreements = data.agreements;
  } catch (e) {
    console.error(e);
    Sentry.captureException(e);
  }

  return {
    props: {
      tools,
      modeles,
      contributions,
      agreements,
      themes,
    },
    revalidate: REVALIDATE_TIME,
  };
}

const StyledSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${theme.spacings.base};
`;

const StyledLi = styled.li`
  margin: 5px 0;
  a {
    font-size: ${theme.fonts.sizes.small};
    font-weight: 400;
    padding: 5px 0;
  }
  ::marker {
    font-size: 12px;
  }
`;

export default PlanDuSite;
