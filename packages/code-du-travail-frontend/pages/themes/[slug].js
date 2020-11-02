import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
import {
  Button,
  Container,
  PageTitle,
  Section,
  theme,
} from "@socialgouv/cdtn-ui";
import fetch from "isomorphic-unfetch";
import getConfig from "next/config";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import { FocusRoot } from "../../src/a11y";
import { Breadcrumbs } from "../../src/common/Breadcrumbs";
import Metas from "../../src/common/Metas";
import { Layout } from "../../src/layout/Layout";
import { SearchResults } from "../../src/search/SearchResults";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

// Theme page
class Theme extends React.Component {
  static async getInitialProps({ query: { slug }, res }) {
    const searchThemeResponse = await fetch(`${API_URL}/themes/${slug}`);

    if (!searchThemeResponse.ok) {
      console.log(
        "response status is :",
        searchThemeResponse.status,
        typeof searchThemeResponse.status
      );
      if (res) {
        if (searchThemeResponse.status === 404) {
          /* Not ready yet, not handling 404 status
        // https://github.com/vercel/next.js/discussions/14890
        return {
          unstable_redirect: {
            destination: "/404",
            permanent: true,
          },
        };
        */
          // monkeypatching approach, works fine though:
          res.writeHead(404, { Location: "/" });
          res.end();
        }
      }
      return { statusCode: searchThemeResponse.status };
    }

    const theme = await searchThemeResponse.json();

    return {
      theme,
    };
  }

  render() {
    const { theme = {} } = this.props;

    return (
      <Layout>
        <Metas
          title={`${theme.title} - Code du travail numérique`}
          description={`Explorez les contenus autour du thème ${theme.title}`}
        />
        <Breadcrumbs items={theme.breadcrumbs} />
        <Section>
          <Container>
            <FocusRoot>
              <PageTitle subtitle={theme.description}>{theme.title}</PageTitle>
            </FocusRoot>
            {theme.children && theme.children.length > 0 && (
              <StyledContainer>
                {theme.children.map(({ slug, label }) => (
                  <Link
                    key={slug}
                    href={`/${getRouteBySource(SOURCES.THEMES)}/[slug]`}
                    as={slug}
                    passHref
                  >
                    <Button as={StyledLink}>{label}</Button>
                  </Link>
                ))}
              </StyledContainer>
            )}
          </Container>
        </Section>
        {theme.refs && theme.refs.length > 0 && (
          <Section>
            <SearchResults
              items={{ articles: [], documents: theme.refs, themes: [] }}
            />
          </Section>
        )}
      </Layout>
    );
  }
}

export default Theme;

const { breakpoints, spacings } = theme;

const StyledContainer = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledLink = styled.a`
  margin: ${spacings.small};
  @media (max-width: ${breakpoints.mobile}) {
    flex: 1 1 auto;
  }
`;
