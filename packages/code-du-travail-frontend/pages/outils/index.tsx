import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import {
  Container,
  Grid,
  icons,
  PageTitle,
  Paragraph,
  Section,
} from "@socialgouv/cdtn-ui";
import React from "react";

import Metas from "../../src/common/Metas";
import { CallToActionTile } from "../../src/common/tiles/CallToAction";
import { Layout } from "../../src/layout/Layout";
import { fetchTools } from "../../src/outils/service";

const Outils = ({ cdtnSimulators, externalTools }) => (
  <Layout currentPage="tools">
    <Metas
      title="Boîte a outils"
      description="Trouvez des réponses personnalisées selon votre situation"
    />
    <Section>
      <Container>
        <PageTitle>Retrouvez tous nos outils</PageTitle>
        <Grid data-testid="tools-list">
          {cdtnSimulators.map(
            ({
              id,
              action,
              description,
              metaDescription,
              icon,
              slug,
              title,
            }) => {
              const href = `/${getRouteBySource(SOURCES.TOOLS)}/${slug}`;

              return (
                <CallToActionTile
                  action={action}
                  custom
                  title={title}
                  icon={icons[icon]}
                  titleTagType="h2"
                  centerTitle
                  data-testid="tools-list-items-internal"
                  href={href}
                  key={id}
                >
                  <Paragraph noMargin>
                    {description ?? metaDescription}
                  </Paragraph>
                </CallToActionTile>
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
                centerTitle
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
  const tools = await fetchTools();
  return {
    props: {
      cdtnSimulators: tools.filter(
        (tool) => tool.displayTool && tool.source === SOURCES.TOOLS
      ),
      externalTools: tools.filter(
        (tool) => tool.displayTool && tool.source === SOURCES.EXTERNALS
      ),
    },
  };
}

export default Outils;
