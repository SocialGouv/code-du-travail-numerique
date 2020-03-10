import React from "react";
import Link from "next/link";
import styled from "styled-components";
import getConfig from "next/config";
import {
  Button,
  Container,
  PageTitle,
  Section,
  theme
} from "@socialgouv/react-ui";
import fetch from "isomorphic-unfetch";

import { SearchResults } from "../../src/search/SearchResults";
import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";
import { Breadcrumbs } from "../../src/common/Breadcrumbs";
import { FocusRoot } from "../../src/a11y";

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
        <Breadcrumbs items={theme.breadcrumbs} />
        <Section>
          <Container>
            <FocusRoot>
              <PageTitle>{theme.title}</PageTitle>
            </FocusRoot>
            {theme.children && theme.children.length > 0 && (
              <StyledContainer narrow noPadding>
                {theme.children.map(({ slug, title }) => (
                  <Link
                    key={slug}
                    href="/themes/[slug]"
                    as={`/themes/${slug}`}
                    passHref
                  >
                    <StyledLink variant="flat" as={Button}>
                      {title}
                    </StyledLink>
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

const { spacings } = theme;

const StyledContainer = styled(Container)`
  text-align: center;
`;

const StyledLink = styled.a`
  margin: ${spacings.small};
`;
