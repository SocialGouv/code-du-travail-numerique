import styled from "styled-components";
import { Button, theme } from "@socialgouv/cdtn-ui";

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

const { fonts } = theme;

const StyledHeading = styled.span`
  text-align: center;
  color: ${({ theme }) => theme.title};
  font-weight: 600;
  font-size: ${fonts.sizes.headings.small};
  margin: 32px auto 20px;
`;

const StyledButton = styled(Button)`
  margin: 0 auto;
`;
