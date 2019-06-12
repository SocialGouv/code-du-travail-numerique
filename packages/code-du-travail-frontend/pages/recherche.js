import React from "react";
import getConfig from "next/config";
import { withRouter } from "next/router";
import fetch from "isomorphic-unfetch";
import { Container, Section } from "@cdt/ui";

import Search from "../src/search/Search";
import { PageLayout } from "../src/layout/PageLayout";
import SearchResults from "../src/search/SearchResults";
import { getExcludeSources } from "../src/sources";
import { Metas } from "../src/common/Metas";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

class SearchPage extends React.Component {
  static async getInitialProps({ query }) {
    const excludeSources = getExcludeSources(query.source);
    const response = await fetch(
      `${API_URL}/search?q=${query.q}&excludeSources=${excludeSources}`
    );
    if (!response.ok) {
      return {
        data: { facets: [], items: [] },
        errorCode: response.status,
        errorStatus: response.statusText
      };
    }

    const {
      facets,
      snippet = {},
      hits: { hits }
    } = await response.json();
    return {
      data: {
        facets,
        snippet: snippet._source,
        items: hits
      }
    };
  }

  render() {
    const { router, data, pageUrl } = this.props;
    const { source = "", q = "" } = router.query;
    return (
      <PageLayout>
        <Metas
          url={pageUrl}
          title={`${q} - Code du travail numérique`}
          description="Posez votre question sur le droit du travail et obtenez une réponse personalisée à vos questions (formation, rupture de contrat, démission, indémnités)."
        />
        <Search />
        <Section>
          <Container>
            <SearchResults query={q} results={data} source={source} />
          </Container>
        </Section>
      </PageLayout>
    );
  }
}

export default withRouter(SearchPage);
