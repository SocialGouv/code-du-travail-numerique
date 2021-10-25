import {
  Button,
  Container,
  PageTitle,
  Section,
  theme,
  Title,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React, { useCallback } from "react";
import styled from "styled-components";

import Metas from "../src/common/Metas";
import { Layout } from "../src/layout/Layout";

const { spacings } = theme;

const CookiePolicy = () => {
  const openTarteAuCitron = useCallback(() => {
    if (window && window.tarteaucitron) {
      window.tarteaucitron.userInterface.openPanel();
    }
  }, []);
  return (
    <Layout>
      <Metas
        title="Politique de confidentialité - Code du travail numérique"
        description="Politique de confidentialité du Code du travail numérique"
      />
      <Section>
        <Container narrow>
          <PageTitle>Politique de confidentialité</PageTitle>
          <Wrapper variant="main">
            <Title shift={spacings.larger}>
              Traitement des données à caractère personnel
            </Title>
            <p>
              Le Code du travail numérique ne vous demande ni ne stocke
              d’information nominative.
            </p>
            <p>
              Pour autant, nous enregistrons les informations saisies dans la
              barre de recherche. Elles sont conservées pendant deux années pour
              analyser les usages, améliorer la précision des réponses apportées
              et améliorer le service et ainsi réaliser la mission d’intérêt
              public,(qui est la base légale du traitement), telle que présentée
              dans la page{" "}
              <Link href="/a-propos">
                <a>à propos.</a>
              </Link>
            </p>
            <p>
              Nous nous engageons à ne jamais céder ces informations à des
              tiers.
            </p>
            <p>
              Vous avez un droit d’accès, de rectification et de suppression de
              vos données. Pour l’exercer, faites-nous parvenir une demande en
              précisant la date et l’heure précise de la requête et tout élément
              permettant d’attester que vous êtes bien l’auteur du message - ces
              éléments sont indispensables pour nous permettre de retrouver
              votre recherche - par voie électronique à l’adresse
              suivante&nbsp;:{" "}
              <a
                title="Envoyer un mail à codedutravailnumerique@travail.gouv.fr"
                href="mailto:codedutravailnumerique@travail.gouv.fr"
              >
                codedutravailnumerique@travail.gouv.fr
              </a>
              <br />
              ou par voie postale&nbsp;:
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
            <p>
              Vous disposez des mêmes droits en matière de témoins de connexion.
            </p>
            <p>
              Vous êtes également en droit de saisir la Commission Nationale de
              l’Informatique et des Libertés pour toute réclamation à{" "}
              <a
                title="Adresser une réclamation (plainte) à la CNIL"
                href="https://www.cnil.fr/fr/cnil-direct/question/adresser-une-reclamation-plainte-la-cnil-quelles-conditions-et-comment"
              >
                l’adresse suivante
              </a>
              .
            </p>

            <Title id="cookie" shift={spacings.larger}>
              Utilisation de témoins de connexion («&nbsp;cookies&nbsp;»)
            </Title>
            <p>
              Un cookie est un fichier déposé sur votre terminal lors de la
              visite d’un site. Il a pour but de collecter des informations
              relatives à votre navigation et de vous adresser des services
              adaptés à votre terminal (ordinateur, mobile ou tablette).
            </p>
            <p>
              Nous collectons donc des données par l’intermédiaire de
              dispositifs appelés “cookies” permettant d’établir des mesures
              statistiques.
            </p>
            <p>
              Ces cookies permettent au Code du travail numérique d’établir des
              mesures statistiques de fréquentation et d’utilisation du site.
              Pour ce faire, nous utilisons les services proposés par la suite{" "}
              <a
                title="Les paramètres de confidentialité dans Google Analytics"
                href="https://support.google.com/analytics/answer/9019185?hl=fr&ref_topic=2919631"
              >
                Google Analytics
              </a>{" "}
              et Matomo.
            </p>
            <p>Il convient d’indiquer que&nbsp;:</p>
            <ul>
              <li>
                Les données collectées ne sont pas recoupées avec d’autres
                traitements.
              </li>
              <li>
                Les cookies ne permettent pas de suivre la navigation de
                l’internaute sur d’autres sites.
              </li>
              <li>
                Les cookies sont inactifs avant que vous ayez exprimé votre
                consentement en cliquant sur le bouton «&nbsp;Ok, tout
                accepter&nbsp; » ou après que vous ayez pris le soin de
                personnaliser vos préférences.
              </li>
            </ul>
            <p>
              <Button onClick={openTarteAuCitron}>Modifier les réglages</Button>
            </p>
            <p>
              À tout moment, vous pouvez refuser l’utilisation des cookies et
              désactiver le dépôt sur votre ordinateur en utilisant la fonction
              dédiée de votre navigateur (fonction disponible notamment sur
              Microsoft Internet Explorer 11, Google Chrome, Mozilla Firefox,
              Apple Safari et Opera).
            </p>
            <p>
              Pour l&apos;outil Matomo, vous pouvez décider de ne jamais être
              suivi, y compris anonymement&nbsp;:
            </p>
            <iframe
              title="matomo optout"
              style={{ border: 0, width: "100%" }}
              src="https://matomo.fabrique.social.gouv.fr/index.php?module=CoreAdminHome&action=optOut&language=fr&backgroundColor=&fontColor=2f3b6c&fontSize=16px&fontFamily=sans-serif"
            />
            <p>
              Pour aller plus loin, vous pouvez consulter les fiches proposées
              par la Commission Nationale de l’Informatique et des Libertés
              (CNIL)&nbsp;:
            </p>
            <ul>
              <li>
                <a href="https://www.cnil.fr/fr/cookies-traceurs-que-dit-la-loi">
                  Cookies et traceurs&nbsp;: que dit la loi&nbsp;?
                </a>
              </li>
              <li>
                <a href="https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser">
                  Cookies&nbsp;: les outils pour les maîtriser
                </a>
              </li>
            </ul>
          </Wrapper>
        </Container>
      </Section>
    </Layout>
  );
};
export default CookiePolicy;

const Address = styled.address`
  display: block;
  margin: ${spacings.medium} 0;
`;
