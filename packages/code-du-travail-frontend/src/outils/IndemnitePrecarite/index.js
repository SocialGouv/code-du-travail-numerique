import React from "react";

import { Wizard } from "../common/Wizard";
import { initialState, stepReducer } from "./stepReducer";

function SimulateurIndemnitePrecarite({ icon, title }) {
  return (
    <Wizard
      icon={icon}
      title={title}
      initialState={initialState}
      stepReducer={stepReducer}
      initialValues={{
        ccn: {
          convention: {
            id: "KALICONT000005635613",
            slug: "44-industries-chimiques-et-connexes",
            title:
              "Convention collective nationale des industries chimiques et connexes du 30 décembre 1952. Étendue par arrêté du 13 novembre 1956 JONC 12 décembre 1956",
            shortTitle: "Industries chimiques et connexes",
            num: 44
          },
          label: ""
        },
        contractType: "CDD",
        criteria: {
          cddType: "Autres"
        },
        finContratPeriodeDessai: false,
        propositionCDIFindeContrat: false,
        refusCDIFindeContrat: false,
        interruptionFauteGrave: false,
        refusRenouvellementAuto: false,
        typeRemuneration: "total",
        salaires: [],
        salaire: "1000"
      }}
    />
  );
}

export { SimulateurIndemnitePrecarite };
