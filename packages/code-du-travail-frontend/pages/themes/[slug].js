import React from "react";
import Link from "next/link";
import styled from "styled-components";
import getConfig from "next/config";
import { Container, PageTitle, Section, Tag } from "@socialgouv/react-ui";
import fetch from "isomorphic-unfetch";

import { SearchResults } from "../../src/search/SearchResults";
import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";
import { ThemeBreadcrumbs } from "../../src/common/ThemeBreadcrumbs";

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
        <Section>
          <Container>
            <PageTitle>{theme.title}</PageTitle>
            {theme.children && theme.children.length > 0 && (
              <StyledContainer narrow noPadding>
                {theme.children.map(({ slug, title }) => (
                  <Link
                    key={slug}
                    href="/themes/[slug]"
                    as={`/themes/${slug}`}
                    passHref
                  >
                    <Tag shadow>{title}</Tag>
                  </Link>
                ))}
              </StyledContainer>
            )}
          </Container>
          {theme.refs && theme.refs.length > 0 && (
            <SearchResults
              query={theme.title}
              items={{ documents: theme.refs, articles: [], themes: [] }}
            />
          )}
        </Section>
      </Layout>
    );
  }
}

export default Theme;

const StyledContainer = styled(Container)`
  text-align: center;
`;
