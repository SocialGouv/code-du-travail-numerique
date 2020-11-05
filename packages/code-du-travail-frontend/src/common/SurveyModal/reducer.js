import { CompanyStep } from "./steps/Company";
import { FinalStep } from "./steps/Final";
import { ImprovementsStep } from "./steps/Improvements";
import { StatusStep } from "./steps/Status";

const steps = [
  { component: StatusStep, name: "status" },
  { component: CompanyStep, name: "company" },
  { component: ImprovementsStep, name: "improvements" },
  { component: FinalStep, name: "final" },
];

export const PAGES_NUMBER = 3; // final step doesn’t count

export const initialState = {
  companySize: "",
  improvements: [],
  pageNumber: 1,
  status: "",
  step: StatusStep,
  suggestion: "",
};

export const reducer = (state, action) => {
  let stepIndex;
  switch (action.type) {
    case "goTo":
      stepIndex = steps.findIndex((step) => step.name === action.payload);
      if (stepIndex === -1) {
        throw new Error("Wrong step provided in Survey reducer");
      }
      return {
        ...state,
        pageNumber: stepIndex + 1,
        step: steps[stepIndex].component,
      };
    case "setStatus":
      return {
        ...state,
        status: action.payload,
      };
    case "setSuggestion":
      return {
        ...state,
        suggestion: action.payload,
      };
    case "setTailleEntreprise":
      return {
        ...state,
        companySize: action.payload,
      };
    case "setImprovement":
      return {
        ...state,
        improvements: [...state.improvements, action.payload],
      };
    case "removeImprovement":
      return {
        ...state,
        improvements: state.improvements.filter(
          (improvement) => improvement !== action.payload
        ),
      };
    default:
      throw new Error("Wrong action type in Survey reducer");
  }
};
