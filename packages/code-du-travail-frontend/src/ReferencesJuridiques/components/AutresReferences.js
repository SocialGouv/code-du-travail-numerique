import React from "react";
import PropTypes from "prop-types";
import { Accordion } from "@cdt/ui";
import TYPE_REFERENCE from "../typeReference";
import ReferenceList from "./ReferenceList";

const AutresReferences = ({ references, showTitle }) => {
  const items = [
    {
      title: "Voir les articles du code du travail concernés",
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
