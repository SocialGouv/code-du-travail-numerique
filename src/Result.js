import React from "react";
import * as Feather from "react-feather";
import styled from "styled-components";

import Panel from "./Panel";
import Articles from "./Articles";
import Articulation from "./Articulation";
import ConventionPicker from "./ConventionPicker";
import FAQ, { hasFaq } from "./FAQ";
import FeedbackForm from "./FeedbackForm";
import Fiches, { hasFiche } from "./Fiches";
import ServiceRenseignementModal from "./ServiceRenseignementModal";

// page de résultats

const Notification = ({ children, className }) => (
  <div class={`notification ${className || ""}`}>{children}</div>
);

const Block = styled.div`
  li {
    margin: 10px 0;
    &:last-child {
      margin-bottom: 0;
    }
  }
  svg {
    vertical-align: bottom;
  }
  .dv-star-rating {
    font-size: 1.5em;
    vertical-align: middle;
    margin-left: 10px;
  }
`;

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

const TwoCols = styled.div`
  width: 100%;
  > div {
    width: calc(50% - 20px);
    margin: 10px;
    display: inline-block;
    box-sizing: border-box;
  }
`;

const SectionSeparator = styled.div`
  margin: 10px;
  padding: 10px;
  text-align: center;
  font-size: 1.5em;
  background-color: ${props => props.theme.light2};
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

  let links = [
    {
      href: "https://socialgouv.github.io/faq-code-du-travail/",
      text: "Question-Réponse des services de renseignement"
    },
    {
      href:
        "http://bourgogne-franche-comte.direccte.gouv.fr/Le-code-BFC-Bienveillant-facile-et-comprehensible",
      text:
        "Exemple de publication:Le Code BFC ( DIRECCTE Bourgogne Franche Comté, màj: fév. 2017), "
    }
  ];

  // Contrat de travail / Rupture de contrat à durée Indéterminée (CDI) / Rupture conventionnelle (individuelle)
  if (theme.id === 1700) {
    links.unshift({
      href:
        "https://www.telerc.travail.gouv.fr/RuptureConventionnellePortailPublic/jsp/site/Portal.jsp",
      text:
        "TELERC: Le service de saisie d'une demande d'homologation de Rupture Conventionnelle "
    });
  }

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

      <Panel title="Voir aussi">
        {/*
      <Block>
        <BlockTitle>
          <Feather.Plus size="20" /> Liens externes
        </BlockTitle>
        <li>
          <a href="#">Liens vers thèmes similaires</a>
        </li>
      </Block>*/}

        <TwoCols>
          <Block style={{ verticalAlign: "top" }}>
            <BlockTitle>
              <Feather.Phone size="20" /> Vos interlocuteurs
            </BlockTitle>
            <li>
              <ServiceRenseignementModal />
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.ast67.org/"
              >
                Médecine du travail <Feather.ExternalLink size="12" />
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.defenseurdesdroits.fr/office"
              >
                Défenseur des droits <Feather.ExternalLink size="12" />
              </a>
            </li>
          </Block>

          <Block style={{ verticalAlign: "top" }}>
            <BlockTitle>
              <Feather.Link size="20" /> Liens et outils
            </BlockTitle>
            {links.map(link => (
              <li key={link.href}>
                <a target="_blank" rel="noopener noreferrer" href={link.href}>
                  {link.text} <Feather.ExternalLink size="12" />
                </a>
              </li>
            ))}
          </Block>
        </TwoCols>
      </Panel>
      <Panel title="Aidez-nous à nous améliorer">
        <FeedbackForm theme={theme} />
      </Panel>
    </div>
  );
};
export default Result;
