import React from "react";
import { Alert, Wrapper } from "@socialgouv/cdtn-ui";
import { Title } from "../Components/SimulatorDecorator/Components";
import { internals as tools } from "@cdt/data";
import { QuestionnaireWrapper } from "../../questionnaire";
import styled from "styled-components";

const tool: any = tools.find(({ slug }) => slug === "procedure-licenciement");

const DismissalProcess = (): JSX.Element => (
  <StyledWrapper variant="main">
    <Title title={tool.title} icon={tool.icon} />
    <Alert variant="secondary">
      <p>
        Vous souhaitez obtenir des informations concernant une procédure de
        licenciement ? Afin de vous apporter une réponse adaptée, veuillez tout
        d&apos;abord préciser votre situation :
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

const StyledWrapper = styled(Wrapper)`
  padding: 32px;
  max-width: 800px;
  margin: auto;
`;
