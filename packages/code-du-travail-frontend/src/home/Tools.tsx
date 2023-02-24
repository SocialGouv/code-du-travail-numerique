import React from "react";
import { getRouteBySource, SOURCES } from "cdtn-types";
import {
  Container,
  Grid,
  icons,
  PageTitle,
  Paragraph,
  Section,
} from "@socialgouv/cdtn-ui";
import { CallToActionTile } from "../common/tiles/CallToAction";
import { HomeButtonTrigger } from "./HomeButtonTrigger";

type Props = {
  tools: Array<{
    action: string;
    description: string;
    href: string;
    icon: string;
    slug: string;
    title: string;
  }>;
};

export const Tools = (props: Props) => {
  return (
    <Section>
      <Container>
        <PageTitle
          as="h2"
          subtitle="Trouvez des réponses personnalisées selon votre situation"
          stripe="left"
        >
          Boîte à outils
        </PageTitle>
        <Grid>
          {props.tools.map(
            ({ action, description, href, icon, slug, title }) => {
              if (!href) {
                href = `/${getRouteBySource(SOURCES.TOOLS)}/${slug}`;
              }
              return (
                <CallToActionTile
                  action={action}
                  custom
                  icon={icons[icon]}
                  title={title}
                  titleTagType="h3"
                  centerTitle
                  href={href}
                  key={slug || href}
                >
                  <Paragraph noMargin>{description}</Paragraph>
                </CallToActionTile>
              );
            }
          )}
        </Grid>
        <HomeButtonTrigger name="Voir tous les outils" link="/outils" />
      </Container>
    </Section>
  );
};
