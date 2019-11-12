import React from "react";
import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import {
  Alert,
  Button,
  Container,
  Section,
  Wrapper
} from "@socialgouv/react-ui";

import ConventionModal from "../src/conventions/Search/Modal";
import { fetchSearchResults } from "../src/search/search.service";
import { SearchResults } from "../src/search/SearchResults";
import { Layout } from "../src/layout/Layout";

import Metas from "../src/common/Metas";

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
      <Layout>
        <Head>
          <meta name="robots" content="noindex, follow" />
        </Head>
        <Metas
          url={pageUrl}
          title={`${query} - Code du travail numérique`}
          description="Posez votre question sur le droit du travail et obtenez une réponse personalisée à vos questions (formation, rupture de contrat, démission, indemnités)."
          image={ogImage}
        />
        {items.documents.length === 0 &&
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
            <SearchResults items={items} isSearch query={query} />
            <Section>
              <Container>
                <Wrapper>
                  <p>
                    <ConventionModal key="convention-modal">
                      {openModal => (
                        <Button variant="secondary" onClick={openModal}>
                          Chercher une convention collective
                        </Button>
                      )}
                    </ConventionModal>
                  </p>
                  <p>
                    <Link href="/themes" passHref>
                      <Button as="a" variant="secondary">
                        Consulter les themes
                      </Button>
                    </Link>
                  </p>
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
