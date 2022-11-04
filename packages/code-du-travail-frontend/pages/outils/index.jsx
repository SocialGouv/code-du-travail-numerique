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
import { getAllTools } from "../../src/outils/service";

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
              };
              linkProps.href = `/${getRouteBySource(SOURCES.TOOLS)}/${slug}`;
              return (
                <Link {...linkProps} passHref key={id}>
                  <CallToActionTile
                    action={action}
                    custom
                    title={title}
                    icon={icons[icon]}
                    titleTagType="h2"
                    centerTitle
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
  const tools = await getAllTools();
  return {
    props: { ...getTools(), cdtnSimulators: tools },
  };
}

export default Outils;
