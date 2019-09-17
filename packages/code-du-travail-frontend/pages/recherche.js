import React from "react";
import Head from "next/head";
import { withRouter } from "next/router";
import { Alert, Container, Section } from "@cdt/ui-old";

import Search from "../src/search/Search";
import { fetchSearchResults } from "../src/search/search.service";
import { SearchResults } from "../src/search/SearchResults";
import { PageLayout } from "../src/layout/PageLayout";

import Metas from "../src/common/Metas";

class SearchPage extends React.Component {
  static async getInitialProps({ query: { q: query } }) {
    const {
      facets,
      hits: { hits: items } = { hits: [] }
    } = await fetchSearchResults({
      query
    });
    return {
      searchResults: {
        facets,
        items
      }
    };
  }

  render() {
    const {
      router,
      searchResults: { items } = { items: [] },
      pageUrl,
      ogImage
    } = this.props;
    const { q: query = "" } = router.query;
    return (
      <PageLayout>
        <Head>
          <meta name="robots" content="noindex, follow" />
        </Head>
        <Metas
          url={pageUrl}
          title={`${query} - Code du travail numérique`}
          description="Posez votre question sur le droit du travail et obtenez une réponse personalisée à vos questions (formation, rupture de contrat, démission, indémnités)."
          image={ogImage}
        />
        <Search />
        <Section>
          <Container narrow>
            {items.length === 0 ? (
              <Alert>
                Nous n’avons pas trouvé de résultat pour votre recherche.
              </Alert>
            ) : (
              <>
                <h1>{`Résultats pour "${query}"`}</h1>
                <SearchResults items={items} query={query} />
              </>
            )}
          </Container>
        </Section>
      </PageLayout>
    );
  }
}

export default withRouter(SearchPage);
