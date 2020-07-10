import { Container, Grid, PageTitle, Section } from "@socialgouv/cdtn-react-ui";
import React from "react";

import { ListLink } from "../../src/search/SearchResults/Results.js";

export const Highlights = ({ highlights = [] }) => {
  if (!highlights.length) return null;
  return (
    <Section>
      <Container>
        <PageTitle as="h2" leftStripped id="en-ce-moment">
          En ce moment
        </PageTitle>
        <Grid columns={2}>
          {highlights.map((highlight) => (
            <ListLink item={highlight} key={highlight.slug} />
          ))}
        </Grid>
      </Container>
    </Section>
  );
};
