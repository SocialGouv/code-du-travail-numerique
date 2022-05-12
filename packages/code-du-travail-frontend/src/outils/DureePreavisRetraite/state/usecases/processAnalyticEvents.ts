import { Step } from "../../../Simulator";
import { StepName } from "../../steps";
import { matopush } from "../../../../piwik";
import { MatomoBaseEvent, MatomoRetirementEvent } from "../../../../lib";
import { pushAgreementEvents } from "../../../common";
import { getSupportedCC } from "../../steps/AgreementStep/RenderStep";
import { PreavisRetraiteStore } from "..";

const processAnalyticEvents = (
  state: PreavisRetraiteStore,
  oldStep: Step<StepName>,
  newStep: Step<StepName>
) => {
  switch (true) {
    case oldStep.name === StepName.Origin &&
      newStep.name === StepName.Agreement:
      matopush([
        MatomoBaseEvent.TRACK_EVENT,
        MatomoBaseEvent.OUTIL,
        state.formValues.origin?.isRetirementMandatory
          ? MatomoRetirementEvent.MISE_RETRAITE
          : MatomoRetirementEvent.DEPART_RETRAITE,
      ]);
      break;
    case oldStep.name === StepName.Agreement && newStep.name === StepName.Infos:
      pushAgreementEvents(state.title, state.formValues.ccn, getSupportedCC());
      break;
    case oldStep.name === StepName.Seniority &&
      newStep.name === StepName.Result:
      matopush([
        MatomoBaseEvent.TRACK_EVENT,
        MatomoBaseEvent.OUTIL,
        state.formValues.seniority?.moreThanXYear
          ? MatomoRetirementEvent.ANCIENNETE_PLUS_2_ANS
          : MatomoRetirementEvent.ANCIENNETE_MOINS_2_ANS,
      ]);
      break;
  }
};

export default processAnalyticEvents;
