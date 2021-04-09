import Steps from "./steps";

export const initialState = {
  stepIndex: 0,
  steps: [
    {
      component: Steps.IntroductionStep,
      label: "Introduction",
      name: "intro",
    },
    {
      component: Steps.OrigineStep,
      label: "Origine du départ à la retraite",
      name: "origine",
    },
    {
      component: Steps.AncienneteStep,
      label: "Ancienneté",
      name: "anciennete",
    },
    {
      component: Steps.ResultStep,
      label: "Résultat",
      name: "result",
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
