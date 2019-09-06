import React from "react";
import PropTypes from "prop-types";
import Info from "./Info";
import Texte from "./Texte";
import Explainer from "./Explainer";
import ListTextes from "./ListTextes";
import { Tabs } from "@cdt/ui-old";

const Convention = ({ convention, container }) => {
  return (
    <>
      <Explainer />
      <Tabs
        data={[
          {
            tab: "Informations",
            panel: <Info convention={convention} container={container} />,
            key: "infos"
          },
          {
            tab: "Texte de base",
            panel: <Texte node={container.content} />,
            key: "texte-de-base"
          },
          {
            tab: "Texte attachés",
            panel: (
              <ListTextes
                conventionId={container.conventionId}
                typeTextes={"attaches"}
              />
            ),
            key: "attaches"
          },
          {
            tab: "Texte salaires",
            panel: (
              <ListTextes
                conventionId={container.conventionId}
                typeTextes={"salaires"}
              />
            ),
            key: "salaires"
          }
        ]}
      />
    </>
  );
};

Convention.propTypes = {
  convention: PropTypes.object.isRequired,
  container: PropTypes.shape({
    content: PropTypes.object.isRequired
  }).isRequired
};

export default Convention;
