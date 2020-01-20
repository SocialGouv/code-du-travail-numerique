import React from "react";
import styled from "styled-components";
import {
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
import { FocusRoot } from "../src/a11y";

const LegalPage = ({ pageUrl, ogImage }) => {
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
          <FocusRoot>
            <PageTitle>Mentions légales</PageTitle>
          </FocusRoot>
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
            <Title shift={spacings.larger}>Directeur de la publication</Title>
            <p>Yves Struillou, Directeur Général du Travail</p>
            <Title shift={spacings.larger}>Hébergement</Title>
            <p>
              Ce site est hébergé par Microsoft Azure France (région France
              centre)&nbsp;:
            </p>
            <Address>
              Microsoft France
              <br />
              37 Quai du Président Roosevelt
              <br />
              92130 ISSY-LES-MOULINEAUX
            </Address>
            <StyledWrapper variant="dark">
              Le code du logiciel est libre, et peut donc être vérifié et
              amélioré par toutes et tous à l’adresse suivante:{" "}
              <a href="https://github.com/SocialGouv/code-du-travail-numerique">
                https://github.com/SocialGouv/code-du-travail-numerique
              </a>
              .
            </StyledWrapper>
            <Title shift={spacings.larger}>Accessibilité</Title>
            <p>
              La conformité aux normes d’accessibilité numérique est un objectif
              ultérieur mais nous tâchons de rendre dès la conception, ce site
              accessible à toutes et à tous.
            </p>
            <Heading>Signaler un dysfonctionnement</Heading>
            <p>
              Si vous rencontrez un défaut d’accessibilité vous empêchant
              d’accéder à un contenu ou une fonctionnalité du site,{" "}
              <a
                title="Envoyer un mail à codedutravailnumerique@travail.gouv.fr"
                href="mailto:codedutravailnumerique@travail.gouv.fr"
              >
                merci de nous en faire part.
              </a>
            </p>
            <p>
              Si vous n’obtenez pas de réponse rapide de notre part, vous êtes
              en droit de faire parvenir vos doléances ou une demande de saisine
              au Défenseur des droits.
            </p>
            <Heading>En savoir plus</Heading>
            <p>
              Pour en savoir plus sur la politique d’accessibilité numérique de
              l’État :{" "}
              <a href="http://references.modernisation.gouv.fr/accessibilite-numerique">
                http://references.modernisation.gouv.fr/accessibilite-numerique
              </a>
            </p>
            <Title shift={spacings.larger}>Sécurité</Title>
            <p>
              Le site est protégé par un certificat électronique, matérialisé
              pour la grande majorité des navigateurs par un cadenas. Cette
              protection participe à la confidentialité des échanges.
            </p>
          </Wrapper>
        </Container>
      </Section>
    </Layout>
  );
};

export default LegalPage;

const { spacings } = theme;

const Address = styled.address`
  display: block;
  margin: ${spacings.medium} 0;
`;

const StyledWrapper = styled(Wrapper)`
  margin-bottom: ${spacings.medium};
`;
