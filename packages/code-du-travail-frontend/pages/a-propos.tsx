import {
  Container,
  Heading,
  PageTitle,
  Section,
  theme,
  Title,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";

import Metas from "../src/common/Metas";
import { Layout } from "../src/layout/Layout";

const About = () => {
  return (
    <Layout>
      <Metas
        title="À propos"
        description="Service public gratuit pour faciliter l'accès au droit du travail. Obtenez une réponse détaillée à vos questions."
      />
      <Section>
        <Container narrow>
          <PageTitle subtitle="Apprenez-en plus sur notre histoire, notre équipe et nos méthodes">
            À propos
          </PageTitle>
          <Wrapper variant="main">
            <Title shift={theme.spacings.larger}>
              Qu’est-ce que le Code du travail numérique&nbsp;?
            </Title>
            <p>
              Le Code du travail numérique est un service public en ligne et
              gratuit vous permettant d’obtenir des réponses personnalisées sur
              le droit de travail.
            </p>
            <p>
              L’ouverture officielle du site a eu lieu le 1<sup>er</sup> janvier
              2020.
            </p>
            <Heading>Pourquoi le Code du travail numérique&nbsp;?</Heading>
            <p>
              Aujourd’hui, seul un public expert maîtrise la complexité du droit
              du travail et de ses différentes sources (code du travail,
              conventions collectives, accords d’entreprises, etc.). La
              technicité du sujet le rend également peu accessible pour les
              salariés et les employeurs. Or, le droit est d’autant plus
              facilement appliqué et respecté qu’il est connu et compris.
            </p>
            <p>
              La décision de créer le Code du travail numérique a donc été prise
              et inscrite dans{" "}
              <a
                title="voir l'ordonnance du Code du travail numérique"
                href="https://www.legifrance.gouv.fr/affichTexteArticle.do;jsessionid=F175675A5AF37BD5745391E7C64C2FAB.tplgfr41s_3?cidTexte=JORFTEXT000035607388&idArticle=LEGIARTI000036762196&dateTexte=20191129&categorieLien=id#LEGIARTI000036762196"
              >
                les ordonnances sur le renforcement du dialogue social de 2017.
              </a>
            </p>
            <Heading>À qui ce service s’adresse-t-il&nbsp;?</Heading>
            <p>
              Le Code du travail numérique s’adresse à tous les salariés et
              employeurs de droit privé relevant du code du travail. Les
              fonctionnaires et les indépendants ne sont par exemple pas
              concernés. Plus d’informations à ce sujet dans notre{" "}
              <Link href="/droit-du-travail">
                <a title="Qu'est ce que le droit du travail ?">
                  page d’introduction au droit du travail.
                </a>
              </Link>
            </p>
            <Heading>Que peut-on trouver sur le site&nbsp;?</Heading>
            <p>
              Le Code du travail numérique rassemble différents contenus sur le
              droit du travail ainsi que des réponses personnalisées selon votre
              situation.
            </p>
            <p>Plus précisément, vous retrouverez sur le site&nbsp;:</p>
            <ul>
              <li>
                des réponses génériques sur le droit du travail dans un langage
                accessible&nbsp;;
              </li>
              <li>
                des réponses personnalisées selon votre convention
                collective&nbsp;;
              </li>
              <li>
                des simulateurs permettant d’estimer des durées de préavis, des
                montants d’indemnités…&nbsp;;
              </li>
              <li>des modèles de courrier.</li>
            </ul>
            <Title shift={theme.spacings.larger}>Qui sommes-nous&nbsp;?</Title>
            <Heading>Notre équipe</Heading>
            <p>
              Nous sommes une équipe pluridisciplinaire d’une dizaine de
              personnes composée de développeurs web, designers d’interface et
              d’expérience, juristes, inspecteurs du travail, spécialistes de la
              donnée… L’ensemble des agents du ministère du Travail contribue
              également au produit en rédigeant des contenus et en assurant la
              validité juridique des réponses.
            </p>
            <p>
              Le Code du travail numérique est un service public initié par{" "}
              <a
                title="le site du ministère du travail"
                href="https://travail-emploi.gouv.fr/"
              >
                le ministère du Travail
              </a>
              , conçu et développé au sein de{" "}
              <a
                title="le site de la fabrique des Ministères sociaux"
                href="https://fabrique.social.gouv.fr/"
              >
                la fabrique des Ministères sociaux
              </a>{" "}
              en partenariat avec la communauté{" "}
              <a title="le site beta.gouv" href="https://beta.gouv.fr/">
                beta.gouv.fr
              </a>
              .
            </p>
            <Heading>Nos méthodes</Heading>
            <p>
              Le service est développé en lien étroit avec les utilisateurs
              (employeurs et salariés) et les praticiens du droit du travail
              (services du ministère du Travail en région, conseillers du
              salarié, maisons d’accès au droit, professeurs en droit du
              travail...).
            </p>
            <p>
              Le site sur lequel vous naviguez est en évolution continue et
              s’enrichit régulièrement de nouveaux contenus et de nouvelles
              fonctionnalités. Nous vous invitons à{" "}
              <a
                title="contactez nous par courriel"
                href="mailto:codedutravailnumerique@travail.gouv.fr"
              >
                nous contacter
              </a>{" "}
              si vous souhaitez nous faire part d’une proposition
              d’amélioration&nbsp;!
            </p>
          </Wrapper>
        </Container>
      </Section>
    </Layout>
  );
};
export default About;
