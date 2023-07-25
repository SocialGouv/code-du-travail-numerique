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
`;

const StyledButton = styled(Button)`
  margin: 18px auto 24px;
`;
