import React from "react";
import getConfig from "next/config";
import Head from "next/head";
import { withRouter } from "next/router";
import fetch from "isomorphic-unfetch";
import { Container } from "@cdt/ui";

import Search from "../src/search/Search";
import { PageLayout } from "../src/layout/PageLayout";
import SearchResults from "../src/search/SearchResults";
import { getExcludeSources } from "../src/sources";

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
      hits: { hits }
    } = await response.json();
    return {
      data: {
        facets,
        items: hits
      }
    };
  }

  render() {
    const { router, data } = this.props;
    const { source = "", q = "" } = router.query;
    return (
      <PageLayout>
        <Head>
          <title>{q} - Code du travail numérique</title>
        </Head>
        <Search />
        <div className="section">
          <Container>
            <SearchResults query={q} results={data} source={source} />
          </Container>
        </div>
      </PageLayout>
    );
  }
}

export default withRouter(SearchPage);
