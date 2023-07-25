import styled from "styled-components";
import { Button, theme, Heading } from "@socialgouv/cdtn-ui";

type IntroductionProps = {
  onClick: () => void;
};

export const Introduction = ({ onClick }: IntroductionProps): JSX.Element => {
  return (
    <>
      <StyledHeading variant="primary" stripe="left">
        Votre avis sur ce simulateur nous intéresse
      </StyledHeading>
      <StyledButton onClick={onClick}>Donner mon avis</StyledButton>
    </>
  );
};

const StyledHeading = styled(Heading)`
  margin-left: 0 !important;
`;

const StyledButton = styled(Button)`
  margin: 18px auto 24px;
`;
