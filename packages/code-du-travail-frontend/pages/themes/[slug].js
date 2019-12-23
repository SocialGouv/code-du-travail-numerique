import React from "react";
import Link from "next/link";
import styled from "styled-components";
import getConfig from "next/config";
import {
  Container,
  PageTitle,
  Section,
  theme,
  Toast
} from "@socialgouv/react-ui";
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
                    <StyledLink>
                      <StyledToast shadow>{title}</StyledToast>
                    </StyledLink>
                  </Link>
                ))}
              </StyledContainer>
            )}
          </Container>
        </Section>
        {theme.refs && theme.refs.length > 0 && (
          <Section>
            <SearchResults
              items={{ documents: theme.refs, articles: [], themes: [] }}
            />
          </Section>
        )}
      </Layout>
    );
  }
}

export default Theme;

const { box, breakpoints, spacings } = theme;

const StyledContainer = styled(Container)`
  text-align: center;
`;

const StyledLink = styled.a`
  display: inline-block;
  margin-bottom: ${spacings.base};
  text-decoration: none;
  & + & {
    margin-left: ${spacings.base};
  }
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    & + & {
      margin-left: 0;
    }
  }
`;

const StyledToast = styled(Toast)`
  color: ${({ theme }) => theme.altText};
  border: ${({ theme }) => box.border(theme.border)};
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;
