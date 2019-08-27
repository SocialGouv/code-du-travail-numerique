import React from "react";
import Head from "next/head";
import getConfig from "next/config";
import styled from "styled-components";
import { Alert, Container, Section, theme } from "@cdt/ui-old";
import fetch from "isomorphic-unfetch";

import { Link } from "../routes";
import Search from "../src/search/Search";
import { SearchQuery } from "../src/search/SearchQuery";

import Themes from "../src/home/Themes";
import { searchResults } from "../src/search/search.service";
import { PageLayout } from "../src/layout/PageLayout";
import { Breadcrumbs } from "../src/common/Breadcrumbs";
import Metas from "../src/common/Metas";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

// return breadcrumbs components
const getBreadcrumbs = (items = []) => {
  const crumbs = [
    <Link key="root" route="themes">
      <a title="Tous les thèmes">Thèmes</a>
    </Link>
  ];

  if (!items || items.length === 0) {
    return crumbs;
  }

  const leaves = items
    .filter(i => !!i.title)
    .map((item, index) => {
      if (index === items.length - 1) {
        return (
          <span title={`voir le contenu du thème ${item.title}`}>
            {item.title}
          </span>
        );
      }
      return (
        <Link key={item.slug} route="themes" params={{ slug: item.slug }}>
          <a title={item.title}>{item.title}</a>
        </Link>
      );
    });

  return crumbs.concat(leaves);
};

// Theme page
class Theme extends React.Component {
  static async getInitialProps({ query: { slug } }) {
    const response = await fetch(`${API_URL}/themes${slug ? `/${slug}` : ""}`);
    if (!response.ok) {
      return { statusCode: response.status };
    }
    const theme = await response.json();
    if (theme.hits.hits.length) {
      if (slug) {
        return {
          theme: theme.hits.hits[0]._source
        };
      } else {
        // root
        return {
          theme: {
            children: theme.hits.hits.map(t => t._source)
          }
        };
      }
    }
    throw new Error("Theme not found");
  }

  render() {
    const { theme, pageUrl, ogImage } = this.props;
    const breadcrumbs = getBreadcrumbs(
      (theme.parents || []).concat([
        {
          title: theme.title,
          slug: theme.slug
        }
      ])
    );
    const isRootTheme = theme && !theme.parents;
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
        {theme.children && theme.children.length > 0 && (
          <Section variant="white">
            <Themes
              title={isRootTheme ? undefined : null}
              themes={theme.children}
            />
          </Section>
        )}
        {!isRootTheme && (
          <Section>
            <Container>
              <SearchQuery
                query={theme.label}
                excludeSources="themes"
                fetch={searchResults}
              />
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
