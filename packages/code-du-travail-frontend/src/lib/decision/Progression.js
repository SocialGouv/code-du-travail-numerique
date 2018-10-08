import React from "react";
import { Container } from "@socialgouv/code-du-travail-ui";

import Tag from "./Tag";

// display filters progression as tags
const Progression = ({ filters, onFilterClick, children, getLabel }) => {
  if (!filters) {
    return null;
  }
  const isEmpty = Object.keys(filters).length === 0;
  if (isEmpty) {
    return <div>{children}</div>;
  }

  return (
    <Container>
      <div style={{ marginLeft: -10 }}>
        {Object.keys(filters).map(key => (
          <Tag
            key={key}
            // Branche: Boulangerie artisanale
            // Région: Autres régions
            label={getLabel(key)}
            onDelete={() => onFilterClick(key)}
          />
        ))}
      </div>
    </Container>
  );
};

export default Progression;
