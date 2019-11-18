import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { theme, Title } from "@socialgouv/react-ui";
import { getConventionTextes } from "../convention.service";
import Texte from "./Texte";

const ListTextes = ({ conventionId, typeTextes }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [textes, setTextes] = useState([]);
  const [selectedTexte, setSelectedTexte] = useState(null);

  const getTextes = useCallback(async () => {
    setIsLoaded(false);
    const textesContainer = await getConventionTextes(conventionId, typeTextes);
    setTextes(textesContainer.content.children || []);
    setIsLoaded(true);
  }, [conventionId, typeTextes]);

  useEffect(() => {
    getTextes();
  }, [getTextes]);

  if (!isLoaded) return <div>chargement ...</div>;

  if (selectedTexte) {
    return (
      <>
        <Button onClick={() => setSelectedTexte(null)}>
          &lt; Retour à la liste des textes
        </Button>
        <Title>{selectedTexte.titrefull}</Title>
        <Texte node={selectedTexte} title={selectedTexte.data.title} />
      </>
    );
  }

  if (!textes.length) {
    return <div>Aucun texte</div>;
  }

  return (
    <ul>
      {textes.map(texte => (
        <li key={texte.data.id}>
          <Button onClick={() => setSelectedTexte(texte)}>
            {texte.data.title}
          </Button>
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

const { colors, spacings } = theme;

const Button = styled.button`
  margin: 0 0 ${spacings.tiny} 0;
  padding: 0;
  color: ${colors.paragraph};
  font-size: inherit;
  text-align: left;
  text-decoration: underline;
  background-color: inherit;
  border: 0;
  cursor: pointer;
`;
