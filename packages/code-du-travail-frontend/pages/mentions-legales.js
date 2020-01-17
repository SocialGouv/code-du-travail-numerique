import React, { useCallback } from "react";
import styled from "styled-components";
import {
  Accordion,
  Alert,
  Button,
  Container,
  Heading,
  PageTitle,
  Section,
  theme,
  Title,
  Wrapper
} from "@socialgouv/react-ui";

import { Layout } from "../src/layout/Layout";
import Metas from "../src/common/Metas";

const LegalPage = ({ pageUrl, ogImage }) => {
  const accordionItems = [];
  const openTarteAuCitron = useCallback(() => {
    if (window && window.tarteaucitron) {
      window.tarteaucitron.userInterface.openPanel();
    }
  }, []);
  accordionItems.push({
    title: "Modalités d’utilisation",
    id: "modalite",
    as: "h2",
    body: (
      <>
        <Heading>Traitement des données à caractère personnel</Heading>
        <p>
          Le code du travail numérique ne vous demande ni ne stocke
          d’information nominative.
        </p>
        <p>
          Pour autant, nous enregistrons les informations saisies dans la barre
          de recherche. Elles sont conservées pendant deux années pour analyser
          les usages, améliorer la précision des réponses apportées et améliorer
          le service.
        </p>
        <p>
          Nous nous engageons à ne jamais céder ces informations à des tiers.
        </p>
        <p>
          Vous avez un droit d’accès, de rectification et de suppression de vos
          données. Pour l’exercer, faites-nous parvenir une demande en précisant
          la date et l’heure précise de la requête - ces éléments sont
          indispensables pour nous permettre de retrouver votre recherche - par
          voie électronique à l’adresse suivante :{" "}
          <a
            href="mailto:codedutravailnumerique@travail.gouv.fr"
            target="_blank"
            rel="noopener noreferrer"
          >
            codedutravailnumerique@travail.gouv.fr
          </a>{" "}
          ou par voie postale :
        </p>
        <Address>
          Direction des systèmes d’information
          <br />
          Ministère des affaires sociales et de la santé
          <br />
          39-43 Quai André Citroën
          <br />
          75015 PARIS
        </Address>
        <Anchor id="cookies" />
        <Heading>Utilisation de témoins de connexion (« cookies »)</Heading>
        <p>
          Nous collectons également des données par l’intermédiaire de
          dispositifs appelés “cookies” permettant d’établir des mesures
          statistiques de fréquentation et d’utilisation du site pouvant être
          utilisées à des fins de suivi et d’amélioration du service :
        </p>
        <StyledList>
          <li>
            Les données collectées ne sont pas recoupées avec d’autres
            traitements.
          </li>
          <li>
            Le cookie déposé sert uniquement à la production de statistiques
            anonymes.
          </li>
          <li>
            Le cookie ne permet pas de suivre la navigation de l’internaute sur
            d’autres sites.
          </li>
          <p>
            <Button onClick={openTarteAuCitron}>Modifier les réglages</Button>
          </p>
        </StyledList>
        <p>
          La mesure d’audience (nombre de visites, pages consultées) est
          réalisée par un outil libre intitulé Matomo spécifiquement paramétré,
          respectant les conditions d’exemption du consentement de l’internaute
          définies par la recommandation « Cookies » de la Commission nationale
          informatique et libertés (CNIL).
        </p>
        <p>
          À tout moment, vous pouvez refuser l’utilisation des cookies et
          désactiver le dépôt sur votre ordinateur en utilisant la fonction
          dédiée de votre navigateur (fonction disponible notamment sur
          Microsoft Internet Explorer 11, Google Chrome, Mozilla Firefox, Apple
          Safari et Opera).
        </p>
        <p>
          L’ensemble de ces informations sont nécessaires à la mise en oeuvre de
          ce service public numérique.
        </p>
      </>
    )
  });

  accordionItems.push({
    title: "Accessibilité",
    id: "accessibilite",
    as: "h2",
    body: (
      <>
        <p>
          La conformité aux normes d’accessibilité numérique est un objectif
          ultérieur mais nous tâchons de rendre dès la conception, ce site
          accessible à toutes et à tous.
        </p>
        <Heading>Signaler un dysfonctionnement</Heading>
        <p>
          Si vous rencontrez un défaut d’accessibilité vous empêchant d’accéder
          à un contenu ou une fonctionnalité du site, merci de nous en faire
          part.
        </p>
        <p>
          Si vous n’obtenez pas de réponse rapide de notre part, vous êtes en
          droit de faire parvenir vos doléances ou une demande de saisine au
          Défenseur des droits.
        </p>
        <Heading>En savoir plus</Heading>
        <p>
          Pour en savoir plus sur la politique d’accessibilité numérique de
          l’État :{" "}
          <a href="http://references.modernisation.gouv.fr/accessibilite-numerique">
            http://references.modernisation.gouv.fr/accessibilite-numerique
          </a>
        </p>
      </>
    )
  });

  accordionItems.push({
    title: "Sécurité",
    id: "securite",
    as: "h2",
    body: (
      <>
        <p>
          Le site est protégé par un certificat électronique, matérialisé pour
          la grande majorité des navigateurs par un cadenas. Cette protection
          participe à la confidentialité des échanges.
        </p>
      </>
    )
  });

  return (
    <Layout>
      <Metas
        url={pageUrl}
        title="Mentions légales - Code du travail numérique"
        description="Mentions légales du Code du travail numérique"
        image={ogImage}
      />

      <Section>
        <Container narrow>
          <PageTitle>Mentions légales</PageTitle>
          <Wrapper variant="main">
            <p>
              Le site est édité par l’
              <a href="https://incubateur.social.gouv.fr/">
                Incubateur des ministères sociaux
              </a>{" "}
              situé :
            </p>
            <Address>
              Tour Mirabeau
              <br />
              39-43 Quai André Citroën
              <br />
              75015 PARIS
              <br />
              <br />
              Tél. : 01 40 56 60 00
            </Address>
            <Title>Directeur de la publication</Title>
            <p>Yves Struillou, Directeur Général du Travail</p>
            <Title>Hébergement</Title>
            <p>
              Ce site est hébergé en propre par le Ministère des Affaires
              sociales et de la Santé :
            </p>
            <Address>
              Ministère des affaires sociales et de la santé
              <br />
              14 avenue Duquesne
              <br />
              75530 PARIS
            </Address>
            <Alert>
              <p>
                Le{" "}
                <a href="https://github.com/SocialGouv/code-du-travail-numerique">
                  code du logiciel
                </a>{" "}
                est libre, et peut donc être vérifié et amélioré par toutes et
                tous à l’adresse suivante:{" "}
                <a href="https://github.com/SocialGouv/code-du-travail-numerique">
                  https://github.com/SocialGouv/code-du-travail-numerique
                </a>
                .
              </p>
            </Alert>
            <Accordion
              items={accordionItems}
              preExpanded={["modalite", "securite", "accessibilite"]}
            />
          </Wrapper>
        </Container>
      </Section>
    </Layout>
  );
};

export default LegalPage;

const { breakpoints, spacings } = theme;

const Address = styled.address`
  display: block;
  margin: ${spacings.medium} 0;
`;
const Anchor = styled.a`
  position: relative;
  top: -9rem;
  display: block;
  visibility: hidden;
  @media (max-width: ${breakpoints.mobile}) {
    height: -5rem;
  }
`;
const StyledList = styled.ul`
  margin: ${spacings.medium} 0;
  padding-left: ${spacings.medium};
  list-style-type: disc;
`;
