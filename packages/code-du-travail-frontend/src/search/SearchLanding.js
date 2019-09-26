import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import { Container, theme, Section } from "@cdt/ui-old";

import SearchBar from "./SearchBar";

const SearchLanding = () => {
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchRef.current && searchRef.current.scrollIntoView) {
      searchRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <SearchSection variant="white">
      <Container>
        <StyledSearch ref={searchRef}>
          <SearchLabel>
            Posez votre question sur le droit du travail
            <br />
            <Link href="/droit-du-travail" passHref>
              <A>Le droit du travail, c‘est quoi ?</A>
            </Link>
          </SearchLabel>
          <SearchBarWrapper>
            <SearchBar />
          </SearchBarWrapper>
        </StyledSearch>
      </Container>
    </SearchSection>
  );
};

export default SearchLanding;

const { breakpoints, colors, spacing, fonts } = theme;

const SearchSection = styled(Section)`
  box-shadow: 0 10px 10px -10px ${colors.lightGrey};
  @media print {
    display: none;
  }
`;

const SearchLabel = styled.p`
  margin-top: 0;
  font-size: ${fonts.sizeH2};
  line-height: ${fonts.lineHeight};
  color: ${colors.title};
`;

const A = styled.a`
  font-size: ${fonts.sizeBase};
`;

const StyledSearch = styled.div`
  position: relative;
  padding: ${spacing.base} 0;
  text-align: center;
`;

const SearchBarWrapper = styled.div`
  margin: 0 auto;
  width: 70%;
  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }
`;
