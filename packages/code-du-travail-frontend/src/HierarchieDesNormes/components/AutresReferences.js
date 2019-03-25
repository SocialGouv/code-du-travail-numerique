import React from "react";
import PropTypes from "prop-types";
import { Accordion } from "@cdt/ui";
import TYPE_REFERENCE from "../typeReference";
import { CodeDuTravailLink, ConventionLink, OtherLink } from "./links";

const AutresReferences = ({ references, showTitle }) => {
  const getLink = reference => {
    switch (reference.type) {
      case TYPE_REFERENCE.codeDuTravail:
        return (
          <CodeDuTravailLink title={reference.title} slug={reference.id} />
        );
      case TYPE_REFERENCE.conventionCollective:
        return <ConventionLink title={reference.title} slug={reference.id} />;
      case TYPE_REFERENCE.journalOfficiel:
        return <OtherLink title={reference.title} url={reference.url} />;
    }
  };
  const referenceList = (
    <ul>
      {references.map(reference => (
        <li key={reference.id}>{getLink(reference)}</li>
      ))}
    </ul>
  );
  const items = [
    {
      title: "Voir les articles du code du travail concernés",
      body: referenceList
    }
  ];

  return (
    <>
      {showTitle && <h3>Autres références</h3>}
      <p>
        Pour ces références, veuillez vérifier dans le code du travail quel est
        le texte applicable.
      </p>
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
