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

const Source = ({ name }) => (
  <div
    style={{
      background: "var(--color-light-background)",
      padding: 10,
      marginTop: 50
    }}
  >
    Informations fournies par vos services de renseignements des DIRECCTE en
    région
  </div>
);

class Question extends React.Component {
  static async getInitialProps({ res, query }) {
    return await fetch(`${process.env.API_URL}/items/faq/${query.slug}`)
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
          <title>FAQ : {data._source.title}</title>
        </Head>
        <Search />
        {!data && <BigError>Cette question n'a pas été trouvée</BigError>}
        {data && (
          <Article title={data._source.title} footer="FAQ">
            <Alert warning>
              Important ! Ce site est en cours de construction : les données qui
              s'y trouvent peuvent être erronées ou imprécises.
              <br />
              <br />
              <a
                target="_blank"
                href="https://www.legifrance.gouv.fr/affichTexteArticle.do;jsessionid=AE9DCF75DDCF0465784CEE0E7D62729F.tplgfr37s_2?idArticle=JORFARTI000035607420&cidTexte=JORFTEXT000035607388&dateTexte=29990101&categorieLien=id"
              >
                L'ouverture officielle du site
              </a>{" "}
              est prévue pour 2020.
            </Alert>
            <Html>{data._source.html}</Html>
            <Source name="Services de renseignements des DIRECCTE" />
          </Article>
        )}
        <SeeAlso />
        <FeedbackForm query="" />
      </React.Fragment>
    );
  }
}

export default withRouter(Question);
