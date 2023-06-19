import Link from "next/link";
import styled from "styled-components";
import { theme } from "@socialgouv/cdtn-ui";
import { LogoLink } from "./LogoLink";

export const Footer = () => {
  return (
    <StyledFooter>
      <Link
        href="/politique-confidentialite"
        target="_blank"
        rel="noopener noreferrer"
      >
        Politique de confidentialité
      </Link>
      <LogoLink></LogoLink>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacings.base};
  @media print {
    display: none;
  }
`;
