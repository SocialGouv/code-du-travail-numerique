import React from "react";
import styled from "styled-components";

import Panel from "./Panel";
import ordering from "./data/themes-ordering.js";

//
// boutons de selection du thème
// prend un noeud de "syntax-tree" {children:[]} en entrée
//

const ThemeButton = styled.button`
  margin: 5px 5px 5px 0;
  margin-left: 0 !important;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease-out;
  &:hover {
    background-color: #dedede;
  }
`;

const ThemeSelectorContainer = styled.div`text-align: center;`;

const GroupContainer = styled.div`
  padding: 5px 0;
  text-align: left;
`;

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
            .map(title =>
              children.find(
                child => child.title.toLowerCase() === title.toLowerCase()
              )
            )
            // We may find `undefined` elements when a filter has been applied: remove them.
            .filter(elem => elem !== undefined)
        );
      });
      return groups;
    }

    // Otherwise, use only 1 group.
    groups.push(children);
    return groups;
  };

  render() {
    let currentPath = this.props.currentPath;
    let node = this.props.node;
    let onSelect = this.props.onSelect;

    let groups = this.getOrderedChildren(node.children, currentPath);

    return (
      (node.children.length && (
        <ThemeSelectorContainer>
          <Panel title="Précisez le thème">
            {groups.map((group, index) => (
              <GroupContainer key={index}>
                {group.map(child => (
                  <ThemeButton
                    className="button"
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
          </Panel>
        </ThemeSelectorContainer>
      )) ||
      null
    );
  }
}

export default ThemeSelector;
