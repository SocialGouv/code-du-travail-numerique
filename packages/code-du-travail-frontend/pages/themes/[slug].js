import React from "react";
import getConfig from "next/config";
import { Section } from "@socialgouv/react-ui";
import fetch from "isomorphic-unfetch";

import { SearchResults } from "../../src/search/SearchResults";

import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";
import { ThemeBreadcrumbs } from "../../src/common/ThemeBreadcrumbs";
import Themes from "../../src/common/Themes";

const {
  publicRuntimeConfig: { API_URL }
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
      theme
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
        <ThemeBreadcrumbs theme={theme} />
        {theme.children && theme.children.length > 0 && (
          <Section variant="white">
            <Themes title={theme.title} themes={theme.children} />
          </Section>
        )}
        {theme.refs && theme.refs.length > 0 && (
          <Section>
            <SearchResults items={theme.refs} />
          </Section>
        )}
      </Layout>
    );
  }
}

export default Theme;
