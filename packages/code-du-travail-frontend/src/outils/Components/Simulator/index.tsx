import React, { Reducer, useMemo, useReducer } from "react";
import {
  CommonAction,
  CommonActionName,
  CommonReducer,
  CommonState,
} from "./types";
import { SimulatorDecorator } from "../index";
import { printResult } from "../../common/utils";
import commonReducer from "./commonReducer";

type Props<
  State extends CommonState,
  Action extends CommonAction<FormState>,
  FormState
> = {
  initialState: State;
  initialValues: FormState;
  stepReducer: CommonReducer<
    FormState,
    State,
    Action & CommonAction<FormState>
  >;
  duration?: string;
  icon?: string;
  title: string;
  renderStep: (label: string, state: State) => JSX.Element;
};

const Simulator = <
  State extends CommonState,
  Action extends CommonAction<FormState>,
  FormState
>({
  initialValues,
  initialState,
  stepReducer,
  icon,
  title,
  duration,
  renderStep,
}: Props<State, Action, FormState>): JSX.Element => {
  const [state, dispatch] = useReducer<
    Reducer<CommonState, CommonAction<FormState>>
  >(commonReducer(stepReducer, initialState), initialState);
  const { currentStepIndex, steps } = state;
  let currentValues = initialValues;

  const stepItems = useMemo(
    () =>
      steps.map(({ name, label }) => ({
        isValid: false,
        label,
        name,
      })),
    [steps]
  );

  const handlePageSubmit = (values: FormState, form) => {
    // This means the user clicked on a "restart a new simulation" button
    const nextStepIndex = currentStepIndex + 1;
    if (nextStepIndex >= steps.length) {
      dispatch({ type: CommonActionName.reset });
    } else {
      dispatch({
        type: CommonActionName.changeStep,
        payload: {
          values,
          currentStep: {
            index: nextStepIndex,
            step: steps[nextStepIndex],
          },
        },
      });
    }
  };

  const prevStep = () => {
    const previousStepIndex = currentStepIndex - 1;
    if (previousStepIndex >= 0) {
      dispatch({
        type: CommonActionName.changeStep,
        payload: {
          values: currentValues,
          currentStep: {
            index: previousStepIndex,
            step: steps[previousStepIndex],
          },
        },
      });
    } else {
      throw Error("Can't show the previous step with index less than 0");
    }
  };

  return (
    <SimulatorDecorator<FormState>
      initialValues={initialValues}
      title={{
        icon,
        title,
        duration,
        hasNoMarginBottom: false, // TODO steps[stepIndex].hasNoMarginBottom,
      }}
      navigation={{
        showNext: currentStepIndex < steps.length,
        onPrevious: currentStepIndex > 0 ? prevStep : undefined,
        onPrint:
          currentStepIndex == steps.length - 1
            ? () => printResult(title)
            : undefined,
      }}
      steps={{
        steps: stepItems,
        activeIndex: currentStepIndex,
        // TODO listRef: anchorRef,
      }}
      onFormStepSubmit={handlePageSubmit}
      showDebug={
        process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test"
      }
      renderStep={() =>
        renderStep(steps[currentStepIndex].label, state as State)
      }
      onFormStateUpdate={(values) => {
        currentValues = values;
        dispatch({
          type: CommonActionName.onChange,
          payload: {
            values,
            currentStep: {
              step: steps[currentStepIndex],
              index: currentStepIndex,
            },
          },
        });
      }}
    />
  );
};

export default Simulator;
