import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
import {
  ArrowLink,
  Button,
  Container,
  FlatList,
  MoreContent,
  PageTitle,
  Section,
  Select,
  TableOfContent,
  theme,
} from "@socialgouv/cdtn-ui";
import fetch from "isomorphic-unfetch";
import getConfig from "next/config";
import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";

import { Breadcrumbs } from "../../src/common/Breadcrumbs";
import Metas from "../../src/common/Metas";
import { Layout } from "../../src/layout/Layout";
import { ListLink } from "../../src/search/SearchResults/Results";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

function Theme({ theme }) {
  const [filter, setFilter] = useState("");
  const {
    breadcrumbs = [],
    description = "",
    metaDescription,
    children = [],
    title,
    refs: allRefs = [],
  } = theme;

  const sortedChildren = children.sort(
    (previous, next) => previous.position - next.position
  );

  const hasChildren = Boolean(children.length);

  const refs = allRefs.filter((ref) => ref.title);

  return (
    <Layout>
      <Metas
        title={`${title} - Code du travail numérique`}
        description={
          metaDescription || `Explorez les contenus autour du thème ${title}`
        }
      />
      <StyledBreadcrumbs items={breadcrumbs} />
      <Section>
        <TitleContainer narrow>
          <PageTitle subtitle={description}>{title}</PageTitle>
        </TitleContainer>
        <MainContainer>
          {children.length > 0 && (
            <FixedWrapper>
              <NavTitle>Sous-thèmes</NavTitle>
              <TableOfContent
                ids={sortedChildren.map((children) => children.slug)}
              />
            </FixedWrapper>
          )}
          <Content fullWidth={children.length > 0}>
            <>
              {refs.length > 0 && (
                <ContentSection>
                  {hasChildren ? (
                    <>
                      <H2>Informations générales</H2>
                      <StyledFlatList>
                        {refs.slice(0, 6).map((ref) => (
                          <Li key={ref.id}>
                            <ContentLink {...ref} />
                          </Li>
                        ))}
                      </StyledFlatList>
                      {allRefs.length > 6 && (
                        <MoreContent noLeftPadding title="Afficher plus">
                          <StyledFlatList>
                            {refs.slice(6).map((ref) => (
                              <Li key={ref.id}>
                                <ContentLink {...ref} />
                              </Li>
                            ))}
                          </StyledFlatList>
                        </MoreContent>
                      )}
                    </>
                  ) : (
                    <FlexTiles>
                      {refs.map((ref) => (
                        <FlexTile key={ref.id}>
                          <ListLink item={ref} showTheme={false} />
                        </FlexTile>
                      ))}
                    </FlexTiles>
                  )}
                </ContentSection>
              )}
              {children.length > 0 && (
                <SelectWrapper>
                  <Select
                    onChange={(event) => {
                      setFilter(event.target.value);
                    }}
                  >
                    <option value="">Tous les sous-thèmes</option>
                    {sortedChildren.map((children) => (
                      <option key={children.id} value={children.id}>
                        {children.shortTitle || children.title}
                      </option>
                    ))}
                  </Select>
                </SelectWrapper>
              )}
              {sortedChildren
                .filter((children) => (filter ? children.id === filter : true))
                .map(
                  ({
                    id,
                    slug,
                    refs = [],
                    children: grandChildren = [],
                    shortTitle = "",
                    title,
                  }) => (
                    <>
                      <Hr />
                      <ContentSection key={id}>
                        <FlexDiv>
                          <H2 id={slug} data-short-title={shortTitle}>
                            {title}
                          </H2>
                          {(grandChildren.length > 0 ||
                            (!grandChildren.length && refs.length > 4)) && (
                            <Link
                              href={`/${getRouteBySource(
                                SOURCES.THEMES
                              )}/[slug]`}
                              as={`/${getRouteBySource(
                                SOURCES.THEMES
                              )}/${slug}`}
                              passHref
                            >
                              <SeeAll>VOIR TOUT</SeeAll>
                            </Link>
                          )}
                        </FlexDiv>
                        {grandChildren.length > 0 && (
                          <SubThemeNav>
                            {grandChildren.map(({ label, slug }) => (
                              <SubTheme key={label}>
                                <Link
                                  href={`/${getRouteBySource(
                                    SOURCES.THEMES
                                  )}/[slug]`}
                                  as={`${slug}`}
                                  passHref
                                >
                                  <Button
                                    as="a"
                                    className="no-after"
                                    variant="flat"
                                    small
                                  >
                                    {label}
                                  </Button>
                                </Link>
                              </SubTheme>
                            ))}
                          </SubThemeNav>
                        )}
                        <StyledFlatList>
                          {refs
                            .filter((ref) => ref.title)
                            .slice(0, 4)
                            .map((ref) => (
                              <Li key={ref.id}>
                                <ContentLink {...ref} />
                              </Li>
                            ))}
                        </StyledFlatList>
                      </ContentSection>
                    </>
                  )
                )}
            </>
          </Content>
        </MainContainer>
      </Section>
    </Layout>
  );
}

