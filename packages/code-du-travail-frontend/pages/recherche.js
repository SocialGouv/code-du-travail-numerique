import React from "react";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { withRouter } from "next/router";
import {
  Alert,
  Container,
  PageTitle,
  Section,
  Tag,
  Heading,
  theme,
  Wrapper
} from "@socialgouv/react-ui";

import { ConventionModal } from "../src/conventions/Search/Modal";
import { fetchSearchResults } from "../src/search/search.service";
import { SearchResults } from "../src/search/SearchResults";
import SearchBar from "../src/search/SearchBar";
import { Layout } from "../src/layout/Layout";

import Metas from "../src/common/Metas";

const SEARCH_ID = "search-input";

class SearchPage extends React.Component {
  static async getInitialProps({ query: { q: query } }) {
    const items = await fetchSearchResults(query);
    return { items };
  }

  render() {
    const {
      router,
      items = { documents: [], articles: [], themes: [] },
      pageUrl,
      ogImage
    } = this.props;
    const { q: query = "" } = router.query;
    return (
      <Layout currentPage="search">
        <Head>
          <meta name="robots" content="noindex, follow" />
        </Head>
        <Metas
          url={pageUrl}
          title={`${query} - Code du travail numérique`}
          description="Posez votre question sur le droit du travail et obtenez une réponse personnalisée à vos questions (formation, rupture de contrat, démission, indemnités)."
          image={ogImage}
        />
        <Container narrow>
          <label htmlFor={SEARCH_ID}>
            <PageTitle>Recherche</PageTitle>
          </label>
          <SearchBarWrapper>
            <SearchBar inputId={SEARCH_ID} hasButton hasSearchIcon />
          </SearchBarWrapper>
        </Container>
        {query &&
        items.documents.length === 0 &&
        items.articles.length === 0 &&
        items.themes.length === 0 ? (
          <Section>
            <Container narrow>
              <Alert>
                Nous n’avons pas trouvé de résultat pour votre recherche.
              </Alert>
            </Container>
          </Section>
        ) : (
          <>
            <Section>
              <SearchResults items={items} isSearch query={query} />
            </Section>
            <Section>
              <Container>
                <Wrapper variant="light">
                  <Heading
                    shift={theme.spacings.xmedium}
                    variant="primary"
                    stripped
                  >
                    Vous n&apos;avez pas trouvé ce que vous cherchiez ? Essayez
                    &hellip;
                  </Heading>
                  <>
                    <ConventionModal key="convention-modal">
                      {openModal => (
                        <Tag as="a" variant="secondary" onClick={openModal}>
                          Chercher une convention collective
                        </Tag>
                      )}
                    </ConventionModal>
                    <Link href="/themes" passHref>
                      <Tag as="a">Consulter les thèmes</Tag>
                    </Link>
                  </>
                </Wrapper>
              </Container>
            </Section>
          </>
        )}
      </Layout>
    );
  }
}
export default withRouter(SearchPage);

const { spacings } = theme;

const SearchBarWrapper = styled.div`
  margin-bottom: ${spacings.large} !important;
`;
