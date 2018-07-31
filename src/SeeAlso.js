import React from "react";
import * as Feather from "react-feather";
import styled from "styled-components";

import ConventionModal from "./ConventionModal";
import Panel from "./Panel";
import ServiceRenseignementModal from "./ServiceRenseignementModal";


const Container = styled.div`
  margin: 10px 0;
`;

const Block = styled.div`
  text-align: left;
  li {
    margin: 10px 0;
    &:last-child {
      margin-bottom: 0;
    }
  }
  svg {
    vertical-align: text-top;
  }
`;

const BlockTitle = styled.div`
  svg {
    vertical-align: bottom;
  }
  font-size: 1.2em;
  padding-bottom: 10px;
  border-bottom: 2px solid;
`;

const TwoCols = styled.div`
  width: 100%;
  > div {
    box-sizing: border-box;
    display: inline-block;
    margin: 10px;
    vertical-align: top;
    width: calc(50% - 20px);
  }
`;

const SeeAlso = (theme) => {

  let links = [
    {
      href: "https://socialgouv.github.io/faq-code-du-travail/",
      text: "Question-Réponse des services de renseignement"
    },
    {
      href:
        "http://bourgogne-franche-comte.direccte.gouv.fr/Le-code-BFC-Bienveillant-facile-et-comprehensible",
      text:
        "Le Code BFC (Bourgogne Franche Comté: fév 2017)"
    }
  ];

  // Contrat de travail / Rupture de contrat à durée Indéterminée (CDI) / Rupture conventionnelle (individuelle)
  if (theme && theme.id === 1700) {
    links.unshift({
      href:
        "https://www.telerc.travail.gouv.fr/RuptureConventionnellePortailPublic/jsp/site/Portal.jsp",
      text:
        "TELERC: Le service de saisie d'une demande d'homologation de Rupture Conventionnelle "
    });
  }

  return (
    <Container>
      <Panel title="Voir aussi">
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
              <li key={link.href}>
                <a target="_blank" rel="noopener noreferrer" href={link.href}>
                  {link.text} <Feather.ExternalLink size="12" />
                </a>
              </li>
            ))}
            <li><ConventionModal /></li>
          </Block>
        </TwoCols>
      </Panel>
    </Container>
  );

};

export default SeeAlso;
