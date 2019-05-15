import React from "react";
import PropTypes from "prop-types";
import ConventionInfos from "./ConventionInfos";
import ConventionTexte from "./ConventionTexte";
import ConventionExplainer from "./ConventionExplainer";
import ConventionListeTextes from "./ConventionListeTextes";
import { Tabs } from "@cdt/ui";
import styled from "styled-components";

const Convention = ({ convention, conteneur }) => (
  <React.Fragment>
    <ExplainerWrapper>
      <ConventionExplainer />
    </ExplainerWrapper>
    <Tabs
      data={[
        {
          tab: "Informations",
          panel: (
            <ConventionInfos convention={convention} conteneur={conteneur} />
          ),
          key: "infos"
        },
        {
          tab: "Texte de base",
          panel: <ConventionTexte id={conteneur.texte_de_base} />,
          key: "texte-de-base"
        },
        {
          tab: "Texte attachés",
          panel: (
            <ConventionListeTextes
              conteneur={conteneur}
              typeTextes={"attaches"}
            />
          ),
          key: "attaches"
        },
        {
          tab: "Texte salaires",
          panel: (
            <ConventionListeTextes
              conteneur={conteneur}
              typeTextes={"salaires"}
            />
          ),
          key: "salaires"
        },
        {
          tab: "Textes d'extensions",
          panel: (
            <ConventionListeTextes
              conteneur={conteneur}
              typeTextes={"extensions"}
            />
          ),
          key: "extensions"
        }
      ]}
    />
  </React.Fragment>
);

Convention.propTypes = {
  convention: PropTypes.object.isRequired,
  conteneur: PropTypes.shape({
    texte_de_base: PropTypes.string.isRequired
  }).isRequired
};

const ExplainerWrapper = styled.div`
  margin-bottom: 20px;
  .accordion > div {
    padding: 10px;
  }
`;

export default Convention;
