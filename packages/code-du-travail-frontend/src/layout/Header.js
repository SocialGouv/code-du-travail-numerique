import React from "react";
import Link from "next/link";
import styled from "styled-components";

import { Container } from "@cdt/ui-old";

const Header = () => (
  <StyledHeader>
    <Container>
      <Wrapper>
        <Link href="/" passHref>
          <LogoWrapper title="Code du travail numérique - retour à l'accueil">
            <Logo
              src={"/static/assets/img/marianne.svg"}
              alt="symbole de la Marianne, site officiel du gouvernement"
            />
            <Title>
              Code du travail
              <br />
              numérique
            </Title>
          </LogoWrapper>
        </Link>
      </Wrapper>
    </Container>
  </StyledHeader>
);
const StyledHeader = styled.header`
  color: white;
  background: currentColor;
`;

const Wrapper = styled.div`
  display: flex;
  padding: 1.25rem 0;
`;
const LogoWrapper = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  :link {
    text-decoration: none;
  }
  :hover {
    text-decoration: underline;
  }
`;

const Logo = styled.img`
  width: 5rem;
  height: 100%;
  margin-right: 1rem;
`;

const Title = styled.span`
  font-size: 1.3rem;
  line-height: 1.1;
  text-decoration: none;
`;
export default Header;
