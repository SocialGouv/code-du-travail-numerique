import React from "react";
import { withRouter } from "next/router";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import { Container, Alert, Article } from "@socialgouv/code-du-travail-ui";

import Html from "../src/common/Html";
import Search from "../src/search/Search";

const BigError = ({ children }) => (
  <Container style={{ fontSize: "2em", textAlign: "center", margin: "20%" }}>
    <Alert warning>{children}</Alert>
  </Container>
);

class Fiche extends React.Component {
  static async getInitialProps({ res, query }) {
    return await fetch(
      `${process.env.API_URL}/items/fiches_service_public/${query.slug}`
    )
      .then(r => r.json())
      .then(data => ({
        data
      }))
      .catch(e => {
        console.log("e", e);
        res.statusCode = 404;
        throw e;
      });
  }

  render() {
    const { data } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>Fiche service-public.fr : {data._source.title}</title>
        </Head>
        <Search />
        {!data && <BigError>Cette fiche n'a pas été trouvée</BigError>}
        {data && (
          <Article title={data._source.title}>
            <Html>{data._source.text}</Html>
          </Article>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(Fiche);
