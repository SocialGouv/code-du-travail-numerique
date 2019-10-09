import React from "react";
import Head from "next/head";
import { withRouter } from "next/router";
import { Alert } from "@cdt/ui-old";
import { Container, Section } from "@socialgouv/react-ui";

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
    const { router, items = [], pageUrl, ogImage } = this.props;
    const { q: query = "" } = router.query;
    return (
      <Layout>
        <Head>
          <meta name="robots" content="noindex, follow" />
        </Head>
        <Metas
          url={pageUrl}
          title={`${query} - Code du travail numérique`}
          description="Posez votre question sur le droit du travail et obtenez une réponse personalisée à vos questions (formation, rupture de contrat, démission, indémnités)."
          image={ogImage}
        />
        <Section>
          {items.length === 0 ? (
            <Container narrow>
              <Alert>
                Nous n’avons pas trouvé de résultat pour votre recherche.
              </Alert>
            </Container>
          ) : (
            <SearchResults items={items} isSearch query={query} />
          )}
        </Section>
      </Layout>
    );
  }
}

export default withRouter(SearchPage);
