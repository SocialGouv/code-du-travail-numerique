import styled from "styled-components";
import { Button, Heading } from "@socialgouv/cdtn-ui";

type IntroductionProps = {
  onClick: () => void;
};

export const Introduction = ({ onClick }: IntroductionProps): JSX.Element => {
  return (
    <>
      <StyledHeading variant="primary">
        Votre avis sur ce simulateur nous intéresse
      </StyledHeading>
      <StyledButton onClick={onClick}>Donner mon avis</StyledButton>
    </>
  );
};

const StyledHeading = styled(Heading)`
  text-align: center;
  margin-top: 16px;
`;

const StyledButton = styled(Button)`
  margin: 0 auto;
`;
