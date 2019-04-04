import React from "react";
import Head from "next/head";
import { BreadCrumbs, Container, Alert } from "@cdt/ui";

import find from "unist-util-find";
import parents from "unist-util-parents";

import { Link } from "../routes";
import Search from "../src/search/Search";
import { SearchQuery } from "../src/search/SearchQuery";

import Categories from "../src/home/Categories";
import themes from "@cdt/data/dataset/themes-front.json";
import { searchResults } from "../src/search/search.service";
import { PageLayout } from "../src/layout/PageLayout";

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

// check if node definition match given slug
const slugMatch = (node, slug) =>
  Array.isArray(node.slug) ? node.slug.join("/") === slug : node.slug === slug;

// build list of parents data for the breadcrumbs
const getParents = node => {
  const p = [];
  if (node.type !== "root") {
    p.push(node);
  }
  let cur = node && node.parent;
  while (cur) {
    p.push(cur);
    cur = cur.parent;
  }
  return p.reverse();
};

// return breadcrumbs components
const getBreadcrumbs = parents =>
  (parents &&
    parents.map((parent, i) =>
      i === 0 ? (
        <Link key={parent.title} route="themes">
          <a title={parent.title}>{parent.title}</a>
        </Link>
      ) : i === parents.length - 1 ? (
        <span title={parent.title}>{parent.title}</span>
      ) : (
        <Link
          key={parent.title}
          route="themes"
          params={{ slug: parent.slug || ["/"] }}
        >
          <a title={parent.title}>{parent.title}</a>
        </Link>
      )
    )) ||
  [];

// Theme page
class Theme extends React.Component {
  static async getInitialProps({ res, query }) {
    // build a unist tree from themes.json
    const themeTree = parents({
      type: "root",
      title: "Thèmes",
      children: themes
    });
    // get current theme
    const theme =
      find(themeTree, n => slugMatch(n, query.slug || "/")) || themeTree;

    // get theme parents for breadcrumbs
    const themeParents = getParents(theme);

    if (!theme && res) {
      res.statusCode = 404;
    }

    return { theme, parents: themeParents };
  }

  render() {
    const { theme, parents } = this.props;
    const breadCrumbs = getBreadcrumbs(parents);
    return (
      <PageLayout>
        <Head>
          <title>Code du travail numérique : {theme && theme.title}</title>
        </Head>
        <Search />
        <div className="section section-white">
          <Container>
            {!theme && <BigError>Ce thème n&apos;a pas été trouvé</BigError>}
            {(breadCrumbs && breadCrumbs.length && (
              <h2 style={{ textAlign: "center", margin: "20px 0" }}>
                <BreadCrumbs entries={breadCrumbs} />
              </h2>
            )) || (
              <h2 style={{ textAlign: "center", margin: "20px 0" }}>
                Choisissez un thème :
              </h2>
            )}
          </Container>
          {(theme && theme.children && theme.children.length && (
            <Categories
              isRoot={parents.length === 0}
              title={null}
              themes={theme.children}
            />
          )) ||
            null}
        </div>
        {theme && theme.type !== "root" && (
          <div className="section">
            <Container>
              <SearchQuery
                query={theme.title}
                excludeSources="themes"
                fetch={searchResults}
              />
            </Container>
          </div>
        )}
      </PageLayout>
    );
  }
}

export default Theme;
