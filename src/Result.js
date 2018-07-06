import React from "react";
import * as Feather from "react-feather";
import styled from "styled-components";

import Articles from "./Articles";
import Articulation from "./Articulation";
import FAQ, { hasFaq } from "./FAQ";
import FeedbackForm from "./FeedbackForm";
import Fiches, { hasFiche } from "./Fiches";
import Panel from "./Panel";
import SeeAlso from "./SeeAlso";

// page de résultats

const BlockTitle = styled.div`
  font-size: 1.2em;
  color: ${props => props.theme.primary};
  svg {
    vertical-align: bottom;
  }
  padding-bottom: 10px;
  margin-bottom: 10px;
  margin-top: 20px;
  border-bottom: 2px solid ${props => props.theme.primary};
`;


const InfosRupture = () => (
  <Panel title="Liens utiles">
    <li>
      <a href="https://www.telerc.travail.gouv.fr/RuptureConventionnellePortailPublic/jsp/site/Portal.jsp">
        TELERC : saisie d'une demande d'homologation de R.C.{" "}
        <Feather.ExternalLink size="10" />
      </a>
    </li>
    <li>
      <a href="https://www.telerc.travail.gouv.fr/RuptureConventionnellePortailPublic/jsp/site/Portal.jsp?page=calculerdelairetractation">
        TELERC : calcul de retractation <Feather.ExternalLink size="10" />
      </a>
    </li>
    <li>
      <a href="https://www.telerc.travail.gouv.fr/RuptureConventionnellePortailPublic/jsp/site/Portal.jsp?page_id=14">
        TELERC : calcul de l'indemnité légale de rupture conventionnelle{" "}
        <Feather.ExternalLink size="10" />
      </a>
    </li>
  </Panel>
);

const Result = ({ onResetClick, theme }) => {
  const hasFaqEntry = hasFaq(theme);
  const hasFicheEntry = hasFiche(theme);

  return (

    <div style={{ marginTop: 20 }} role="article">

      {(hasFaqEntry || hasFicheEntry) && (
          <React.Fragment>
            <Panel title="F.A.Q. et fiches">
              {hasFaqEntry && (
                <React.Fragment>
                  <BlockTitle>
                    <Feather.HelpCircle size="20" /> F.A.Q. Code du travail
                  </BlockTitle>
                  <FAQ theme={theme} />
                </React.Fragment>
              )}
              {hasFicheEntry && (
                <React.Fragment>
                  <BlockTitle>
                    <Feather.FileText size="20" /> Fiches pratiques
                  </BlockTitle>
                  <Fiches theme={theme} />
                </React.Fragment>
              )}
            </Panel>
          </React.Fragment>
        )}

      {theme.id === 1700 && <InfosRupture />}

      <Panel title="Textes officiels">
        <BlockTitle>
          <Feather.AlertTriangle size="20" /> Textes applicables
        </BlockTitle>
        <Articulation theme={theme} />
        {theme.articles &&
          theme.articles.length && (
            <React.Fragment>
              <BlockTitle>
                <Feather.Book size="20" /> Code du Travail Articles
              </BlockTitle>
              <Articles theme={theme} />
            </React.Fragment>
          )}
      </Panel>

      <SeeAlso />

      <FeedbackForm theme={theme.id} />

    </div>

  );
};
export default Result;
