import { IntroductionStep } from "./steps/Introduction";

export const initialState = {
  stepIndex: 0,
  steps: [
    {
      component: IntroductionStep,
      label: "Introduction",
      name: "intro",
    },
  ],
};

export function stepReducer(state, { type, payload }) {
  switch (type) {
    case "reset": {
      return { ...initialState };
    }
    case "setStepIndex": {
      return { stepIndex: payload, steps: state.steps };
    }
    default:
      console.warn("action unknow", type);
      return state;
  }
}
