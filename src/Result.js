import React from "react";
import * as Feather from "react-feather";
import styled from "styled-components";

import Articles from "./Articles";
import Articulation from "./Articulation";
import ConventionPicker from "./ConventionPicker";
import FAQ, { hasFaq } from "./FAQ";
import FeedbackForm from "./FeedbackForm";
import Fiches, { hasFiche } from "./Fiches";
import ServiceRenseignementModal from "./ServiceRenseignementModal";

// page de résultats

const Block = styled.div`
  padding: 10px;
  background: ${props => props.theme.light3};
  border-radius: 2px;
  vertical-align: top;
  margin: 1em 10px;
  font-size: 0.9em;
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
            <SectionSeparator>F.A.Q. et fiches</SectionSeparator>

            {hasFaqEntry && (
              <Block>
                <BlockTitle>
                  <Feather.HelpCircle size="20" /> F.A.Q. Code du travail
                </BlockTitle>
                <FAQ theme={theme} />
              </Block>
            )}

            {hasFicheEntry && (
              <Block>
                <BlockTitle>
                  <Feather.FileText size="20" /> Fiches pratiques
                </BlockTitle>
                <Fiches theme={theme} />
              </Block>
            )}
          </React.Fragment>
        )}

      <SectionSeparator>Textes officiels</SectionSeparator>

      <Block>
        <BlockTitle>
          <Feather.AlertTriangle size="20" /> Textes applicables
        </BlockTitle>
        <Articulation theme={theme} />
        {/*Attention, dans votre entreprise va s'appliquer également des
        conventions et accords de branche ou d'entreprise.*/}
      </Block>

      {/*<Block>
        <BlockTitle>
          <Feather.Paperclip size="20" /> Textes conventionnels
        </BlockTitle>
        Trouvez votre convention collective :
        <br />
        <br />
        <ConventionPicker />
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.legifrance.gouv.fr/initRechAccordsEntreprise.do"
          >
            Trouver votre accord d'entreprise <Feather.Search size="12" />
          </a>
        </li>
      </Block>*/}

      {theme.articles &&
        theme.articles.length && (
          <Block>
            <BlockTitle>
              <Feather.Book size="20" /> Code du Travail Articles
            </BlockTitle>
            <Articles theme={theme} />
          </Block>
        )}

      <SectionSeparator>Voir aussi</SectionSeparator>

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
        <Block>
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

        <Block>
          <BlockTitle>
            <Feather.Link size="20" /> Liens et outils
          </BlockTitle>
          {links.map(link => (
            <li key={link}>
              <a target="_blank" rel="noopener noreferrer" href={link.href}>
                {link.text} <Feather.ExternalLink size="12" />
              </a>
            </li>
          ))}
        </Block>
      </TwoCols>

      <Block>
        <BlockTitle>
          <Feather.ThumbsUp size="20" /> Aidez-nous à nous améliorer
        </BlockTitle>
        <FeedbackForm theme={theme} />
      </Block>
    </div>
  );
};
export default Result;
