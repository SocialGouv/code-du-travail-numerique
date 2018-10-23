import React from "react";
import { withRouter } from "next/router";
import getConfig from "next/config";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import { Container, Alert } from "@cdt/ui";

import SeeAlso from "../src/common/SeeAlso";
import FeedbackForm from "../src/common/FeedbackForm";
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
      marginTop: 50
    }}
  >
    Cet outils vous est fournis par la DGT
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
  static async getInitialProps({ res, query }) {
    return await fetch(`${API_URL}/items/outils/${query.slug}`)
      .then(r => r.json())
      .then(data => {
        return { data };
      })
      .catch(e => {
        res.statusCode = 404;
        throw e;
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
        <Source />
        <SeeAlso />
        <FeedbackForm query="" />
      </React.Fragment>
    );
  }
}

export default withRouter(Outils);
