import React from "react";
import getConfig from "next/config";
import styled from "styled-components";
import { Alert, Container, Section, theme } from "@cdt/ui-old";
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

    if (!theme) {
      return (
        <Layout>
          <Metas
            url={pageUrl}
            title="Thème introuvable - Code du travail numérique"
            description={`Explorez les contenus autour du thème ${theme.title}`}
            image={ogImage}
          />
          <Section variant="white">
            <Container>
              <AlertWrapper>
                <Alert variant="warning">Ce thème n’a pas été trouvé</Alert>
              </AlertWrapper>
            </Container>
          </Section>
        </Layout>
      );
    }

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
            <Themes
              isRoot={false}
              title={theme.title}
              themes={theme.children}
            />
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

const { colors, fonts, spacing } = theme;
const AlertWrapper = styled.div`
  margin: ${spacing.larger} auto;
  font-size: ${fonts.sizeH4};
  text-align: center;
  background: ${colors.lightBackground};
`;
