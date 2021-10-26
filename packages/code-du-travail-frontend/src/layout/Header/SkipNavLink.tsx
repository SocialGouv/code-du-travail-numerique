import { FlatList, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

const SkipNavLink = (): JSX.Element => {
  return (
    <SkipNav as="div">
      <nav aria-label="liens d'évitements">
        <Ul>
          <Li>
            <SkipLink as="a" href="#navigation">
              Allez à la navigation
            </SkipLink>
          </Li>
          <Li>
            <SkipLink href="#search">Allez à la recherche</SkipLink>
          </Li>
          <Li>
            <SkipLink href="#content">Allez au contenu</SkipLink>
          </Li>
        </Ul>
      </nav>
    </SkipNav>
  );
};

const SkipNav = styled(FlatList)`
  top: 0;
  left: 0;
  position: fixed;
  z-index: 4;
`;

const Ul = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

const Li = styled.li`
  padding-left: 0;
  top: 0;
`;
const { spacings } = theme;
const SkipLink = styled.a`
  background-color: ${({ theme }) => theme.paragraph};
  padding: ${spacings.tiny};
  display: inline-block;
  left: -7000px;
  position: absolute;

  :focus {
    color: ${({ theme }) => theme.white};
    left: 0;
    position: relative;
  }
`;

export default SkipNavLink;
