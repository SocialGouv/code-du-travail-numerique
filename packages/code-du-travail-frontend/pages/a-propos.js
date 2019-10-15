import React from "react";
import styled from "styled-components";
import {
  Alert,
  Container,
  Section,
  theme,
  Wrapper
} from "@socialgouv/react-ui";
import { Layout } from "../src/layout/Layout";
import Metas from "../src/common/Metas";

const About = ({ ogImage, pageUrl }) => (
  <Layout>
    <Metas
      url={pageUrl}
      title="À propos - Code du travail numérique"
      description="Service public gratuit pour faciliter l'accès au droit du travail. Obtenez une réponse détaillée à vos questions."
      image={ogImage}
    />
    <Section>
      <Container narrow>
        <Wrapper variant="light">
          <h1>À propos du code du travail numérique</h1>
          <Alert variant="info">
            Ce service public vous permet d’obtenir des réponses détaillées à
            des questions de droit de travail, ainsi que des fiches explicatives
            et les articles de loi correspondants.
            <P>
              <a
                href="https://www.legifrance.gouv.fr/affichTexteArticle.do;jsessionid=AE9DCF75DDCF0465784CEE0E7D62729F.tplgfr37s_2?idArticle=JORFARTI000035607420&cidTexte=JORFTEXT000035607388&dateTexte=29990101&categorieLien=id"
                title="lien vers l’ordonnance relative à la création du Code du travail numérique"
              >
                L’ouverture officielle du site est prévue pour 2020.
              </a>
            </P>
          </Alert>
          <p>
            Seul un public expert maitrîse la complexité du droit du travail et
            de ses différentes sources de droit (conventions collectives,
            accords de branches et accords d’entreprises…). En plus de la
            diversité des sources de droit, la technicité de la matière la rend
            peu accessible pour les concernés : les employeurs et les salariés.
          </p>

          <p>
            Or tous les actifs sont impactés tous les jours par le droit qui
            régit leurs relations au travail, qui, mal compris, mal appliqué,
            peut avoir des conséquences importantes pour le salarié comme pour
            l’employeur.
          </p>

          <p>
            Les services de renseignement en droit du travail (dans les
            DIRECCTE) répondent à plus de 900 000 demandes par an concernant le
            droit du travail, des questions les plus simples aux cas les plus
            complexes.
          </p>

          <p>
            L’objectif du code du travail numérique est d’améliorer la
            lisibilité du droit pour ceux qu’il concerne.
          </p>

          <p>
            Construit avec les utilisateurs (employeurs et salariés) et les
            experts du terrain (inspecteur du travail services d’inspection du
            travail et de renseignements en droit du travail notamment), le
            service répondra aux questions que se posent les employeurs,
            notamment de TPE PME, quant aux règles applicables à leur situation,
            ainsi qu’à celles que se posent les salariés
          </p>

          <p>
            Pour rendre le droit accessible et compréhensible, nous devons
            construire un modèle exécutable qui, en fonction de la situation
            d’une entreprise ou d’un salarié, sera capable de servir les droits
            et les obligations associées aux différentes thématiques comme la
            durée du travail, la rémunération, le contrat de travail
            (l’embauche, son exécution, sa rupture) ou la maladie par exemple.
            L’enjeu est donc d’identifier la source de droit applicable à des
            situations spécifiques et de donner une réponse claire sur les
            dispositions propres à la situation de l’utilisateur.
          </p>
        </Wrapper>
      </Container>
    </Section>
  </Layout>
);
export default About;

const { spacing } = theme;

const P = styled.p`
  margin-top: ${spacing.interComponent};
`;
