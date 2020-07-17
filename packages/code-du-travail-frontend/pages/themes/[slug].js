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
  const {
    breadcrumbs = [],
    description = "",
    metaDescription,
    children = [],
    title,
    refs = [],
  } = theme;

  const sortedChildren = children.sort(
    (previous, next) => previous.position - next.position
  );

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
              <img
                style={{ marginTop: "4rem" }}
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTcxIiBoZWlnaHQ9IjE2MyIgdmlld0JveD0iMCAwIDE3MSAxNjMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxlbGxpcHNlIGN4PSI4NS41IiBjeT0iODEuNSIgcng9Ijg1LjUiIHJ5PSI4MS41IiBmaWxsPSIjRkZENjAwIi8+CjxlbGxpcHNlIGN4PSI2MS41IiBjeT0iNjQuNSIgcng9IjE5LjUiIHJ5PSIyMi41IiBmaWxsPSIjNjI2MDYwIi8+CjxlbGxpcHNlIGN4PSI2MS41IiBjeT0iNjQuNSIgcng9IjE5LjUiIHJ5PSIyMi41IiBmaWxsPSIjNjI2MDYwIi8+CjxlbGxpcHNlIGN4PSI2MS41IiBjeT0iNjQuNSIgcng9IjE5LjUiIHJ5PSIyMi41IiBmaWxsPSIjNjI2MDYwIi8+CjxlbGxpcHNlIGN4PSI2MS41IiBjeT0iNjQuNSIgcng9IjE5LjUiIHJ5PSIyMi41IiBmaWxsPSJ3aGl0ZSIvPgo8ZWxsaXBzZSBjeD0iMTE1LjUiIGN5PSI2NC41IiByeD0iMTkuNSIgcnk9IjIyLjUiIGZpbGw9IiM2MjYwNjAiLz4KPGVsbGlwc2UgY3g9IjExNS41IiBjeT0iNjQuNSIgcng9IjE5LjUiIHJ5PSIyMi41IiBmaWxsPSIjNjI2MDYwIi8+CjxlbGxpcHNlIGN4PSIxMTUuNSIgY3k9IjY0LjUiIHJ4PSIxOS41IiByeT0iMjIuNSIgZmlsbD0iIzYyNjA2MCIvPgo8ZWxsaXBzZSBjeD0iMTE1LjUiIGN5PSI2NC41IiByeD0iMTkuNSIgcnk9IjIyLjUiIGZpbGw9IndoaXRlIi8+CjxlbGxpcHNlIGN4PSI2MiIgY3k9IjcxLjUiIHJ4PSI4IiByeT0iNy41IiBmaWxsPSIjMUExOTE5Ii8+CjxlbGxpcHNlIGN4PSIxMTciIGN5PSI3MS41IiByeD0iOCIgcnk9IjcuNSIgZmlsbD0iIzFBMTkxOSIvPgo8cGF0aCBkPSJNODUuOTYzNiAxMTRIMTM1TDEyNS4zNjggMTI1LjA5M0MxMTkuNDgxIDEzMS44NzMgMTEyLjAwOCAxMzcuMDkyIDEwMy42MTYgMTQwLjI4NUwxMDEuODczIDE0MC45NDhDOTEuNjczNSAxNDQuODI4IDgwLjM2MTIgMTQ0LjU2NCA3MC4zNTM4IDE0MC4yMTNDNjMuMTEyOCAxMzcuMDY1IDU2LjczODUgMTMyLjIxNiA1MS43NzIgMTI2LjA3OEw0MiAxMTRIODUuOTYzNloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMzUgMTE0TDEzNi4xMzMgMTE0Ljk4M0MxMzYuNTE4IDExNC41NCAxMzYuNjA5IDExMy45MTIgMTM2LjM2NSAxMTMuMzc4QzEzNi4xMjEgMTEyLjg0MyAxMzUuNTg4IDExMi41IDEzNSAxMTIuNVYxMTRaTTQyIDExNFYxMTIuNUM0MS40MjE5IDExMi41IDQwLjg5NTIgMTEyLjgzMiA0MC42NDYzIDExMy4zNTRDNDAuMzk3MyAxMTMuODc2IDQwLjQ3MDMgMTE0LjQ5NCA0MC44MzM5IDExNC45NDRMNDIgMTE0Wk01MS43NzIgMTI2LjA3OEw1MC42MDU5IDEyNy4wMjFMNTEuNzcyIDEyNi4wNzhaTTEwMS44NzMgMTQwLjk0OEwxMDIuNDA2IDE0Mi4zNUwxMDEuODczIDE0MC45NDhaTTEwMy42MTYgMTQwLjI4NUwxMDMuMDgzIDEzOC44ODNMMTAzLjYxNiAxNDAuMjg1Wk0xMjUuMzY4IDEyNS4wOTNMMTI2LjUgMTI2LjA3N0wxMjUuMzY4IDEyNS4wOTNaTTcwLjM1MzggMTQwLjIxM0w2OS43NTU4IDE0MS41ODlMNzAuMzUzOCAxNDAuMjEzWk0xMzUgMTEyLjVIODUuOTYzNlYxMTUuNUgxMzVWMTEyLjVaTTg1Ljk2MzYgMTEyLjVINDJWMTE1LjVIODUuOTYzNlYxMTIuNVpNNDAuODMzOSAxMTQuOTQ0TDUwLjYwNTkgMTI3LjAyMUw1Mi45MzgyIDEyNS4xMzRMNDMuMTY2MSAxMTMuMDU2TDQwLjgzMzkgMTE0Ljk0NFpNMTAyLjQwNiAxNDIuMzVMMTA0LjE0OSAxNDEuNjg2TDEwMy4wODMgMTM4Ljg4M0wxMDEuMzM5IDEzOS41NDZMMTAyLjQwNiAxNDIuMzVaTTEyNi41IDEyNi4wNzdMMTM2LjEzMyAxMTQuOTgzTDEzMy44NjcgMTEzLjAxN0wxMjQuMjM1IDEyNC4xMUwxMjYuNSAxMjYuMDc3Wk0xMDQuMTQ5IDE0MS42ODZDMTEyLjc3MyAxMzguNDA2IDEyMC40NTEgMTMzLjA0MyAxMjYuNSAxMjYuMDc3TDEyNC4yMzUgMTI0LjExQzExOC41MSAxMzAuNzAzIDExMS4yNDQgMTM1Ljc3OCAxMDMuMDgzIDEzOC44ODNMMTA0LjE0OSAxNDEuNjg2Wk01MC42MDU5IDEyNy4wMjFDNTUuNzI0MiAxMzMuMzQ3IDYyLjI5MzQgMTM4LjM0NCA2OS43NTU4IDE0MS41ODlMNzAuOTUxOSAxMzguODM4QzYzLjkzMjMgMTM1Ljc4NiA1Ny43NTI4IDEzMS4wODUgNTIuOTM4MiAxMjUuMTM0TDUwLjYwNTkgMTI3LjAyMVpNNjkuNzU1OCAxNDEuNTg5QzgwLjEyMjMgMTQ2LjA5NiA5MS44NDA3IDE0Ni4zNjkgMTAyLjQwNiAxNDIuMzVMMTAxLjMzOSAxMzkuNTQ2QzkxLjUwNjMgMTQzLjI4NyA4MC42IDE0My4wMzIgNzAuOTUxOSAxMzguODM4TDY5Ljc1NTggMTQxLjU4OVoiIGZpbGw9IiMxQTE5MTkiLz4KPHBhdGggZD0iTTExNiAxMzQuNjA5QzExNiAxMzkuOTE1IDk5LjY1ODQgMTQyIDg2LjQ0NDQgMTQyQzczLjIzMDUgMTQyIDU5IDEzOS45MTUgNTkgMTM0LjYwOUM1OSAxMjkuMzAyIDczLjIzMDUgMTI1IDg2LjQ0NDQgMTI1Qzk5LjY1ODQgMTI1IDExNiAxMjkuMzAyIDExNiAxMzQuNjA5WiIgZmlsbD0iI0ZGNkFCMiIvPgo8cGF0aCBkPSJNNDEgMTE0VjExMi41QzQwLjQyMTkgMTEyLjUgMzkuODk1MiAxMTIuODMyIDM5LjY0NjMgMTEzLjM1NEMzOS4zOTczIDExMy44NzYgMzkuNDcwMyAxMTQuNDk0IDM5LjgzMzkgMTE0Ljk0NEw0MSAxMTRaTTEzNCAxMTRMMTM1LjEzMyAxMTQuOTgzQzEzNS41MTggMTE0LjU0IDEzNS42MDkgMTEzLjkxMiAxMzUuMzY1IDExMy4zNzhDMTM1LjEyMSAxMTIuODQzIDEzNC41ODggMTEyLjUgMTM0IDExMi41VjExNFpNMTI0LjM2OCAxMjUuMDkzTDEyMy4yMzUgMTI0LjExTDEyNC4zNjggMTI1LjA5M1pNMTM0IDExMi41SDg0Ljk2MzZWMTE1LjVIMTM0VjExMi41Wk04NC45NjM2IDExMi41SDQxVjExNS41SDg0Ljk2MzZWMTEyLjVaTTM5LjgzMzkgMTE0Ljk0NEw0OS42MDU5IDEyNy4wMjFMNTEuOTM4MiAxMjUuMTM0TDQyLjE2NjEgMTEzLjA1NkwzOS44MzM5IDExNC45NDRaTTEwMS40MDYgMTQyLjM1TDEwMy4xNDkgMTQxLjY4NkwxMDIuMDgzIDEzOC44ODNMMTAwLjMzOSAxMzkuNTQ2TDEwMS40MDYgMTQyLjM1Wk0xMjUuNSAxMjYuMDc3TDEzNS4xMzMgMTE0Ljk4M0wxMzIuODY3IDExMy4wMTdMMTIzLjIzNSAxMjQuMTFMMTI1LjUgMTI2LjA3N1pNMTAzLjE0OSAxNDEuNjg2QzExMS43NzMgMTM4LjQwNiAxMTkuNDUxIDEzMy4wNDMgMTI1LjUgMTI2LjA3N0wxMjMuMjM1IDEyNC4xMUMxMTcuNTEgMTMwLjcwMyAxMTAuMjQ0IDEzNS43NzggMTAyLjA4MyAxMzguODgzTDEwMy4xNDkgMTQxLjY4NlpNNDkuNjA1OSAxMjcuMDIxQzU0LjcyNDIgMTMzLjM0NyA2MS4yOTM0IDEzOC4zNDQgNjguNzU1OCAxNDEuNTg5TDY5Ljk1MTkgMTM4LjgzOEM2Mi45MzIzIDEzNS43ODYgNTYuNzUyOCAxMzEuMDg1IDUxLjkzODIgMTI1LjEzNEw0OS42MDU5IDEyNy4wMjFaTTY4Ljc1NTggMTQxLjU4OUM3OS4xMjIzIDE0Ni4wOTYgOTAuODQwNyAxNDYuMzY5IDEwMS40MDYgMTQyLjM1TDEwMC4zMzkgMTM5LjU0NkM5MC41MDYzIDE0My4yODcgNzkuNiAxNDMuMDMyIDY5Ljk1MTkgMTM4LjgzOEw2OC43NTU4IDE0MS41ODlaIiBmaWxsPSIjMUExOTE5Ii8+Cjwvc3ZnPgo="
                alt="smile"
              />
            </FixedWrapper>
          )}
          <Content>
            <>
              {refs.length > 0 && (
                <>
                  <H2>Informations générales</H2>
                  <StyledFlatList>
                    {refs.map((ref) => (
                      <Li key={ref.id}>
                        <ContentLink {...ref} />
                      </Li>
                    ))}
                  </StyledFlatList>
                </>
              )}
              {children.length > 0 && (
                <>
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
                  {sortedChildren
                    .filter((children) =>
                      filter ? children.id === filter : true
                    )
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
                        <SubThemeSection key={id}>
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
                                  {index < children.length - 1 && (
                                    <PrimaryColored>&bull;</PrimaryColored>
                                  )}
                                </React.Fragment>
                              ))}
                            </SubThemeNav>
                          )}
                          <StyledFlatList>
                            {refs.slice(0, 4).map((ref) => (
                              <Li key={ref.id}>
                                <ContentLink {...ref} />
                              </Li>
                            ))}
                          </StyledFlatList>
                          <Link
                            href={`/${getRouteBySource(SOURCES.THEMES)}/[slug]`}
                            as={`/${getRouteBySource(SOURCES.THEMES)}/${slug}`}
                            passHref
                          >
                            <ThemeButton variant="flat" small>
                              Voir ce thème en détail
                            </ThemeButton>
                          </Link>
                        </SubThemeSection>
                      )
                    )}
                </>
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

const { breakpoints, fonts, spacings } = theme;

const StyledBreadcrumbs = styled(Breadcrumbs)`
  margin-bottom: ${spacings.xmedium};
`;

const TitleContainer = styled(Container)`
  margin-bottom: 8rem;
  @media (max-width: ${breakpoints.tablet}) {
    margin-bottom: 6rem;
  }
`;

const SelectWrapper = styled.div`
  display: none;
  @media (max-width: ${breakpoints.tablet}) {
    display: block;
    margin: ${spacings.large} 0;
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

const SubThemeSection = styled(Section)`
  margin-top: ${spacings.larger};
  padding-top: ${spacings.larger};
  padding-bottom: 0;
  @media (max-width: ${breakpoints.mobile}) {
    margin-top: ${spacings.large};
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
