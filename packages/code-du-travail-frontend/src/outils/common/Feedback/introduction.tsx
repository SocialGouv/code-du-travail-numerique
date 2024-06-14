import styled from "styled-components";
import { Button, Paragraph, theme } from "@socialgouv/cdtn-ui";

type IntroductionProps = {
  onClick: () => void;
};

export const Introduction = ({ onClick }: IntroductionProps): JSX.Element => {
  return (
    <Div>
      <Paragraph fontSize="hsmall" fontWeight="600">
        Votre avis sur ce simulateur nous intéresse
      </Paragraph>
      <Button onClick={onClick}>Donner mon avis</Button>
    </Div>
  );
};

const Div = styled.div`
  text-align: center;
  padding: ${theme.spacings.large};
`;
