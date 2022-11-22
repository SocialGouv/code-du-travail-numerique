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
        (tool) =>
          tool.enable || !process.env.NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT
      ),
      externalTools: [
        {
          title: "Mon compte formation",
          description:
            "Consultez en ligne vos droits à la formation, cherchez et réservez une formation",
          url: "https://www.moncompteformation.gouv.fr",
          icon: "Formation",
          action: "Consulter",
          id: "30b4832d-7584-44de-9b93-2ae5ce9dc57c",
        },
      ],
      tools,
    },
  };
}

export default Outils;
