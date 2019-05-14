import React from "react";
import { withRouter } from "next/router";
import Head from "next/head";
import styled from "styled-components";
import { Alert, Container } from "@cdt/ui";

import SeeAlso from "../src/common/SeeAlso";
import Search from "../src/search/Search";
import CalculateurIndemnite from "../src/outils/indemniteLicenciement";
import { PageLayout } from "../src/layout/PageLayout";
import { SimulateurEmbauche } from "../src/outils/simulateur-emauche";

const BigError = ({ children }) => (
  <StyledContainer>
    <Alert warning>{children}</Alert>
  </StyledContainer>
);

const OutilIntrouvable = () => <BigError>Cet outil est introuvable</BigError>;

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

const getOutilFromCode = function(code) {
  switch (code) {
    case "indemnite-licenciement":
      return {
        title: "Calculer une indemnité de licenciement",
        description:
          "Calculez votre indemnité de licenciement en tenant compte des dispositions conventionnelles",
        outil: CalculateurIndemnite
      };
    case "simulateur-embauche":
      return {
        title: "Simulateur d'embauche",
        description:
          "Simuler le coût d'une embauche en France et calculer le salaire net à partir du brut : CDD, statut cadre, cotisations sociales, retraite…",
        outil: SimulateurEmbauche
      };
    default:
      return {
        title: "Outil introuvable",
        outil: OutilIntrouvable
      };
  }
};

class Outils extends React.Component {
  static async getInitialProps({ query }) {
    // we don't request data from api since outils are client side only
    return { data: { _source: { slug: query.slug } } };
  }
  render() {
    const { data, router } = this.props;
    const { outil: Outil, title, description } = getOutilFromCode(
      data._source.slug
    );
    return (
      <PageLayout>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Head>
        <Search />
        <Outil q={router.query.q} />
        <Source name="-" />
        <SeeAlso />
      </PageLayout>
    );
  }
}

export default withRouter(Outils);

const StyledContainer = styled(Container)`
  margin: 20%;
  font-size: 2rem;
  text-align: center;
`;
