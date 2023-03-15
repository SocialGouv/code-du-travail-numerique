import React, { useContext, useEffect } from "react";
import { IndemniteLicenciementStepName } from "../..";
import {
  MatomoBaseEvent,
  MatomoActionEvent,
  MatomoSimulatorEvent,
} from "../../../../lib";
import { push as matopush } from "@socialgouv/matomo-next";

import {
  IndemniteLicenciementContext,
  useIndemniteLicenciementStore,
} from "../../store";
import Eligible from "./Eligible";
import Ineligible from "./Ineligible";

const StepResult = () => {
  const store = useContext(IndemniteLicenciementContext);
  const { isEligible, init } = useIndemniteLicenciementStore(
    store,
    (state) => ({
      isEligible: state.resultData.input.isEligible,
      init: state.resultFunction.init,
    })
  );

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoBaseEvent.OUTIL,
      MatomoActionEvent.INDEMNITE_LICENCIEMENT,
      isEligible
        ? IndemniteLicenciementStepName.Resultat
        : MatomoSimulatorEvent.STEP_RESULT_INELIGIBLE,
    ]);
  }, [isEligible]);

  return <>{isEligible ? <Eligible /> : <Ineligible />}</>;
};

export default StepResult;
