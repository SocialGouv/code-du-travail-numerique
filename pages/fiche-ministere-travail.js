import React from "react";
import { withRouter } from "next/router";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import { Container, Alert } from "@socialgouv/code-du-travail-ui";

import Search from "../src/search/Search";
import Answer from "../src/search/Answer";

const BigError = ({ children }) => (
  <Container style={{ fontSize: "2em", textAlign: "center", margin: "20%" }}>
    <Alert warning>{children}</Alert>
  </Container>
);

class Fiche extends React.Component {
  static async getInitialProps({ res, query }) {
    return await fetch(
      `${process.env.API_URL}/items/fiches_ministere_travail/${query.slug}`
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
          <title>Fiche ministère du travail : {data._source.title}</title>
        </Head>
        <Search />
        {!data && <BigError>Cette fiche n'a pas été trouvée</BigError>}
        {data && (
          <Answer
            title={data._source.title}
            html={data._source.text}
            footer="Fiches Ministère du travail"
          />
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(Fiche);
