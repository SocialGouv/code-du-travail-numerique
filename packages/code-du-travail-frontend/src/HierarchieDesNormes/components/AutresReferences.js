import React from "react";
import PropTypes from "prop-types";
import { Accordion } from "@cdt/ui";
import TYPE_REFERENCE from "../typeReference";
import { CodeDuTravailLink, ConventionLink, OtherLink } from "./links";

const ReferencesJuridiques = ({ references }) => {
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
      title: "Voir ces articles du code du travail",
      body: referenceList
    }
  ];

  return (
    <>
      <h4>Autres références</h4>
      <p>
        Pour ces références, veuillez vérifier dans le code du travail quel est
        le texte applicable.
      </p>
      <Accordion items={items} />
    </>
  );
};

ReferencesJuridiques.propTypes = {
  references: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      type: PropTypes.oneOf(Object.values(TYPE_REFERENCE)).isRequired,
      id: PropTypes.string.isRequired
    })
  )
};

export default ReferencesJuridiques;
