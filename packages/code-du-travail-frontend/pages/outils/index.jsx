import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
import {
  Container,
  Grid,
  icons,
  PageTitle,
  Paragraph,
  Section,
} from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";

import Metas from "../../src/common/Metas";
import { CallToActionTile } from "../../src/common/tiles/CallToAction";
import { Layout } from "../../src/layout/Layout";
import { getTools } from "../api/simulateurs/index";
import { DocumentsTile } from "../index";

const Outils = ({ cdtnSimulators, externalTools }) => (
  <Layout currentPage="tools">
    <Metas
      title="Boîte a outils"
      description="Trouvez des réponses personnalisées selon votre situation"
    />
    <Section>
      <Container>
        <PageTitle>Retrouvez tous nos outils</PageTitle>
        <Grid>
          {DocumentsTile}
          {cdtnSimulators.map(
            ({ id, action, description, icon, slug, titleH1 }) => {
              const linkProps = {
                passHref: true,
              };
              linkProps.href = `/${getRouteBySource(SOURCES.TOOLS)}/${slug}`;
              return (
                <Link {...linkProps} passHref key={id}>
                  <CallToActionTile
                    action={action}
                    custom
                    title={titleH1}
                    icon={icons[icon]}
                    titleTagType="h2"
                  >
                    <Paragraph noMargin>{description}</Paragraph>
                  </CallToActionTile>
                </Link>
              );
            }
          )}
          {externalTools.map(
            ({ id, action, description, icon, title, url }) => (
              <CallToActionTile
                key={id}
                titleTagType="h2"
                action={action}
                custom
                title={title}
                icon={icons[icon]}
                href={url}
                rel="noopener noreferrer"
                target="_blank"
                className="no-after"
              >
                <Paragraph noMargin>{description}</Paragraph>
              </CallToActionTile>
            )
          )}
        </Grid>
      </Container>
    </Section>
  </Layout>
);

export async function getServerSideProps() {
  return {
    props: getTools(),
  };
}

export default Outils;
