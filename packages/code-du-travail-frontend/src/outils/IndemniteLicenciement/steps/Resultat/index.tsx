import React, { useEffect } from "react";
import { IndemniteLicenciementStepName } from "../..";
import {
  MatomoBaseEvent,
  MatomoActionEvent,
  MatomoSimulatorEvent,
} from "../../../../lib";
import { push as matopush } from "@socialgouv/matomo-next";

import { useIndemniteLicenciementStore } from "../../store";
import Eligible from "./Eligible";
import Ineligible from "./Ineligible";

const StepResult = () => {
  const { isEligible, init } = useIndemniteLicenciementStore((state) => ({
    isEligible: state.resultData.input.isEligible,
    init: state.resultFunction.init,
  }));

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
  }, []);

  return <>{isEligible ? <Eligible /> : <Ineligible />}</>;
};

export default StepResult;
