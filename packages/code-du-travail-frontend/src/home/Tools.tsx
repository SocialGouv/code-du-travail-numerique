import React from "react";
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
              const linkProps = {
                href,
                passHref: true,
              };
              if (!href) {
                linkProps.href = `/${getRouteBySource(SOURCES.TOOLS)}/${slug}`;
              }
              return (
                <Link {...linkProps} key={slug || href} legacyBehavior>
                  <CallToActionTile
                    action={action}
                    custom
                    icon={icons[icon]}
                    title={title}
                    titleTagType="h3"
                    centerTitle
                  >
                    <Paragraph noMargin>{description}</Paragraph>
                  </CallToActionTile>
                </Link>
              );
            }
          )}
        </Grid>
        <HomeButtonTrigger name="Voir tous les outils" link="/outils" />
      </Container>
    </Section>
  );
};
