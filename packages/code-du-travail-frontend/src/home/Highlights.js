import { Container, Grid, PageTitle, Section } from "@socialgouv/cdtn-ui";
import React from "react";

import { ListLink } from "../../src/search/SearchResults/Results";

export const Highlights = ({ highlights = [] }) => {
  if (!highlights.length) return null;
  return (
    <Section>
      <Container>
        <PageTitle as="h2" id="a-la-une">
          À la une
        </PageTitle>
        <Grid columns={2}>
          {highlights.map((highlight) => (
            <ListLink item={highlight} key={highlight.slug} titleTagType="h3" />
          ))}
        </Grid>
      </Container>
    </Section>
  );
};
