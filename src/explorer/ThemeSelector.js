import React from "react";
import styled from "styled-components";

import ordering from "../data/themes-ordering.js";

//
// boutons de selection du thème
// prend un noeud de "syntax-tree" {children:[]} en entrée
//

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

    // title = currentPath === "" ? "Choisissez un thème" : "Précisez le thème";

    return (
      (node.children.length && (
        <section className="section-light">
          <div className="container center">
            <div className="wrapper-light">
              {groups.map((group, index) => (
                <p key={index}>
                  {group.map(child => (
                    <button
                      className="btn btn__secondary"
                      style={{ marginRight: 5, marginBottom: 10 }}
                      tabIndex={0}
                      key={child.title}
                      onClick={() => onSelect(child)}
                    >
                      {child.title}
                    </button>
                  ))}
                </p>
              ))}
            </div>
          </div>
        </section>
      )) ||
      null
    );
  }
}

export default ThemeSelector;
