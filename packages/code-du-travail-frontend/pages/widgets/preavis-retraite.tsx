import { Container, theme } from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import { loadPublicodes } from "../../src/outils/api/LoadPublicodes";
import { SimulateurPreavisRetraite } from "../../src/outils/DureePreavisRetraite";

const publicodesRules = loadPublicodes("preavis-retraite");

const Widget = (): JSX.Element => (
  <Container>
    <SimulateurPreavisRetraite
      title="Préavis de départ ou de mise à la retraite"
      icon="Préavis"
      publicodesRules={publicodesRules}
    />
    <StyledFooter>
      <Link passHref href="/politique-confidentialite">
        <a target="_blank" rel="noopener noreferrer">
          Politique de confidentialité
        </a>
      </Link>
    </StyledFooter>
  </Container>
);

export default Widget;

const StyledFooter = styled.footer`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  list-style-type: none;
  margin: 0;
  padding: ${theme.spacings.base};
  @media print {
    display: none;
  }
`;
