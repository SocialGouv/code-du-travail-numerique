import React from "react";
import getConfig from "next/config";
import Head from "next/head";
import { withRouter } from "next/router";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";
import { Container } from "@cdt/ui";

import SeeAlso from "../src/common/SeeAlso";
import Search from "../src/search/Search";
import { PageLayout } from "../src/layout/PageLayout";
import SearchResults from "../src/search/SearchResults";
import { getExcludeSources, getLabelBySource } from "../src/sources";
import { Faceting } from "../src/search/Faceting";

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
        results: { facets: [] },
        errorCode: response.status,
        errorStatus: response.statusText
      };
    }

    const data = await response.json();
    return {
      results: data || {}
    };
  }

  render() {
    const { router, results } = this.props;
    const { source = "", q = "" } = router.query;
    const title = source ? getLabelBySource(source) : "Résultats";
    return (
      <PageLayout>
        <Head>
          <title>{q} - Code du travail numérique</title>
        </Head>
        <Search />
        <div className="section">
          <Container>
            <SearhPageLayout>
              {results.facets.length > 0 && (
                <Column>
                  <Faceting data={results.facets} query={q} />
                </Column>
              )}
              <Page>
                <SearchResults query={q} data={results} source={source} />
              </Page>
            </SearhPageLayout>
          </Container>
        </div>
        <SeeAlso />
      </PageLayout>
    );
  }
}

export default withRouter(SearchPage);

const SearhPageLayout = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  flex: 1 1 calc(20% - 1rem);
  margin-right: 1em;
`;

const Page = styled.div`
  margin-left: 1rem;
  flex: 1 1 calc(80% - 1rem);
`;
