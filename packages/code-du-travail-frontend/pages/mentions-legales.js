import React from "react";
import styled from "styled-components";
import {
  Accordion,
  Alert,
  Container,
  List,
  ListItem,
  Section,
  SrOnly,
  theme,
  Wrapper
} from "@cdt/ui";

import { PageLayout } from "../src/layout/PageLayout";
import { Metas } from "../src/common/Metas";

const SearchPage = ({ pageUrl, ogImage }) => {
  const accordionItems = [];

  accordionItems.push({
    title: <AccordionItem>Modalités d’utilisation</AccordionItem>,
    body: (
      <>
        <SrOnly>
          <h1>Modalités d’utilisation</h1>
        </SrOnly>
        <h2>Traitement des données à caractère personnel</h2>
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
            href="mailto:codedutravail@beta.gouv.fr"
            target="_blank"
            rel="noopener noreferrer"
          >
            codedutravail@beta.gouv.fr
          </a>{" "}
          ou par voie postale :
          <Address>
            Direction des systèmes d’information
            <br />
            Ministère des affaires sociales et de la santé
            <br />
            39-43 Quai André Citroën
            <br />
            75015 PARIS
          </Address>
        </p>
        <h2>Utilisation de témoins de connexion (« cookies »)</h2>
        <p>
          Nous collectons également des données par l’intermédiaire de
          dispositifs appelés “cookies” permettant d’établir des mesures
          statistiques de fréquentation et d’utilisation du site pouvant être
          utilisées à des fins de suivi et d’amélioration du service :
          <StyledList>
            <ListItem>
              Les données collectées ne sont pas recoupées avec d’autres
              traitements.
            </ListItem>
            <ListItem>
              Le cookie déposé sert uniquement à la production de statistiques
              anonymes.
            </ListItem>
            <ListItem>
              Le cookie ne permet pas de suivre la navigation de l’internaute
              sur d’autres sites.
            </ListItem>
          </StyledList>
        </p>
        <p>
          La mesure d’audience (nombre de visites, pages consultées) est
          réalisée par un outil libre intitulé Matomo spécifiquement paramétré,
          respectant les conditions d’exemption du consentement de l’internaute
          définies par la recommandation « Cookies » de la Commission nationale
          informatique et libertés (CNIL).
        </p>
        <p>
          Pour la période de construction, ce site utilise l’outil Hotjar,
          notamment pour obtenir les retours écrits des utilisateurs concernant
          la pertinence des résultats proposés dans le cadre de leurs
          recherches. Hotjar utilise des cookies et d’autres technologies pour
          collecter des informations sur l’équipement et les comportements des
          visiteurs. Cet outil stocke ces informations dans un profil
          utilisateur pseudonymisé. Ni Hotjar ni l’éditeur n’utiliseront ces
          informations pour identifier des utilisateurs individuels ou pour les
          associer à d’autres données. Vous pouvez consulter la politique de
          confidentialité de{" "}
          <a href="https://www.hotjar.com/legal/policies/privacy">Hotjar</a> .
          Ces données ne seront jamais cédées. La durée de conservation de ces
          informations ne saurait dépasser deux ans.
        </p>
        <p>
          Vous pouvez librement désactiver ce service, sur l’ensemble des sites
          internet susceptibles de l’utiliser en suivant la procédure présentée{" "}
          <a href="https://www.hotjar.com/legal/compliance/opt-out">
            ici: https://www.hotjar.com/legal/compliance/opt-out
          </a>
          .
        </p>
        <p>
          Le site utilise également la solution{" "}
          <a href="https://polyfill.io/v3/">Polyfill.io</a>, ce service permet
          de faire fonctionner l’ensemble des fonctionnalités du code du travail
          numérique sur tous les navigateurs, quelless que soient leurs
          générations.
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
    title: <AccordionItem>Accessibilité</AccordionItem>,
    body: (
      <>
        <SrOnly>
          <h1>Accessibilité</h1>
        </SrOnly>
        <p>
          La conformité aux normes d’accessibilité numérique est un objectif
          ultérieur mais nous tâchons de rendre dès la conception, ce site
          accessible à toutes et à tous.
        </p>
        <h2>Signaler un dysfonctionnement</h2>
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
        <h2>En savoir plus</h2>
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
    title: <AccordionItem>Sécurité</AccordionItem>,
    body: (
      <>
        <SrOnly>
          <h1>Sécurité</h1>
        </SrOnly>
        <p>
          Le site est protégé par un certificat électronique, matérialisé pour
          la grande majorité des navigateurs par un cadenas. Cette protection
          participe à la confidentialité des échanges.
        </p>
      </>
    )
  });

  accordionItems.push({
    title: <AccordionItem>Mentions légales</AccordionItem>,
    body: (
      <>
        <SrOnly>
          <h1>Mentions légales</h1>
        </SrOnly>
        <p>
          Le site est édité par l’
          <a href="https://incubateur.social.gouv.fr/">
            Incubateur des ministères sociaux
          </a>{" "}
          situé :
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
        </p>
        <h2>Directeur de la publication</h2>
        <p>Hélène BRISSET</p>
        <h2>Hébergement</h2>
        <p>
          Ce site est hébergé en propre par le Ministère des Affaires sociales
          et de la Santé :
          <Address>
            Ministère des affaires sociales et de la santé
            <br />
            14 avenue Duquesne
            <br />
            75530 PARIS
          </Address>
        </p>
      </>
    )
  });

  return (
    <PageLayout>
      <Metas
        url={pageUrl}
        title="Mentions légales - Code du travail numérique"
        description="Mentions légales du Code du travail numérique"
        image={ogImage}
      />

      <Section>
        <Container narrow>
          <Wrapper variant="light">
            <Alert variant="warning">
              Ce site est en cours de construction, la fiabilité des réponses
              qui s’y trouvent ne sont pas garanties. L’ouverture officielle du
              site est prévue pour 2020.
            </Alert>
            <Alert variant="info">
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
            <Accordion items={accordionItems} />
          </Wrapper>
        </Container>
      </Section>
    </PageLayout>
  );
};

export default SearchPage;

const { colors, fonts, spacing } = theme;

const AccordionItem = styled.div`
  padding: ${spacing.small};
  font-size: ${fonts.sizeH1};
  color: ${colors.title};
`;

const Address = styled.address`
  display: block;
  margin-top: ${spacing.interComponent};
`;

const StyledList = styled(List)`
  margin: ${spacing.medium} 0;
  padding-left: ${spacing.medium};
  list-style-type: disc;
`;
