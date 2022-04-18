import { MatomoBaseEvent, MatomoRetirementEvent } from "../../lib";
import { matopush } from "../../piwik";
import { pushAgreementEvents } from "../common";
import {
  Action,
  ActionName,
  FormContent,
  State,
} from "../common/type/WizardType";
import Steps from "./steps";
import IntroAnnotation from "./steps/component/IntroAnnotation";
import { getSupportedCC } from "./steps/utils";

export const initialState: State = {
  stepIndex: 0,
  steps: [
    {
      annotation: <IntroAnnotation />,
      component: () => <Steps.IntroductionStep />,
      label: "Introduction",
      name: "intro",
    },
    {
      component: ({ form }) => (
        <Steps.OrigineStep
          isVoluntary={
            form.getState().values["contrat salarié - mise à la retraite"] ===
            "non"
          }
        />
      ),
      isForm: true,
      label: "Origine du départ à la retraite",
      name: "origine",
      onStepDone: (title: string, data: FormContent): void => {
        matopush([
          MatomoBaseEvent.TRACK_EVENT,
          MatomoBaseEvent.OUTIL,
          data["contrat salarié - mise à la retraite"] === "oui"
            ? MatomoRetirementEvent.MISE_RETRAITE
            : MatomoRetirementEvent.DEPART_RETRAITE,
        ]);
      },
    },
    {
      component: ({ form, title }) => (
        <Steps.AgreementStep form={form} title={title} />
      ),
      label: "Convention collective",
      name: "ccn",
      onStepDone: (title: string, values: FormContent): void => {
        pushAgreementEvents(title, values.ccn, getSupportedCC());
      },
    },
    {
      component: ({ form }) => <Steps.Informations form={form} />,
      isForm: true,
      label: "Informations",
      name: "infos",
    },
    {
      component: ({ form }) => <Steps.AncienneteStep form={form} />,
      isForm: true,
      label: "Ancienneté",
      name: "anciennete",
      onStepDone: (title: string, data: FormContent): void => {
        matopush([
          MatomoBaseEvent.TRACK_EVENT,
          MatomoBaseEvent.OUTIL,
          data.seniorityGreaterThanTwoYears
            ? MatomoRetirementEvent.ANCIENNETE_PLUS_2_ANS
            : MatomoRetirementEvent.ANCIENNETE_MOINS_2_ANS,
        ]);
      },
    },
    {
      component: ({ form }) => (
        <Steps.ResultStep values={form.getState().values} />
      ),
      label: "Résultat",
      name: "result",
    },
  ],
};

export function stepReducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionName.reset: {
      return { ...initialState };
    }
    case ActionName.setStepIndex: {
      return { stepIndex: action.payload, steps: state.steps };
    }
  }
}
