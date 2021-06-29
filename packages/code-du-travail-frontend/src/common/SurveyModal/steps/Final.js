import { Button, icons, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

export const FinalStep = ({ setModalVisible }) => (
  <Centerer>
    <StyledCheck aria-label="Questionnaire validé" />
    <h1 role="status">Merci pour votre aide&nbsp;!</h1>
    <StyledLogo />
    <StyledHr />
    <Button
      variant="primary"
      type="button"
      onClick={() => {
        setModalVisible(false);
      }}
    >
      Revenir sur le site
    </Button>
  </Centerer>
);

const { spacings } = theme;

const Centerer = styled.div`
  text-align: center;
`;
const StyledCheck = styled(icons.Check)`
  width: 5.3rem;
  height: 5.3rem;
  margin-bottom: ${spacings.xmedium};
  padding: 0.6rem;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 50%;
`;

const StyledLogo = styled(icons.Logo)`
  position: relative;
  left: -1rem;
  display: block;
  width: 14rem;
  height: 6.4rem;
  margin: ${spacings.xmedium} auto 0 auto;
  padding: 0.6rem;
  color: ${({ theme }) => theme.primary};
`;

const StyledHr = styled.div`
  width: 15%;
  height: 2px;
  margin: ${spacings.large} auto;
  background-color: ${({ theme }) => theme.paragraph};
`;
