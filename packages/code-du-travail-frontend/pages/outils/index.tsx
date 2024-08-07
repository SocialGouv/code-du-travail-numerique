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
import { REVALIDATE_TIME } from "../../src/config";
import { getToolsByIdsAndSlugs } from "../../src/api";

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

export async function getStaticProps() {
  try {
    const result = await getToolsByIdsAndSlugs();
    const tools = result
      .map(({ _id, _source }) => ({ ..._source, _id }))
      .filter((tool) =>
        process.env.NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT
          ? tool.displayTool
          : true
      );

    return {
      props: {
        cdtnSimulators: tools.filter((tool) => tool.source === SOURCES.TOOLS),
        externalTools: tools.filter(
          (tool) => tool.source === SOURCES.EXTERNALS
        ),
      },
      revalidate: REVALIDATE_TIME,
    };
  } catch (error) {
    console.error(error);
    return {
      props: { cdtnSimulators: [], externalTools: [] },
      revalidate: REVALIDATE_TIME,
    };
  }
}

export default Outils;
