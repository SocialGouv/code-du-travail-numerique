import { FlatList, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

export function SkipNavLink() {
  return (
    <SkipNav>
      <Li>
        <SkipLink href="#content">Allez au contenu</SkipLink>
      </Li>
      <Li>
        <SkipLink href="#search">Allez à la recherche</SkipLink>
      </Li>
    </SkipNav>
  );
}

const SkipNav = styled(FlatList)`
  position: absolute;
  top: 0;
  left: 0;
`;

const Li = styled.li`
  padding-left: 0;
`;
const { spacings } = theme;
const SkipLink = styled.a`
  background-color: ${({ theme }) => theme.paragraph};
  position: absolute;
  padding: ${spacings.tiny};
  display: inline-block;
  left: -7000px;
  z-index: 4;
  :focus {
    left: 0;
    position: relative;
  }
`;
