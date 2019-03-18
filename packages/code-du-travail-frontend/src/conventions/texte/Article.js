import React from "react";
import VisibilitySensor from "react-visibility-sensor";
import Calipso from "./Calipso";
import styled from "styled-components";

const ETAT_LABEL = {
  MODIFIE: "Modifie",
  DENONCE: "Dénonce",
  VIGUEUR_ETEN: "En vigueur étendu",
  VIGUEUR: "En vigueur",
  PERIME: "Périmé",
  ABROGE: "Abrogé",
  VIGUEUR_NON_ETEN: "En vigueur non étendu",
  REMPLACE: "Remplace"
};

const Article = ({ etat, calipsos, bloc_textuel, onChangeVisibility }) => {
  return (
    <VisibilitySensor
      onChange={visible => onChangeVisibility(visible)}
      partialVisibility={true}
      scrollCheck={true}
      scrollDelay={200}
      intervalCheck={false}
    >
      <div>
        <ArticleMeta>{ETAT_LABEL[etat]}</ArticleMeta>
        {calipsos &&
          calipsos
            .split(",")
            .map((calipso, idx) => <Calipso calipso={calipso} key={idx} />)}
        <div dangerouslySetInnerHTML={{ __html: bloc_textuel }} />
      </div>
    </VisibilitySensor>
  );
};

const ArticleMeta = styled.div`
  margin-top: -10px;
  margin-bottom: 10px;
  font-style: italic;
  font-weight: bold;
  font-size: 1em;
`;

export default Article;
