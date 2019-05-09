import React from "react";
import styled from "styled-components";
import Head from "next/head";
import { Container, Section, Alert } from "@cdt/ui";
import { PageLayout } from "../src/layout/PageLayout";

const About = () => (
  <PageLayout>
    <Head>
      <meta
        name="description"
        content="Service public gratuit pour faciliter l'accès au droit du travail. Obtenez une réponse détaillée à vos questions."
      />
    </Head>
    <Container>
      <Section light>
        <div>
          <h1>À propos du code du travail numérique</h1>
          <Alert info>
            Ce service public vous permet d&apos;obtenir des réponses détaillées
            à des questions de droit de travail, ainsi que des fiches
            explicatives et les articles de loi correspondants.
            <P>
              <a
                href="https://www.legifrance.gouv.fr/affichTexteArticle.do;jsessionid=AE9DCF75DDCF0465784CEE0E7D62729F.tplgfr37s_2?idArticle=JORFARTI000035607420&cidTexte=JORFTEXT000035607388&dateTexte=29990101&categorieLien=id"
                title="lien vers l’ordonnance relative à la création du Code du travail numérique"
              >
                L&apos;ouverture officielle du site est prévue pour 2020.
              </a>
            </P>
          </Alert>
          <p>
            Seul un public expert maitrîse la complexité du droit du travail et
            de ses différentes sources de droit (conventions collectives,
            accords de branches et accords d&apos;entreprises…). En plus de la
            diversité des sources de droit, la technicité de la matière la rend
            peu accessible pour les concerné·e·s : les employeur·e·s et les
            salarié·e·s.
          </p>

          <p>
            Or tous les actifs sont impactés tous les jours par le droit qui
            régit leurs relations au travail, qui, mal compris, mal appliqué,
            peut avoir des conséquences importantes pour le salarié·e comme pour
            l&apos;employeur·e.
          </p>

          <p>
            Les services de renseignement en droit du travail (dans les
            DIRECCTE) répondent à plus de 900 000 demandes par an concernant le
            droit du travail, des questions les plus simples aux cas les plus
            complexes.
          </p>

          <p>
            L&apos;objectif du code du travail numérique est d&apos;améliorer la
            lisibilité du droit pour ceux qu&apos;il concerne.
          </p>

          <p>
            Construit avec les utilisateurs (employeurs et salariés) et les
            experts du terrain (inspecteur du travail services d&apos;inspection
            du travail et de renseignements en droit du travail notamment), le
            service répondra aux questions que se posent les employeur·e·s,
            notamment de TPE PME, quant aux règles applicables à leur situation,
            ainsi qu&apos;à celles que se posent les salarié·e·s
          </p>

          <p>
            Pour rendre le droit accessible et compréhensible, nous devons
            construire un modèle exécutable qui, en fonction de la situation
            d&apos;une entreprise ou d&apos;un salarié, sera capable de servir
            les droits et les obligations associées aux différentes thématiques
            comme la durée du travail, la rémunération, le contrat de travail
            (l&apos;embauche, son exécution, sa rupture) ou la maladie par
            exemple. L&apos;enjeu est donc d&apos;identifier la source de droit
            applicable à des situations spécifiques et de donner une réponse
            claire sur les dispositions propres à la situation de
            l&apos;utilisateur.
          </p>
        </div>
      </Section>
    </Container>
  </PageLayout>
);
export default About;

const P = styled.p`
  margin-top: 1.25rem;
  margin-top: var(--spacing-inter-component);
`;
