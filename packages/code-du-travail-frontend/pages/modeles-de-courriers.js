import React from "react";
import { withRouter } from "next/router";
import { getConfig } from "next/config";
import PropTypes from "prop-types";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import { Button, Container, Alert, Article } from "@cdt/ui";

import SeeAlso from "../src/common/SeeAlso";
import FeedbackForm from "../src/common/FeedbackForm";
import Html from "../src/common/Html";
import Search from "../src/search/Search";
import { DateContenu } from "../src/common/DateContenu";

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
    Modèles de courrier fournis par vos services de renseignements des DIRECCTE
    en région
  </div>
);

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

class ModeleCourrier extends React.Component {
  static async getInitialProps({ res, query }) {
    return await fetch(`${API_URL}/items/modeles_de_courriers/${query.slug}`)
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
    const { data } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>Modèle de courrier : {data._source.title}</title>
        </Head>
        <Search />
        {!data && <BigError>Modèle de courrier introuvable</BigError>}
        {data && (
          <Article title={data._source.title}>
            <Html>{data._source.html}</Html>
            <div className="center btn-download">
              <a
                className="btn"
                title="Télécharger le courrier type"
                href={`${process.env.API_URL}/docs/${data._source.filename}`}
              >
                Télécharger le document
              </a>
            </div>
            {data._source.date && <DateContenu value={data._source.date} />}
            <Source />
            <a
              className="btn"
              title="Télécharger le courrier type"
              href={`${API_URL}/docs/${data._source.filename}`}
            >
              Télécharger le document
            </a>
          </Article>
        )}
        <SeeAlso />
        <FeedbackForm query="" />
      </React.Fragment>
    );
  }
}

export default withRouter(ModeleCourrier);
