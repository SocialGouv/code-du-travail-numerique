import React from "react";
import getConfig from "next/config";
import Head from "next/head";
import { withRouter } from "next/router";
import fetch from "isomorphic-unfetch";

import Search from "../src/search/Search";
import { PageLayout } from "../src/layout/PageLayout";
import { AddressResults } from "../src/search/AddressResults";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

class AnnuairePage extends React.Component {
  static async getInitialProps({ query }) {
    let url = `${API_URL}/annuaire/search?`;
    if (query.coord) {
      const [lon, lat] = query.coord.split(":");
      url += `coord=${lon}:${lat}`;
    } else {
      url += `q=${query.q}`;
    }
    const response = await fetch(url);

    if (!response.ok) {
      return {
        results: {},
        errorCode: response.status,
        errorStatus: response.statusText
      };
    }

    const data = await response.json();
    return {
      results: data.hits.hits.map(item => item._source)
    };
  }

  render() {
    const { router, results } = this.props;
    const { q = "", source = "" } = router.query;
    return (
      <PageLayout>
        <Head>
          <title>{q} - Code du travail numérique</title>
        </Head>
        <Search />
        <AddressResults
          query={q}
          results={results}
          source={source}
          url={router.asPath}
        />
      </PageLayout>
    );
  }
}

export default withRouter(AnnuairePage);
