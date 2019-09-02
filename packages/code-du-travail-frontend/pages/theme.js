import React from "react";
import Head from "next/head";
import getConfig from "next/config";
import styled from "styled-components";
import { Alert, Container, Section, theme } from "@cdt/ui-old";
import fetch from "isomorphic-unfetch";

import { Link } from "../routes";
import Search from "../src/search/Search";
import { SearchResultList } from "../src/search/SearchResultList";

import Themes from "../src/home/Themes";
import { PageLayout } from "../src/layout/PageLayout";
import { Breadcrumbs } from "../src/common/Breadcrumbs";
import Metas from "../src/common/Metas";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

// return breadcrumbs components
const getBreadcrumbs = theme => {
  const crumbs = [
    <Link key="root" route="themes">
      <a title="Tous les thèmes">Thèmes</a>
    </Link>
  ];

  const leaves =
    (theme.breadcrumbs &&
      theme.breadcrumbs.map((item, index) => (
        <Link key={item.slug} route="themes" params={{ slug: item.slug }}>
          <a title={item.title}>{item.title}</a>
        </Link>
      ))) ||
    [];

  crumbs.push(...leaves);

  if (theme.title && theme.slug) {
    crumbs.push(
      <span title={`voir le contenu du thème ${theme.title}`}>
        {theme.title}
      </span>
    );
  }

  return crumbs;
};

// Theme page
class Theme extends React.Component {
  static async getInitialProps({ query: { slug } }) {
    const response = await fetch(`${API_URL}/themes${slug ? `/${slug}` : ""}`);
    if (!response.ok) {
      return { statusCode: response.status };
    }
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
    const breadcrumbs = getBreadcrumbs(theme);
    const isRootTheme = !theme.title;

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
        <Breadcrumbs items={breadcrumbs} />
        {theme.children && theme.children.length > 0 && (
          <Section variant="white">
            <Themes title={theme.title} themes={theme.children} />
          </Section>
        )}
        {!isRootTheme && (
          <Section>
            <Container>
              {(theme.refs && theme.refs.length && (
                <SearchResultList items={theme.refs} />
              )) ||
                null}
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
