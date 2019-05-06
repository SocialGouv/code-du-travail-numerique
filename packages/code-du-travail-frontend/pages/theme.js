import React from "react";
import Head from "next/head";
import getConfig from "next/config";
import { withRouter } from "next/router";
import { Container, Alert } from "@cdt/ui";
import fetch from "isomorphic-unfetch";

import { Link } from "../routes";
import Search from "../src/search/Search";

import Categories from "../src/home/Categories";
import { PageLayout } from "../src/layout/PageLayout";
import { Breadcrumbs } from "../src/common/Breadcrumbs";
import SearchResults from "../src/search/SearchResults";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

// return breadcrumbs components
const getBreadcrumbs = (items = []) => {
  if (items.length === 0) {
    return [];
  }
  const root = [
    <Link key="root" route="themes">
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
      <Link key={item.slug} route="themes" params={{ slug: item.slug }}>
        <a title={item.label}>{item.label}</a>
      </Link>
    );
  });
  return [root].concat(leaf);
};

// Theme page
class Theme extends React.Component {
  static async getInitialProps({ query: { slug } }) {
    const response = await fetch(
      `${API_URL}/themes${slug ? `/${slug}/items` : ""}`
    );
    if (!response.ok) {
      return {
        data: { theme: null },
        errorCode: response.status,
        errorStatus: response.statusText
      };
    }
    const theme = await response.json();
    return {
      data: { theme }
    };
  }

  render() {
    const {
      router,
      data: { theme }
    } = this.props;
    const { source = "", q = "" } = router.query;
    const breadcrumbs = getBreadcrumbs(theme.breadcrumbs);
    const isRootTheme = theme && !theme.slug;
    if (!theme) {
      return <NotFound />;
    }

    return (
      <PageLayout>
        <Head>
          <title>Code du travail numérique : {theme.label}</title>
          <meta
            name="description"
            content={`Explorez les contenus autour du thème ${theme.label}`}
          />
        </Head>
        <Search />
        <Breadcrumbs items={breadcrumbs} />
        {theme.children.length > 0 && (
          <div className="section section-white">
            <Categories
              isRoot={isRootTheme}
              title={isRootTheme ? undefined : null}
              themes={theme.children}
            />
          </div>
        )}
        {!isRootTheme && (
          <div className="section">
            <Container>
              <div className="wrapper-narrow">
                <SearchResults
                  query={q}
                  source={source}
                  results={{ items: theme.documents, facets: [] }}
                />
              </div>
            </Container>
          </div>
        )}
      </PageLayout>
    );
  }
}

export default withRouter(Theme);

const NotFound = () => (
  <PageLayout>
    <Head>
      <title>Theme introuvable : Code du travail numérique</title>
    </Head>
    <Search />
    <div className="section section-white">
      <Container>
        <BigError>Ce thème n&apos;a pas été trouvé</BigError>
      </Container>
    </div>
  </PageLayout>
);

const BigError = ({ children }) => (
  <div
    style={{
      fontSize: "1.3em",
      textAlign: "center",
      margin: "40px auto",
      background: "var(--color-light-background)"
    }}
  >
    <Alert warning>{children}</Alert>
    <br />
    <br />
  </div>
);
