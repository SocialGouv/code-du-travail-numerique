import React from "react";
import Head from "next/head";
import getConfig from "next/config";
import styled from "styled-components";
import { Alert, Container, Section, theme } from "@cdt/ui-old";
import fetch from "isomorphic-unfetch";

import Search from "../../src/search/Search";
import { SearchResults } from "../../src/search/SearchResults";
import { fetchSearchResults } from "../../src/search/search.service";

import Themes from "../../src/home/Themes";
import { PageLayout } from "../../src/layout/PageLayout";
import Metas from "../../src/common/Metas";
import { ThemeBreadcrumbs } from "../../src/common/ThemeBreadcrumbs";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

// Theme page
class Theme extends React.Component {
  static async getInitialProps({ query: { slug: query } }) {
    const [searchThemeResponse, searchResults] = await Promise.all([
      fetch(`${API_URL}/themes${query ? `/${query}` : ""}`),
      fetchSearchResults(query, "themes")
    ]);
    if (!searchThemeResponse.ok) {
      return { statusCode: searchThemeResponse.status };
    }

    const theme = await searchThemeResponse.json();

    return {
      theme,
      searchResults,
      query
    };
  }

  render() {
    const {
      theme = { children: [] },
      searchResults,
      query,
      pageUrl,
      ogImage
    } = this.props;
    const isRootTheme = theme && !theme.slug;

    console.log("theme", theme);
    /*
    const theme = await response.json();
    if (theme) {
      return {
        theme
      };
    }
    throw new Error("Theme not found");
  }

  render() {
    const { theme, pageUrl, ogImage } = this.props;
*/
    if (!theme) {
      return <NotFound />;
    }

    return (
      <PageLayout>
        <Metas
          url={pageUrl}
          title={`${theme.title || "Thèmes"} - Code du travail numérique`}
          description={`Explorez les contenus autour du thème ${theme.title}`}
          image={ogImage}
        />
        <Search />
        <ThemeBreadcrumbs theme={theme} />
        {theme.children && theme.children.length > 0 && (
          <Section variant="white">
            <Themes title={theme.title} themes={theme.children} />
          </Section>
        )}
        {!isRootTheme && (
          <Section>
            <Container narrow>
              <SearchResults query={query} items={searchResults} />
            </Container>
          </Section>
        )}
      </PageLayout>
    );
  }
}

export default Theme;

const NotFound = () => (
  <PageLayout>
    <Head>
      <title>Theme introuvable : Code du travail numérique</title>
    </Head>
    <Search />
    <Section variant="white">
      <Container>
        <BigError>Ce thème n’a pas été trouvé</BigError>
      </Container>
    </Section>
  </PageLayout>
);

const BigError = ({ children }) => (
  <AlertWrapper>
    <Alert variant="warning">{children}</Alert>
  </AlertWrapper>
);

const { colors, fonts, spacing } = theme;
const AlertWrapper = styled.div`
  margin: ${spacing.larger} auto;
  font-size: ${fonts.sizeH4};
  text-align: center;
  background: ${colors.lightBackground};
`;
