import externalTools from "@cdt/data...tools/externals.json";
import tools from "@cdt/data...tools/internals.json";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
import {
  Container,
  Grid,
  icons,
  PageTitle,
  Section,
} from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";

import { FocusRoot } from "../../src/a11y";
import Metas from "../../src/common/Metas";
import { CallToActionTile } from "../../src/common/tiles/CallToAction";
import { Layout } from "../../src/layout/Layout";
import { CCTile, DocumentsTile } from "../index";

const monCompteFormation = externalTools.find(
  (tools) => tools.title === "Mon compte formation"
);

const Outils = ({ pageUrl, ogImage }) => (
  <Layout currentPage="tools">
    <Metas
      url={pageUrl}
      title={`Boîte a outils - Code du travail numérique`}
      description="Trouvez des réponses personnalisées selon votre situation"
      image={ogImage}
    />
    <Section>
      <Container>
        <FocusRoot>
          <PageTitle>Retrouvez tous nos outils</PageTitle>
        </FocusRoot>
        <Grid>
          {DocumentsTile}
          {tools.map(({ action, description, icon, slug, title }) => (
            <Link
              href={`/${getRouteBySource(SOURCES.TOOLS)}/[slug]`}
              as={`/${getRouteBySource(SOURCES.TOOLS)}/${slug}`}
              passHref
              key={slug}
            >
              <CallToActionTile
                action={action}
                custom
                title={title}
                icon={icons[icon]}
              >
                {description}
              </CallToActionTile>
            </Link>
          ))}
          {CCTile}
          <CallToActionTile
            key={monCompteFormation.slug}
            action={monCompteFormation.action}
            custom
            title={monCompteFormation.title}
            icon={icons[monCompteFormation.icon]}
            href={monCompteFormation.url}
            rel="noopener noreferrer"
            target="_blank"
            className="no-after"
          >
            {monCompteFormation.description}
          </CallToActionTile>
        </Grid>
      </Container>
    </Section>
  </Layout>
);

export default Outils;
