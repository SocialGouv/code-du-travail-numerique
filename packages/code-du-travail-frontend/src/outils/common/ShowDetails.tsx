import { Collapse } from "@socialgouv/cdtn-ui";
import React from "react";

import { MatomoBaseEvent, MatomoSimulatorEvent } from "../../lib";
import { matopush } from "../../piwik";

type Props = {
  children: React.ReactNode;
};

const ShowDetails = ({ children }: Props): JSX.Element => {
  const trackClick = () =>
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoBaseEvent.OUTIL,
      MatomoSimulatorEvent.CLICK_CALCUL_DETAIL,
    ]);

  return (
    <Collapse onClickHandler={trackClick} title={"Voir le détail du calcul"}>
      {children}
    </Collapse>
  );
};

export default ShowDetails;
