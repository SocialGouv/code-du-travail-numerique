import React from "react";
import { withRouter } from "next/router";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import { Container, Alert } from "@socialgouv/code-du-travail-ui";

import Search from "../src/search/Search";
import Answer from "../src/search/Answer";
import api from "../conf/api.js";

const BigError = ({ children }) => (
  <Container style={{ fontSize: "2em", textAlign: "center", margin: "20%" }}>
    <Alert warning>{children}</Alert>
  </Container>
);

class Question extends React.Component {
  static async getInitialProps({ res, query }) {
    return await fetch(`${api.BASE_URL}/items/faq/${query.slug}`)
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
          <title>{data._source.title}</title>
        </Head>
        <Search />
        {!data && <BigError>Cette question n'a pas été trouvée</BigError>}
        {data && (
          <Answer
            title={data._source.title}
            html={data._source.text}
            footer="FAQ"
          />
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(Question);
