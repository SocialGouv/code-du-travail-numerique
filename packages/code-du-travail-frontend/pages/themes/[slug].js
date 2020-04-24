import React from "react";
import Link from "next/link";
import styled from "styled-components";
import getConfig from "next/config";
import { SOURCES, getRouteBySource } from "@cdt/sources";
import {
  Button,
  Container,
  PageTitle,
  Section,
  theme,
} from "@socialgouv/react-ui";
import fetch from "isomorphic-unfetch";

import { SearchResults } from "../../src/search/SearchResults";
import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";
import { Breadcrumbs } from "../../src/common/Breadcrumbs";
import { FocusRoot } from "../../src/a11y";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

// Theme page
class Theme extends React.Component {
  static async getInitialProps({ query: { slug } }) {
    const searchThemeResponse = await fetch(`${API_URL}/themes/${slug}`);

    if (!searchThemeResponse.ok) {
      return { statusCode: searchThemeResponse.status };
    }

    const theme = await searchThemeResponse.json();

    return {
      theme,
    };
  }

  render() {
    const { theme = {}, pageUrl, ogImage } = this.props;

    return (
      <Layout>
        <Metas
          url={pageUrl}
          title={`${theme.title} - Code du travail numérique`}
          description={`Explorez les contenus autour du thème ${theme.title}`}
          image={ogImage}
        />
        <Breadcrumbs items={theme.breadcrumbs} />
        <Section>
          <Container>
            <FocusRoot>
              <PageTitle subtitle={theme.description}>{theme.title}</PageTitle>
            </FocusRoot>
            {theme.children && theme.children.length > 0 && (
              <StyledContainer>
                {theme.children.map(({ slug, label }) => (
                  <Link
                    key={slug}
                    href={`/${getRouteBySource(SOURCES.THEMES)}/[slug]`}
                    as={slug}
                    passHref
                  >
                    <StyledLink as={Button}>{label}</StyledLink>
                  </Link>
                ))}
              </StyledContainer>
            )}
          </Container>
        </Section>
        {theme.refs && theme.refs.length > 0 && (
          <Section>
            <SearchResults
              query={theme.title}
              items={{ documents: theme.refs, articles: [], themes: [] }}
            />
          </Section>
        )}
      </Layout>
    );
  }
}

export default Theme;

const { breakpoints, spacings } = theme;

const StyledContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledLink = styled.a`
  margin: ${spacings.small};
  @media (max-width: ${breakpoints.mobile}) {
    flex: 1 1 auto;
  }
`;
