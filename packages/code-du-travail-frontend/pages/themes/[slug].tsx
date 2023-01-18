import {
  Button,
  Container,
  PageTitle,
  Section,
  theme,
} from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Breadcrumbs from "../../src/common/Breadcrumbs";
import Metas from "../../src/common/Metas";
import { Layout } from "../../src/layout/Layout";
import { SearchResults } from "../../src/search/SearchResults";
import { handleError } from "../../src/lib/fetch-error";
import { API_URL } from "../../src/config";

interface Props {
  theme;
}

function Theme(props: Props): JSX.Element {
  const { theme = {} } = props;

  return (
    <Layout>
      <Metas
        title={theme.title}
        description={`Explorez les contenus autour du thème ${theme.title}`}
      />
      <Breadcrumbs items={theme.breadcrumbs} />
      <Section>
        <Container>
          <PageTitle subtitle={theme.description}>{theme.title}</PageTitle>
          {theme.children && theme.children.length > 0 && (
            <StyledContainer>
              {theme.children.map(({ slug, label }) => (
                <Link key={slug} href={slug} passHref legacyBehavior>
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
            items={{ documents: theme.refs, themes: [], articles: [] }}
          />
        </Section>
      )}
    </Layout>
  );
}

export const getServerSideProps = async ({ query }) => {
  const searchThemeResponse = await fetch(`${API_URL}/themes/${query.slug}`);

  if (!searchThemeResponse.ok) {
    return handleError(searchThemeResponse);
  }

  const theme = await searchThemeResponse.json();

  return { props: { theme } };
};

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
