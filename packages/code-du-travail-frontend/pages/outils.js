import React from "react";
import { withRouter } from "next/router";
import getConfig from "next/config";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import { Container, Alert } from "@cdt/ui";

import SeeAlso from "../src/common/SeeAlso";
import Search from "../src/search/Search";
import CalculateurIndemnite from "../src/outils/indemniteLicenciement";

const BigError = ({ children }) => (
  <Container style={{ fontSize: "2em", textAlign: "center", margin: "20%" }}>
    <Alert warning>{children}</Alert>
  </Container>
);

const Source = ({ name }) => (
  <div
    style={{
      background: "var(--color-light-background)",
      padding: 10,
      marginTop: 50,
      textAlign: "center"
    }}
  >
    {name}
  </div>
);

const getOutilsFromCode = function(code) {
  switch (code) {
    case "indemnite-licenciement":
      return CalculateurIndemnite;

    default: {
      return () => <BigError> Cet outils est introuvable </BigError>;
    }
  }
};

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

class Outils extends React.Component {
  static async getInitialProps({ query }) {
    return await fetch(`${API_URL}/items/outils/${query.slug}`)
      .then(r => r.json())
      .then(data => {
        return { data };
      })
      .catch(e => {
        console.error(e);
        return { data: { _source: {} } };
      });
  }
  render() {
    const { data, router } = this.props;
    const OutilComponent = getOutilsFromCode(data._source.slug);
    return (
      <React.Fragment>
        <Head>
          <title>{data._source.title}</title>
        </Head>
        <Search />
        <OutilComponent q={router.query.q} />
        <Source name="-" />
        <SeeAlso />
      </React.Fragment>
    );
  }
}

export default withRouter(Outils);
