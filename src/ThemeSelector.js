import React from "react";
import styled from "styled-components";

import ordering from "./data/themes-ordering.js";


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

const GroupContainer = styled.div`padding: 5px 0;`;


class ThemeSelector extends React.Component {

  getOrderedChildren = (children, currentPath) => {

    let groups = [];
    let nodeOrdering = ordering[currentPath];

    // Do we have a custom order for items of the current path?
    if (nodeOrdering) {
      // If so, order `children` according to `themes-ordering.js`.
      nodeOrdering.forEach(group => {
        groups.push(
          group
            // Replace the title found in `themes-ordering.js` by the original node child.
            .map(title => children.find(child => child.title.toLowerCase() === title.toLowerCase()))
            // We may find `undefined` elements when a filter has been applied: remove them.
            .filter(elem => elem !== undefined)
        )
      });
    }

    if (groups.length) {
      return groups;
    }

    groups.push(children);  // Otherwise, use only 1 group.
    return groups;

  }

  render() {

    // Props.
    let currentPath = this.props.currentPath;
    let node = this.props.node;
    let onSelect = this.props.onSelect;

    let groups = this.getOrderedChildren(node.children, currentPath);

    return (
      <ThemeSelectorContainer>
        {groups.map(group => (
          <GroupContainer>
            {group.map(child => (
              <ThemeButton
                role="button"
                tabIndex={0}
                key={child.title}
                onClick={() => onSelect(child)}
              >
                {child.title}
              </ThemeButton>
            ))}
          </GroupContainer>
        ))}
      </ThemeSelectorContainer>
    )

  }

};

export default ThemeSelector;
