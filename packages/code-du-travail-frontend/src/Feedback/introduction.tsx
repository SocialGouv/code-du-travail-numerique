import styled from "styled-components";
import { Button, Heading } from "@socialgouv/cdtn-ui";

type IntroductionProps = {
  onClick: () => void;
};

export const Introduction = ({ onClick }: IntroductionProps): JSX.Element => {
  return (
    <>
      <Heading variant="primary" stripe="left">
        Votre avis sur ce simulator nous intéresse
      </Heading>
      <StyledButton onClick={onClick}>Donner mon avis</StyledButton>
    </>
  );
};

const StyledButton = styled(Button)`
  margin: 18px auto 24px;
`;
