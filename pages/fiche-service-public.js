import React from "react";
import { withRouter } from "next/router";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import { Container, Alert, Article } from "@socialgouv/code-du-travail-ui";
import styled from "styled-components";
import { ExternalLink } from "react-feather";

import SeeAlso from "../src/common/SeeAlso";
import FeedbackForm from "../src/common/FeedbackForm";
import Html from "../src/common/Html";
import Search from "../src/search/Search";

const BigError = ({ children }) => (
  <Container style={{ fontSize: "2em", textAlign: "center", margin: "20%" }}>
    <Alert warning>{children}</Alert>
  </Container>
);

const ServicePublicCss = styled.div`
  .sp__Titre {
    font-size: 1.5rem;
  }
`;

const Source = ({ name, url }) => (
  <div
    style={{
      background: "var(--color-light-background)",
      padding: 10,
      marginTop: 50
    }}
  >
    <a href={url} target="_blank">
      Voir le contenu original sur : {name}{" "}
      <ExternalLink
        style={{ verticalAlign: "middle", margin: "0 5px" }}
        size={16}
      />
    </a>
  </div>
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
            <ServicePublicCss>
              <Html>{data._source.html}</Html>
            </ServicePublicCss>
            <Source name="service-public.fr" url={data._source.url} />
          </Article>
        )}
        <SeeAlso />
        <FeedbackForm query="" />
      </React.Fragment>
    );
  }
}

export default withRouter(Fiche);
