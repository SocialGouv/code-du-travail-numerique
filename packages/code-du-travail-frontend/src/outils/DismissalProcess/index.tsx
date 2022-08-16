import React from "react";
import { Container, PageTitle, Section } from "@socialgouv/cdtn-ui";
import { internals as tools } from "@cdt/data";
import { Quiz } from "../Components/Quiz";

const tool = tools.find(({ slug }) => slug === "procedure-licenciement");
const subtitle =
  "Vous souhaitez obtenir des informations concernant une procédure de licenciement ? Afin de vous apporter une réponse précise et adapté, veuillez tout d'abord nous préciser votre situation :";

const DismissalProcess = (): JSX.Element => (
  <Section>
    <Container narrow>
      <PageTitle subtitle={subtitle}>{tool?.title}</PageTitle>
    </Container>
    <Quiz></Quiz>
  </Section>
);

export { DismissalProcess };
