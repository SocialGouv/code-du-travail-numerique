import React from "react";
// import { Container, PageTitle, Section } from "@socialgouv/cdtn-ui";
import {
  Alert,
  Button,
  Paragraph,
  theme,
  Wrapper,
  Tile as TileUi,
  icons,
} from "@socialgouv/cdtn-ui";
import { Title } from "../Components/SimulatorDecorator/Components";
import { internals as tools } from "@cdt/data";
import { QuestionnaireWrapper } from "../../questionnaire";
import styled from "styled-components";

const { Gear } = icons;

const tool: any = tools.find(({ slug }) => slug === "procedure-licenciement");
const subtitle =
  "Vous souhaitez obtenir des informations concernant une procédure de licenciement ? Afin de vous apporter une réponse précise et adaptée, veuillez tout d'abord préciser votre situation :";

const DismissalProcess = (): JSX.Element => (
  <StyledWrapper variant="main">
    <Title title={tool.title} icon={tool.icon} />
    <Alert variant="secondary">
      <p>
        Vous souhaitez obtenir des informations concernant une procédure de
        licenciement ? Afin de vous apporter une réponse précise et adaptée,
        veuillez tout d&apos;abord préciser votre situation :
      </p>
    </Alert>
    <QuestionnaireWrapper
      name="dismissalProcess"
      title="Quelle est votre situation ?"
      slug="procedure-licenciement"
    />
  </StyledWrapper>
);

export { DismissalProcess };

const Flex = styled.div`
  display: flex;
  padding-top: ${theme.spacings.medium};
  justify-content: space-around;
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledWrapper = styled(Wrapper)`
  padding: 32px;
  max-width: 800px;
  margin: auto;
`;
