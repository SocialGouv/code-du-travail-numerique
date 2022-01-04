import {
  Container,
  PageTitle,
  Section,
  Table,
  theme,
  Title,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import Metas from "../src/common/Metas";
import { Layout } from "../src/layout/Layout";

const { spacings } = theme;

const CookiePolicy = (): JSX.Element => (
  <Layout>
    <Metas
      title="Politique de confidentialité"
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
            public telle que présentée dans la page{" "}
            <Link href="/a-propos">
              <a>à propos.</a>
            </Link>
          </p>
          <p>
            Nous nous engageons à ne jamais céder ces informations à des tiers.
          </p>
          <p>
            Vous avez un droit d’accès, de rectification et de suppression de
            vos données. Pour l’exercer, faites-nous parvenir une demande en
            précisant la date et l’heure précise de la requête et tout élément
            permettant d’attester que vous êtes bien l’auteur du message - ces
            éléments sont indispensables pour nous permettre de retrouver votre
            recherche - par voie électronique à l’adresse suivante&nbsp;:{" "}
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
          <Title id="hebergement" shift={spacings.larger}>
            Hébergement
          </Title>
          <Table>
            <thead>
              <tr>
                <th>Partenaire</th>
                <th>Pays destinataire</th>
                <th>Traitement réalisé</th>
                <th>Garantie</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Microsoft Azure</td>
                <td>France</td>
                <td>Hébergement</td>
                <td>
                  <a
                    title="Déclaration de confidentialité Microsoft"
                    target="_blank"
                    rel="nofollow, noopener, noreferrer"
                    href="https://privacy.microsoft.com/fr-fr/privacystatement"
                  >
                    Déclaration de confidentialité Microsoft
                  </a>
                </td>
              </tr>
            </tbody>
          </Table>
          <Title id="cookie" shift={spacings.larger}>
            Cookies
          </Title>
          <p>
            Un cookie est un fichier déposé sur votre terminal lors de la visite
            d’un site. Il a pour but de collecter des informations relatives à
            votre navigation et de vous adresser des services adaptés à votre
            terminal (ordinateur, mobile ou tablette).
          </p>
          <p>
            Nous collectons donc des données par l’intermédiaire de dispositifs
            appelés “cookies” permettant d’établir des mesures statistiques.
          </p>
          <Table>
            <thead>
              <tr>
                <th>Catégorie de cookie</th>
                <th>Nom du cookie</th>
                <th>Délai de conservation</th>
                <th>Finalités</th>
                <th>Éditeur</th>
                <th>Destination</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mesure d’audience anonymisée</td>
                <td>Matomo</td>
                <td>13 mois</td>
                <td>Mesure d’audience</td>
                <td>Matomo & Fabrique numérique</td>
                <td>France</td>
              </tr>
              <tr>
                <td>Mesure d’audience anonymisée</td>
                <td>AT Internet</td>
                <td>13 mois</td>
                <td>Mesure d’audience et analyse comportementale</td>
                <td>AT Internet</td>
                <td>France</td>
              </tr>
            </tbody>
          </Table>
          <p>
            L’accès aux informations contenues dans les cookies est limité aux
            seules personnes autorisées au sein de la Fabrique numérique. En
            outre, l’éditeur peut utiliser certaines données pour des finalités
            qui lui sont propres.
          </p>
          <p>
            À tout moment, vous pouvez refuser l’utilisation des cookies et
            désactiver le dépôt sur votre ordinateur en utilisant la fonction
            dédiée de votre navigateur (fonction disponible notamment sur
            Microsoft Internet Explorer 11, Google Chrome, Mozilla Firefox,
            Apple Safari et Opera).
          </p>
          <p>
            Pour l’outil Matomo, vous pouvez décider de ne jamais être suivi, y
            compris anonymement&nbsp;:
          </p>
          <iframe
            title="matomo optout"
            style={{ border: 0, width: "100%" }}
            src="https://matomo.fabrique.social.gouv.fr/index.php?module=CoreAdminHome&action=optOut&language=fr&backgroundColor=&fontColor=2f3b6c&fontSize=16px&fontFamily=sans-serif"
          />
          <p>
            Pour aller plus loin, vous pouvez consulter les fiches proposées par
            la Commission Nationale de l’Informatique et des Libertés
            (CNIL)&nbsp;:
          </p>
          <ul>
            <li>
              <a
                title="Déclaration de confidentialité Microsoft"
                target="_blank"
                rel="nofollow, noopener, noreferrer"
                href="https://www.cnil.fr/fr/cookies-traceurs-que-dit-la-loi"
              >
                Cookies et traceurs : que dit la loi ?
              </a>
            </li>
            <li>
              <a
                title="Déclaration de confidentialité Microsoft"
                target="_blank"
                rel="nofollow, noopener, noreferrer"
                href="https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser"
              >
                Cookies : les outils pour les maîtriser
              </a>
            </li>
          </ul>
        </Wrapper>
      </Container>
    </Section>
  </Layout>
);
export default CookiePolicy;

const Address = styled.address`
  display: block;
  margin: ${spacings.medium} 0;
`;
