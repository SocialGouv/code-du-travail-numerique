import React from "react";
import styled from "styled-components";
import { Alert, Container, theme } from "@socialgouv/react-ui";

import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";
import { outils } from "../../src/common/Outils";

import { CalculateurIndemnite } from "../../src/outils/IndemniteLicenciement";
import { DureePreavisLicenciement } from "../../src/outils/DureePreavisLicenciement";
import { SimulateurEmbauche } from "../../src/outils/SimulateurEmbauche";
import { SimulateurIndemnitePrecarite } from "../../src/outils/IndemnitePrecarite";
import { DureePreavisDemission } from "../../src/outils/DureePreavisDemission";

const BigError = ({ children }) => (
  <StyledContainer>
    <Alert>{children}</Alert>
  </StyledContainer>
);

const OutilIntrouvable = () => <BigError>Cet outil est introuvable</BigError>;

const outilsBySlug = {
  "indemnite-licenciement": CalculateurIndemnite,
  "preavis-licenciement": DureePreavisLicenciement,
  "simulateur-embauche": SimulateurEmbauche,
  "indemnite-precarite": SimulateurIndemnitePrecarite,
  "preavis-demission": DureePreavisDemission
};

const getSimulator = function(name) {
  const outil = outils.find(({ slug = "" }) =>
    new RegExp(`/${name}$`).test(slug)
  );
  if (outil) {
    return {
      title: outil.title,
      description: outil.text,
      component: outilsBySlug[name]
    };
  }
  return {
    title: "Outil introuvable",
    component: OutilIntrouvable
  };
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
      </Layout>
    );
  }
}

export default Outils;

const { fonts } = theme;

const StyledContainer = styled(Container)`
  margin: 20%;
  font-size: ${fonts.sizes.headings.large};
  text-align: center;
`;
