import { Heading } from "@socialgouv/cdtn-ui";
import styled from "styled-components";

export const QuestionnaireEnd = (): JSX.Element => {
  return (
    <>
      <StyledHeading variant="primary" stripe="left">
        Merci pour votre aide !
      </StyledHeading>
      <StyledText>
        Votre évaluation sera étudiée au plus vite par nos équipes
      </StyledText>
    </>
  );
};

const StyledHeading = styled(Heading)`
  margin-left: 0;
  padding-top: 6px;
`;

const StyledText = styled.span`
  margin: 12px auto 24px 24px;
`;
