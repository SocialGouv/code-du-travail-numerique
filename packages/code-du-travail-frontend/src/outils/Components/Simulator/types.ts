export type Step = {
  name: string;
  label: string;
};

export type CommonState = {
  currentStepIndex: number;
  steps: Step[];
};

export enum CommonActionName {
  reset = "reset",
  changeStep = "changeStep",
  onChange = "onChange",
}

type CommonPayload<FormState> = {
  values: FormState;
  currentStep: {
    index: number;
    step: Step;
  };
};

export type CommonAction<FormState> =
  | { type: CommonActionName.reset }
  | { type: CommonActionName.changeStep; payload: CommonPayload<FormState> }
  | { type: CommonActionName.onChange; payload: CommonPayload<FormState> };

export type CommonReducer<
  FormState,
  CS extends CommonState,
  CA extends CommonAction<FormState>
> = (state: CS, action: CA) => CS;
