import {
  Container,
  PageTitle,
  Section,
  theme,
  Title,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import React from "react";

import { A11yLink } from "../src/common/A11yLink";
import Metas from "../src/common/Metas";
import { Layout } from "../src/layout/Layout";

const Accessibilite = () => (
  <Layout>
    <Metas
      title="Accessibilité - Code du travail numérique"
      description="Accessibilité du site du Code du travail numérique"
    />
    <Section>
      <Container narrow>
        <PageTitle>Accessibilité</PageTitle>
        <Wrapper variant="main">
          <Title shift={theme.spacings.larger}>
            Déclaration d’accessibilité
          </Title>
          <p>
            Le Ministère du travail, de l’emploi et de l’insertion s’engage à
            rendre son service accessible conformément à l’article 47 de la loi
            n° 2005-102 du 11 février 2005.
          </p>
          <p>
            À cette fin, il met en œuvre la stratégie et l’action suivante :
            réalisation d’un audit de conformité au milieu de l’année 2021.
          </p>
          <p>
            Cette déclaration d’accessibilité s’applique au site Internet
            code.travail.gouv.fr.
          </p>
          <Title shift={theme.spacings.larger}>État de conformité</Title>
          <p>
            Le site Internet code.travail.gouv.fr n’est pas encore en conformité
            avec le référentiel général d’amélioration de l’accessibilité
            (RGAA). Le site n’a pas encore été audité.
          </p>
          <p>
            Nous tâchons de rendre dès la conception, ce site accessible à
            toutes et à tous.
          </p>
          <Title shift={theme.spacings.larger}>Résultat des tests</Title>
          <p>
            L’audit de conformité est en attente de réalisation (milieu de
            l’année 2021).
          </p>
          <Title shift={theme.spacings.larger}>
            Établissement de cette déclaration d’accessibilité
          </Title>
          <p>Cette déclaration a été établie le 12 avril 2021.</p>
          <Title shift={theme.spacings.larger}>Amélioration et contact</Title>
          <p>
            Si vous n’arrivez pas à accéder à un contenu ou à un service, vous
            pouvez contacter le responsable du site Internet
            code.travail.gouv.fr pour être orienté vers une alternative
            accessible ou obtenir le contenu sous une autre forme.
          </p>
          <p>
            E-mail :{" "}
            <a
              href="mailto:codedutravailnumérique@travail.gouv.fr"
              title="Envoyer un mail à codedutravailnumerique@travail.gouv.fr"
            >
              codedutravailnumerique@travail.gouv.fr
            </a>
          </p>
          <p>Nous essayons de répondre le plus rapidement possible.</p>
          <Title shift={theme.spacings.larger}>Voies de recours</Title>
          <p>Cette procédure est à utiliser dans le cas suivant.</p>

          <p>
            Vous avez signalé au responsable du site internet un défaut
            d’accessibilité qui vous empêche d’accéder à un contenu ou à un des
            services du portail et vous n’avez pas obtenu de réponse
            satisfaisante.
          </p>

          <p>
            Vous pouvez :
            <ul>
              <li>
                <A11yLink
                  href="https://formulaire.defenseurdesdroits.fr/code/afficher.php?ETAPE=accueil_2016"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Écrire un message au Défenseur des droits
                </A11yLink>
              </li>
              <li>
                <A11yLink
                  href="https://www.defenseurdesdroits.fr/saisir/delegues"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contacter le délégué du Défenseur des droits dans votre région
                </A11yLink>
              </li>
              <li>
                Envoyer un courrier par la poste (gratuit, ne pas mettre de
                timbre) : <br />
                Défenseur des droits <br />
                Libre réponse 71120 <br />
                75342 Paris CEDEX 07
              </li>
            </ul>
          </p>
          <Title shift={theme.spacings.larger}>
            En savoir plus sur l’accessibilité
          </Title>
          <p>
            Pour en savoir plus sur la politique d’accessibilité numérique de
            l’État : <br />
            <A11yLink
              href="http://references.modernisation.gouv.fr/accessibilite-numerique"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://references.modernisation.gouv.fr/accessibilite-numerique
            </A11yLink>
          </p>
        </Wrapper>
      </Container>
    </Section>
  </Layout>
);
export default Accessibilite;
