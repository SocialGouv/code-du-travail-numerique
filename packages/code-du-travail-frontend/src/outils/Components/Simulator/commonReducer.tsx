import {
  CommonAction,
  CommonActionName,
  CommonReducer,
  CommonState,
} from "./types";

const commonReducer =
  <
    State extends CommonState,
    Action extends CommonAction<FormState>,
    FormState
  >(
    stepReducer: CommonReducer<
      FormState,
      State,
      Action & CommonAction<FormState>
    >,
    initialState: State
  ) =>
  (state: State, action: Action): State => {
    const newState = stepReducer(state, action);
    switch (action.type) {
      case CommonActionName.reset: {
        return { ...initialState };
      }
      case CommonActionName.changeStep: {
        // TODO Send motomo event ?
        return {
          ...newState,
          currentStepIndex: action.payload.currentStep.index,
        };
      }
      case CommonActionName.onChange: {
        return newState;
      }
    }
  };

export default commonReducer;
