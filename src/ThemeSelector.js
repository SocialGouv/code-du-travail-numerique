import React from "react";
import styled from "styled-components";

import filterEmitter from "./events-bus";

//
// boutons de selection du thème
// prend un noeud de "syntax-tree" {children:[]} en entrée
//

const ThemeButton = styled.button`
  display: inline-block;
  border: 1px solid #ddd;
  background-color: #efefef;
  color: black;
  padding: 10px 10px;
  border-radius: 2px;
  margin: 5px;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease-out;
  &:hover {
    background-color: #dedede;
  }
`;

const ThemeSelectorContainer = styled.div`text-align: center;`;

const ThemeSelector = ({ node, onSelect }) => (
  <ThemeSelectorContainer>
    {node.children.map(child => (
      <ThemeButton
        role="button"
        tabIndex={0}
        key={child.title}
        onClick={() => onSelect(child)}
      >
        {child.title}
      </ThemeButton>
    ))}
  </ThemeSelectorContainer>
);

export default ThemeSelector;
