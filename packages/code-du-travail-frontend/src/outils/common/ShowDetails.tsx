import { Collapse } from "@socialgouv/cdtn-ui";
import { push as matopush } from "@socialgouv/matomo-next";
import React from "react";
import styled from "styled-components";

import { MatomoBaseEvent, MatomoSimulatorEvent } from "../../lib";

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
    <StyledCollapse
      onClickHandler={trackClick}
      title={"Voir le détail du calcul"}
    >
      {children}
    </StyledCollapse>
  );
};

export default ShowDetails;

const StyledCollapse = styled(Collapse)`
  button {
    height: 100%;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
