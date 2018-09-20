import React from "react";
import { withRouter } from "next/router";
import Head from "next/head";
import { BreadCrumbs, Container, Alert } from "@socialgouv/code-du-travail-ui";

import find from "unist-util-find";
import parents from "unist-util-parents";

import { Link } from "../routes";
import Search from "../src/search/Search";
import Categories from "../src/Categories";
import themes from "../src/data/themes2";

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
    parents.map(
      (parent, i) =>
        i === 0 ? (
          <Link key={parent.title} route="themes">
            <a title={parent.title}>{parent.title}</a>
          </Link>
        ) : i === parents.length - 1 ? (
          <span title={parent.title}>{parent.title}</span>
        ) : (
          <Link
            key={parent.title}
            route="theme"
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
      <React.Fragment>
        <Head>
          <title>Code du travail numérique : {theme && theme.title}</title>
        </Head>
        <Search />
        <Container>
          {!theme && <BigError>Ce thème n&apos;a pas été trouvé</BigError>}
          {(breadCrumbs &&
            breadCrumbs.length && (
              <h2 style={{ textAlign: "center", margin: 20 }}>
                <BreadCrumbs entries={breadCrumbs} />
              </h2>
            )) || (
            <h2 style={{ textAlign: "center", margin: 20 }}>
              Choisissez un thème :
            </h2>
          )}
          {(theme &&
            theme.children &&
            theme.children.length && (
              <Categories title={null} themes={theme.children} />
            )) || (
            <BigError>
              Aucun contenu actuellement disponible sur ce thème :/
            </BigError>
          )}
        </Container>
      </React.Fragment>
    );
  }
}

export default withRouter(Theme);
