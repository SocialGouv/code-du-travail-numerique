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
import { DocumentsTile } from "../index";
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
          {DocumentsTile}
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
              const linkProps = {
                passHref: true,
                href: `/${getRouteBySource(SOURCES.TOOLS)}/${slug}`,
              };
              return (
                <Link {...linkProps} passHref key={id}>
                  <CallToActionTile
                    action={action}
                    custom
                    title={title}
                    icon={icons[icon]}
                    titleTagType="h2"
                    centerTitle
                    data-testid="tools-list-items-internal"
                  >
                    <Paragraph noMargin>
                      {description ?? metaDescription}
                    </Paragraph>
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
