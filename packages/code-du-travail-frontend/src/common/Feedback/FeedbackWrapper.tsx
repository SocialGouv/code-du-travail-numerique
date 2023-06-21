import { Container, Section, Wrapper } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
};

export function FeedbackWrapper({ children }: Props) {
  return (
    <StyledSection>
      <Container>
        <Wrapper variant="light">{children}</Wrapper>
      </Container>
    </StyledSection>
  );
}

const StyledSection = styled(Section)`
  @media print {
    display: none;
  }
`;
