import { Collapse } from "@socialgouv/cdtn-ui";
import React from "react";

import { matopush } from "../../piwik";
import { MatomoCommonEvent, MatomoPreavisRetraiteEvent } from "./type/matomo";

type Props = {
  children: React.ReactNode;
};

const ShowDetails = ({ children }: Props): JSX.Element => {
  const trackClick = () =>
    matopush([
      MatomoCommonEvent.TRACK_EVENT,
      MatomoCommonEvent.OUTIL,
      MatomoPreavisRetraiteEvent.CLICK_CALCUL_DETAIL,
    ]);

  return (
    <Collapse onClickHandler={trackClick} title={"Voir le détail du calcul"}>
      {children}
    </Collapse>
  );
};

export default ShowDetails;
