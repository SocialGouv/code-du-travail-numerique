import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Accordion } from "@cdt/ui-old";
import { theme } from "@socialgouv/react-ui";
import TYPE_REFERENCE from "../typeReference";
import ReferenceList from "./ReferenceList";

const { spacing } = theme;

const AutresReferences = ({ references, showTitle }) => {
  const items = [
    {
      title: (
        <StyledSpan>Voir les articles du code du travail concernés</StyledSpan>
      ),
      body: <ReferenceList references={references} />
    }
  ];

  return (
    <>
      {showTitle && <h3>Autres références</h3>}
      <Accordion items={items} />
    </>
  );
};

AutresReferences.propTypes = {
  references: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      type: PropTypes.oneOf(Object.values(TYPE_REFERENCE)).isRequired,
      id: PropTypes.string.isRequired
    })
  ),
  showTitle: PropTypes.bool
};

export default AutresReferences;

const StyledSpan = styled.span`
  display: inline-block;
  padding: ${spacing.base};
`;
