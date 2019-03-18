import React from "react";
import ConventionInfos from "./ConventionInfos";
import ConventionTexte from "./ConventionTexte";
import ConventionExplainer from "./ConventionExplainer";
import ConventionListeTextes from "./ConventionListeTextes";
import { Tabs } from "@cdt/ui";

const Convention = ({ convention, conteneur }) => (
  <React.Fragment>
    <ConventionExplainer />
    <Tabs
      data={[
        {
          tab: "Informations",
          panel: (
            <ConventionInfos convention={convention} conteneur={conteneur} />
          ),
          key: "infos"
        },
        {
          tab: "Texte de base",
          panel: <ConventionTexte id={conteneur.texte_de_base} />,
          key: "texte-de-base"
        },
        {
          tab: "Texte attachés",
          panel: (
            <ConventionListeTextes
              conteneur={conteneur}
              typeTextes={"attaches"}
            />
          ),
          key: "attaches"
        },
        {
          tab: "Texte salaires",
          panel: (
            <ConventionListeTextes
              conteneur={conteneur}
              typeTextes={"salaires"}
            />
          ),
          key: "salaires"
        },
        {
          tab: "Textes d'extensions",
          panel: (
            <ConventionListeTextes
              conteneur={conteneur}
              typeTextes={"extensions"}
            />
          ),
          key: "extensions"
        }
      ]}
    />
  </React.Fragment>
);

export default Convention;
