import {
  Container,
  Grid,
  icons,
  PageTitle,
  Paragraph,
  Section,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";

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

        <Wrapper variant="main">
          <p>
            L’équipe du code du travail numérique vous propose d’intégrer son
            moteur de recherche et certains de ses simulateurs sur votre site
            grâce à un module (widget).
          </p>
          <Grid>
            <Link href="/integration/moteur-recherche" passHref>
              <CallToActionTile
                noCustom
                icon={icons.SearchCC}
                action="Installer"
                title="Intégrer notre moteur de recherche"
                titleTagType="h2"
              >
                <Paragraph>
                  Moteur de recherche du code du travail numérique
                </Paragraph>
              </CallToActionTile>
            </Link>
            <Link href="/integration/preavis-retraite" passHref>
              <CallToActionTile
                noCustom
                icon={icons.CalendarTime}
                action="Installer"
                title="Préavis de départ ou mise à la retraite"
                titleTagType="h2"
              >
                <Paragraph>
                  Calculer la durée de préavis à respecter en cas de départ ou
                  mise à la retraite
                </Paragraph>
              </CallToActionTile>
            </Link>
            <Link href="/integration/preavis-licenciement" passHref>
              <CallToActionTile
                noCustom
                icon={icons.CalendarTime}
                action="Installer"
                title="Préavis de licenciement"
                titleTagType="h2"
              >
                <Paragraph>
                  Calculer la durée de préavis à respecter en cas de
                  licenciement
                </Paragraph>
              </CallToActionTile>
            </Link>
          </Grid>
        </Wrapper>
      </Container>
    </Section>
  </Layout>
);

export default FindAnswerPage;
