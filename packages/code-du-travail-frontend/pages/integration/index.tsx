import {
  Container,
  Grid,
  PageTitle,
  Paragraph,
  Section,
  theme,
} from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import Metas from "../../src/common/Metas";
import { CallToActionTile } from "../../src/common/tiles/CallToAction";
import { Layout } from "../../src/layout/Layout";

const FindAnswerPage = (): JSX.Element => (
  <Layout>
    <Metas
      title="Widget pour intégrer le Code du travail numérique à votre site"
      description="L’équipe du code du travail numérique vous propose d’intégrer son moteur de recherche et certains de ses simulateurs sur votre site grâce à un module (widget).l"
    />

    <Section>
      <Container>
        <PageTitle>Intégrer les outils du code du travail numérique</PageTitle>

        <p>
          L’équipe du code du travail numérique vous propose d’intégrer son
          moteur de recherche et certains de ses simulateurs sur votre site
          grâce à un module (widget).
        </p>
        <Grid columns="2">
          <Link href="/integration/moteur-recherche" passHref>
            <CallToActionTile
              noCustom
              action="Installer"
              title="Moteur de recherche du code du travail numérique"
              titleTagType="h2"
            >
              <>
                <Image
                  src="/static/assets/img/moteur-recherche.png"
                  alt="Widget Moteur de recherche du code du travail numérique"
                />
                <Paragraph>
                  Effectuer une recherche depuis votre site sur le code du
                  travail numérique
                </Paragraph>
              </>
            </CallToActionTile>
          </Link>
          <Link href="/integration/preavis-retraite" passHref>
            <CallToActionTile
              noCustom
              action="Installer"
              title="Préavis de départ ou mise&nbsp;à la retraite"
              titleTagType="h2"
            >
              <>
                <Image
                  src="/static/assets/img/preavis-retraite.png"
                  alt="Widget Moteur de recherche du code du travail numérique"
                />
                <Paragraph>
                  Calculer la durée de préavis à respecter en cas de départ à la
                  retraite ou de mise à la retraite
                </Paragraph>
              </>
            </CallToActionTile>
          </Link>
          <Link href="/integration/preavis-licenciement" passHref>
            <CallToActionTile
              noCustom
              action="Installer"
              title="Préavis de&nbsp;licenciement"
              titleTagType="h2"
            >
              <>
                <Image
                  src="/static/assets/img/preavis-licenciement.png"
                  alt="Widget Moteur de recherche du code du travail numérique"
                />
                <Paragraph>
                  <br />
                  Calculer la durée de préavis à respecter en cas de
                  licenciement
                </Paragraph>
              </>
            </CallToActionTile>
          </Link>
        </Grid>
      </Container>
    </Section>
  </Layout>
);
const Image = styled.img`
  margin: auto;
  height: auto;
  width: auto;
  max-width: 90%;
  border: solid 1px ${theme.colors.border};
`;
export default FindAnswerPage;
