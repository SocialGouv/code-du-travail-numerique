import { Collapse } from "@socialgouv/cdtn-ui";
import { push as matopush } from "@socialgouv/matomo-next";
import React from "react";

import { MatomoBaseEvent, MatomoSimulatorEvent } from "../../lib";

type Props = {
  children: React.ReactNode;
  autoFocus?: boolean;
};

const ShowDetails = ({ children, autoFocus = false }: Props): JSX.Element => {
  const trackClick = () =>
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoBaseEvent.OUTIL,
      MatomoSimulatorEvent.CLICK_CALCUL_DETAIL,
    ]);

  return (
    <Collapse
      onClickHandler={trackClick}
      title={"Voir le détail du calcul"}
      autoFocus={autoFocus}
    >
      {children}
    </Collapse>
  );
};

export default ShowDetails;
