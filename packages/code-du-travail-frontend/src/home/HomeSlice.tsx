import { Container, Grid, PageTitle, Section } from "@socialgouv/cdtn-ui";
import React from "react";

import {
  ListLink,
  ListLinkItemProps,
} from "../../src/search/SearchResults/Results";
import { HomeButtonTrigger } from "./HomeButtonTrigger";

type Props = {
  content: Array<ListLinkItemProps>;
  title: string;
  subtitle: string;
  triggerName: string;
  triggerLink: string;
};

export const HomeSlice = (props: Props) => {
  return (
    <Section>
      <Container>
        <PageTitle as="h2" subtitle={props.subtitle} stripe="left">
          {props.title}
        </PageTitle>
        <Grid columns={2}>
          {props.content.map((element) => (
            <ListLink
              item={element}
              key={element.slug}
              titleTagType="h3"
              hideAction
            />
          ))}
        </Grid>
        <HomeButtonTrigger name={props.triggerName} link={props.triggerLink} />
      </Container>
    </Section>
  );
};