Theme.getInitialProps = async ({ query: { slug } }) => {
  const searchThemeResponse = await fetch(`${API_URL}/themes/${slug}`);
  if (!searchThemeResponse.ok) {
    return { statusCode: searchThemeResponse.status };
  }
  const theme = await searchThemeResponse.json();
  return { theme };
};

const { breakpoints, colors, fonts, spacings } = theme;

const StyledBreadcrumbs = styled(Breadcrumbs)`
  margin-bottom: ${spacings.xmedium};
`;

const TitleContainer = styled(Container)`
  margin-bottom: 8rem;
  @media (max-width: ${breakpoints.tablet}) {
    margin-bottom: 4rem;
  }
`;

const SelectWrapper = styled.div`
  display: none;
  @media (max-width: ${breakpoints.tablet}) {
    display: block;
    margin: ${spacings.larger} 0;
    text-align: center;
  }
`;

const MainContainer = styled(Container)`
  display: flex;
  align-items: flex-start;
  justify-content: center;
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
  width: ${(fullWidth) => (fullWidth ? "100%" : "75%")};
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }
`;

const ContentSection = styled(Section)`
  padding: 0;
  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: ${spacings.large};
  }
`;

const FlexTiles = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const FlexTile = styled.li`
  flex: 0 0 calc(50% - ${spacings.small} * 2);
  margin: ${spacings.small};
  & > a {
    height: 100%;
  }
  @media (max-width: ${breakpoints.mobile}) {
    flex: 0 0 100%;
    margin: ${spacings.xsmall} 0;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Hr = styled.hr`
  margin: ${spacings.larger} 0 5.6rem 0;
  border: 1px solid ${colors.border};
  border-bottom: none;
`;

const H2 = styled.h2`
  margin: 0;
`;

const SeeAll = styled.a`
  flex: 0 0 auto;
  padding-left: ${spacings.small};
  color: ${colors.secondary};
  font-size: ${fonts.sizes.small};
  text-decoration-color: ${colors.secondary};
  :hover {
    text-decoration-color: ${colors.primary};
  }
`;

const SubThemeNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: ${breakpoints.mobile}) {
    justify-content: stretch;
    margin-top: ${spacings.small};
  }
`;
const SubTheme = styled.div`
  margin-top: ${spacings.base};
  margin-right: ${spacings.base};
  @media (max-width: ${breakpoints.mobile}) {
    margin: ${spacings.small} ${spacings.tiny} 0 ${spacings.tiny};
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
  padding-bottom: ${spacings.base};
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

const ContentLink = ({ url = "", title, slug, source }) => {
  if (source === SOURCES.EXTERNALS) {
    return (
      <LeftArrowLink href={url} rel="noopener noreferrer" target="_blank">
        {title}
      </LeftArrowLink>
    );
  }

  return (
    <Link
      href={`/${getRouteBySource(source)}/[slug]`}
      as={`/${getRouteBySource(source)}/${slug}`}
      passHref
    >
      <LeftArrowLink>{title}</LeftArrowLink>
    </Link>
  );
};

const LeftArrowLink = styled(ArrowLink).attrs(() => ({
  arrowPosition: "left",
  className: "no-after",
}))`
  word-break: break-word;
`;

export default Theme;
