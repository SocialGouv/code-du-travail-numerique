import React from "react";
import { Alert, Wrapper } from "@socialgouv/cdtn-ui";
import { Title } from "../Components/SimulatorDecorator/Components";
import { QuestionnaireWrapper } from "../../questionnaire";
import styled from "styled-components";

type Props = {
  icon: string;
  title: string;
  widgetMode?: boolean;
};

const DismissalProcess = ({
  icon,
  title,
  widgetMode = false,
}: Props): JSX.Element => (
  <StyledWrapper variant="main" noShadow>
    <Title title={title} icon={icon} />
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
      widgetMode={widgetMode}
    />
  </StyledWrapper>
);

export { DismissalProcess };

const StyledWrapper = styled(Wrapper)`
  ${({ widgetMode }) => {
    if (widgetMode) {
      return "border: none;";
    }
  }};
  padding: 32px;
  max-width: 800px;
  margin: auto;
`;
