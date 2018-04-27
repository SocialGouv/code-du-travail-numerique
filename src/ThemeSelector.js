import React from "react";
import styled from "styled-components";

//
// boutons de selection du thème
// prend un noeud de "syntax-tree" {children:[]} en entrée
//

const ThemeButton = styled.a`
  display: inline-block;
  border: 1px solid #ddd;
  background-color: #efefef;
  color: black;
  padding: 10px 10px;
  border-radius: 2px;
  margin: 5px;
  cursor: pointer;
  transition: all 0.2s ease-out;
  &:hover {
    background-color: #dedede;
  }
`;

const ThemeSelectorContainer = styled.div`text-align: center;`;

const ThemeSelector = ({ node, onSelect }) => (
  <ThemeSelectorContainer>
    {node.children.map(child => (
      <ThemeButton key={child.title} onClick={() => onSelect(child)}>
        {child.title}
      </ThemeButton>
    ))}
  </ThemeSelectorContainer>
);

export default ThemeSelector;
