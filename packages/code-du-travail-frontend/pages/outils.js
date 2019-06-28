import React from "react";
import { withRouter } from "next/router";
import styled from "styled-components";
import { Alert, Container, theme } from "@cdt/ui";

import Search from "../src/search/Search";
import { CalculateurIndemnite } from "../src/outils/indemniteLicenciement";
import { PageLayout } from "../src/layout/PageLayout";
import { SimulateurEmbauche } from "../src/outils/simulateur-emauche";
import Metas from "../src/common/Metas";

const BigError = ({ children }) => (
  <StyledContainer>
    <Alert variant="warning">{children}</Alert>
  </StyledContainer>
);

const OutilIntrouvable = () => <BigError>Cet outil est introuvable</BigError>;

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
    const { data = { _source: {} }, router, pageUrl, ogImage } = this.props;
    const { outil: Outil, title, description } = getOutilFromCode(
      data._source.slug
    );
    return (
      <PageLayout>
        <Metas
          url={pageUrl}
          title={title}
          description={description}
          image={ogImage}
        />
        <Search />
        <Outil q={router.query.q} />
        <Source>-</Source>
      </PageLayout>
    );
  }
}

export default withRouter(Outils);

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
