import React from "react";
import Head from "next/head";
import Link from "next/link";
import getConfig from "next/config";
import styled from "styled-components";
import { Alert, Container, Section, theme } from "@cdt/ui-old";
import fetch from "isomorphic-unfetch";

import Search from "../../src/search/Search";
import { SearchResults } from "../../src/search/SearchResults";
import { fetchSearchResults } from "../../src/search/search.service";

import Themes from "../../src/home/Themes";
import { PageLayout } from "../../src/layout/PageLayout";
import { Breadcrumbs } from "../../src/common/Breadcrumbs";
import Metas from "../../src/common/Metas";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

// return breadcrumbs components
const getBreadcrumbs = (items = []) => {
  if (items.length === 0) {
    return [];
  }
  const root = [
    <Link key="root" href="/themes">
      <a title="Tous les thèmes">Thèmes</a>
    </Link>
  ];

  const leaf = items.map((item, index) => {
    if (index === items.length - 1) {
      return (
        <span title={`voir le contenu du thème ${item.label}`}>
          {item.label}
        </span>
      );
    }
    return (
      <Link key={item.slug} href="/themes/[theme]" as={`/themes/${item.slug}`}>
        <a title={item.label}>{item.label}</a>
      </Link>
    );
  });
  return [root].concat(leaf);
};

// Theme page
class Theme extends React.Component {
  static async getInitialProps({ query: { slug: query } }) {
    const [searchThemeResponse, searchResults] = await Promise.all([
      fetch(`${API_URL}/themes${query ? `/${query}` : ""}`),
      fetchSearchResults({
        query,
        excludeSources: "themes"
      })
    ]);
    if (!searchThemeResponse.ok) {
      return { statusCode: searchThemeResponse.status };
    }
    const theme = await searchThemeResponse.json();

    const { facets, hits: { hits: items } = { hits: [] } } = searchResults;

    return {
      theme,
      searchResults: {
        facets,
        items
      },
      query
    };
  }

  render() {
    const {
      theme = { children: [] },
      searchResults: { items } = { items: [] },
      query,
      pageUrl,
      ogImage
    } = this.props;
    const breadcrumbs = getBreadcrumbs(theme.breadcrumbs);
    const isRootTheme = theme && !theme.slug;
    if (!theme) {
      return <NotFound />;
    }

    return (
      <PageLayout>
        <Metas
          url={pageUrl}
          title={`${theme.label} - Code du travail numérique`}
          description={`Explorez les contenus autour du thème ${theme.label}`}
          image={ogImage}
        />
        <Search />
        <Breadcrumbs items={breadcrumbs} />
        {theme.children.length > 0 && (
          <Section variant="white">
            <Themes
              title={isRootTheme ? undefined : null}
              themes={theme.children}
            />
          </Section>
        )}
        {!isRootTheme && (
          <Section>
            <Container narrow>
              <SearchResults query={query} items={items} />
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
