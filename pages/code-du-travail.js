import React from "react";
import { withRouter } from "next/router";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import { Container, Alert, Article } from "@socialgouv/code-du-travail-ui";

import SeeAlso from "../src/common/SeeAlso";
import FeedbackForm from "../src/common/FeedbackForm";
import Html from "../src/common/Html";
import Search from "../src/search/Search";

const BigError = ({ children }) => (
  <Container style={{ fontSize: "2em", textAlign: "center", margin: "20%" }}>
    <Alert warning>{children}</Alert>
  </Container>
);

const Source = ({ name, url }) => (
  <div
    style={{
      background: "var(--color-light-background)",
      padding: 10,
      marginTop: 50
    }}
  >
    Retrouvez la version à jour de cet article sur{" "}
    <a href="http://legifrance.fr">legifrance.fr</a>
  </div>
);

class ArticleCode extends React.Component {
  static async getInitialProps({ res, query }) {
    return await fetch(
      `${process.env.API_URL}/items/code_du_travail/${query.slug}`
    )
      .then(r => r.json())
      .then(data => {
        console.log(data);
        return {
          data
        };
      })
      .catch(e => {
        console.log("e", e);
        res.statusCode = 404;
        throw e;
      });
  }

  render() {
    const { data } = this.props;
    console.log("data", data);
    return (
      <React.Fragment>
        <Head>
          <title>Code du travail : {data._source.title}</title>
        </Head>
        <Search />
        {!data && <BigError>Article introuvable</BigError>}
        {data && (
          <Article title={data._source.title} footer="FAQ">
            <Html>{data._source.html}</Html>
            <Source />
          </Article>
        )}
        <SeeAlso />
        <FeedbackForm query="" />
      </React.Fragment>
    );
  }
}

export default withRouter(ArticleCode);
