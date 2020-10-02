import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
import {
  ArrowLink,
  Button,
  Container,
  FlatList,
  icons,
  IconStripe,
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

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

function Theme({ theme }) {
  const [filter, setFilter] = useState("");
  const [isDisplayedAll, setDisplayedAll] = useState(false);
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

  const refs = (isDisplayedAll || !hasChildren
    ? allRefs
    : allRefs.slice(0, 4)
  ).filter((ref) => ref.title);

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
          <Content>
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
            <>
              {refs.length > 0 && (
                <ContentSection>
                  {hasChildren && <H2>Informations générales</H2>}
                  <StyledFlatList>
                    {refs.map((ref) => (
                      <Li key={ref.id}>
                        <ContentLink {...ref} />
                      </Li>
                    ))}
                  </StyledFlatList>
                  {hasChildren && (
                    <>
                      {allRefs.length > 4 && (
                        <>
                          {!isDisplayedAll ? (
                            <SeeMoreButton
                              variant="navLink"
                              onClick={() => setDisplayedAll(true)}
                            >
                              Plus d’informations générales
                            </SeeMoreButton>
                          ) : (
                            <SeeMoreButton
                              variant="navLink"
                              onClick={() => setDisplayedAll(false)}
                            >
                              Afficher moins d’informations générales
                            </SeeMoreButton>
                          )}
                        </>
                      )}
                    </>
                  )}
                </ContentSection>
              )}
              {sortedChildren
                .filter((children) => (filter ? children.id === filter : true))
                .map(
                  ({
                    id,
                    icon,
                    slug,
                    refs = [],
                    children: grandChildren = [],
                    shortTitle = "",
                    title,
                  }) => (
                    <ContentSection key={id}>
                      {icon ? (
                        <IconStripe centered icon={icons[icon]}>
                          <H2 id={slug} data-short-title={shortTitle}>
                            {title}
                          </H2>
                        </IconStripe>
                      ) : (
                        <H2 id={slug} data-short-title={shortTitle}>
                          {title}
                        </H2>
                      )}
                      {grandChildren.length > 0 && (
                        <SubThemeNav>
                          {grandChildren.map(({ label, slug }, index) => (
                            <React.Fragment key={label}>
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
                                  variant="navLink"
                                >
                                  {label}
                                </Button>
                              </Link>
                              {index < grandChildren.length - 1 && (
                                <PrimaryColored>&bull;</PrimaryColored>
                              )}
                            </React.Fragment>
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
                      {(grandChildren.length > 0 ||
                        (!grandChildren.length && refs.length > 4)) && (
                        <Link
                          href={`/${getRouteBySource(SOURCES.THEMES)}/[slug]`}
                          as={`/${getRouteBySource(SOURCES.THEMES)}/${slug}`}
                          passHref
                        >
                          <ThemeButton variant="flat" small>
                            Voir ce thème en détail
                          </ThemeButton>
                        </Link>
                      )}
                    </ContentSection>
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
  width: 75%;
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }
`;

const SeeMoreButton = styled(Button)`
  color: ${colors.secondary};
`;

const ContentSection = styled(Section)`
  margin-bottom: ${spacings.larger};
  padding-top: 0;
  padding-bottom: ${spacings.larger};
  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: ${spacings.large};
  }
`;

const H2 = styled.h2`
  margin: 0;
`;

const SubThemeNav = styled.nav`
  margin-top: ${spacings.base};
`;

const PrimaryColored = styled.span`
  padding: 0 ${spacings.small};
  color: ${({ theme }) => theme.primary};
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

const ThemeButton = styled(Button)`
  margin-top: ${spacings.base};
`;

export default Theme;
