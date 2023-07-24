import { Heading } from "@socialgouv/cdtn-ui";
import styled from "styled-components";

export const QuestionnaireEnd = (): JSX.Element => {
  return (
    <>
      <Heading variant="primary" stripe="left">
        Merci pour votre aide !
      </Heading>
      <StyledText>
        Votre évaluation sera étudiée au plus vite par nos équipes
      </StyledText>
    </>
  );
};

const StyledText = styled.span`
  margin: 12px auto 24px 24px;
`;
