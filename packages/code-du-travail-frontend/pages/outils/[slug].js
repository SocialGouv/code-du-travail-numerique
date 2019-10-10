import React from "react";
import styled from "styled-components";
import { Alert } from "@cdt/ui-old";
import { Container, theme } from "@socialgouv/react-ui";

import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";

import { CalculateurIndemnite } from "../../src/outils/IndemniteLicenciement";
import { SimulateurEmbauche } from "../../src/outils/SimulateurEmbauche";
import { SimulateurIndemnitePrecarite } from "../../src/outils/IndemnitePrecarite";
import { DureePreavisDemission } from "../../src/outils/DureePreavisDemission";

const BigError = ({ children }) => (
  <StyledContainer>
    <Alert variant="warning">{children}</Alert>
  </StyledContainer>
);

const OutilIntrouvable = () => <BigError>Cet outil est introuvable</BigError>;

const getSimulator = function(name) {
  switch (name) {
    case "indemnite-licenciement":
      return {
        title: "Calculer une indemnité de licenciement",
        description:
          "Calculez votre indemnité de licenciement en tenant compte des dispositions conventionnelles",
        component: CalculateurIndemnite
      };
    case "simulateur-embauche":
      return {
        title: "Simulateur d'embauche",
        description:
          "Simuler le coût d'une embauche en France et calculer le salaire net à partir du brut : CDD, statut cadre, cotisations sociales, retraite…",
        component: SimulateurEmbauche
      };
    case "indemnite-precarite":
      return {
        title: "Calculer une indemnite de précarité",
        description: "Calculez votre prime de précarité",
        component: SimulateurIndemnitePrecarite
      };
    case "preavis-demission":
      return {
        title: "Calculer un préavis de démission",
        description: "Calculer un préavis de démission",
        component: DureePreavisDemission
      };
    default:
      return {
        title: "Outil introuvable",
        component: OutilIntrouvable
      };
  }
};

class Outils extends React.Component {
  static async getInitialProps({ query }) {
    // we don't request data from api since outils are client side only
    return { slug: query.slug, searchTerm: query.q };
  }
  render() {
    const { searchTerm, slug, pageUrl, ogImage } = this.props;
    const { component: Simulator, title, description } = getSimulator(slug);
    return (
      <Layout>
        <Metas
          url={pageUrl}
          title={title}
          description={description}
          image={ogImage}
        />
        <Simulator q={searchTerm} />
        <Source>-</Source>
      </Layout>
    );
  }
}

export default Outils;

const { colors, fonts, spacing } = theme;

const StyledContainer = styled(Container)`
  margin: 20%;
  font-size: ${fonts.sizeH2};
  text-align: center;
`;

const Source = styled.div`
  margin-top: 50px;
  padding: ${spacing.small};
  text-align: center;
  background: ${colors.lightBackground};
`;
