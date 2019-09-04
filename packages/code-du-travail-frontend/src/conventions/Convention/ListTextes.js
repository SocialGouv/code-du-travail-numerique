import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { theme } from "@cdt/ui-old/";
import { getConventionTextes } from "../services";
import Texte from "./Texte";

const ListTextes = ({ conventionId, typeTextes }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [textes, setTextes] = useState([]);
  const [selectedTexte, setSelectedTexte] = useState(null);

  const getTextes = async () => {
    setIsLoaded(false);
    const textesContainer = await getConventionTextes(conventionId, typeTextes);

    setTextes(textesContainer.sections || []);
    setIsLoaded(true);
  };

  useEffect(() => {
    getTextes();
  }, [conventionId, typeTextes]);

  if (!isLoaded) return <div>chargement ...</div>;

  if (selectedTexte)
    return (
      <>
        <Button onClick={() => setSelectedTexte(null)}>
          &lt; Retour à la liste des textes
        </Button>
        <h2>{selectedTexte.titrefull}</h2>
        <Texte data={selectedTexte} title={selectedTexte.title} />
      </>
    );

  if (!textes.length) return <div>Aucun texte</div>;

  return (
    <ul>
      {textes.map(texte => (
        <li key={texte.id}>
          <Button onClick={() => setSelectedTexte(texte)}>{texte.title}</Button>
        </li>
      ))}
    </ul>
  );
};

ListTextes.propTypes = {
  conventionId: PropTypes.string.isRequired,
  typeTextes: PropTypes.oneOf(["attaches", "salaires"]).isRequired
};

export default ListTextes;

const { colors, spacing } = theme;

const Button = styled.button`
  padding: 0;
  margin: 0 0 ${spacing.xsmall} 0;
  border: 0;
  text-align: left;
  background-color: inherit;
  color: ${colors.blue};
  text-decoration: underline;
  font-size: inherit;
  cursor: pointer;
`;
