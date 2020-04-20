import React from "react";
import { render } from "@testing-library/react";
import { Wizard } from "../Wizard";
import { stepReducer } from "../../IndemniteLicenciement/stepReducer";
import { Field } from "react-final-form";
import { matopush } from "../../../piwik";
import { OnChange } from "react-final-form-listeners";

jest.mock("../../../piwik", () => {
  let events = [];
  return {
    matopush: jest.fn().mockImplementation((event) => events.push(event)),
    events,
    flushEvents() {
      events = [];
    },
  };
});

const FirstStep = () => <p>Premiere Etape</p>;
FirstStep.validate = jest.fn();

const SecondStep = () => (
  <>
    <p>Deuxieme Etape</p>
    <label htmlFor="cb">
      etape facultative
      <Field id="cb" name="fooStep" component="input" type="checkbox" />
    </label>
  </>
);
const steps = [
  {
    name: "first_step",
    label: "First Step",
    component: FirstStep,
  },
  {
    name: "second_step",
    label: "Second Step",
    component: SecondStep,
  },
];

const initialState = { stepIndex: 0, steps };

const OptionnalStep = () => <p>etape optionnelle</p>;
const optionnalStep = {
  label: "Optional Step",
  name: "additional_step",
  component: OptionnalStep,
};
const skipableStep = {
  name: "skippable",
  label: "Skippable Step",
  skip: () => true,
  component: function Skipable() {
    return <p>skipable component</p>;
  },
};

describe("<Wizard />", () => {
  it("should render a step", () => {
    const { container } = render(
      <Wizard
        title="test"
        stepReducer={stepReducer}
        initialState={initialState}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it("should navigate to the second step when click on Suivant", () => {
    const { container, getByText } = render(
      <Wizard
        title="test"
        stepReducer={stepReducer}
        initialState={initialState}
      />
    );
    const button = getByText(/suivant/i);
    button.click();
    expect(matopush).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      "view_step_test",
      "second_step",
    ]);
    expect(container).toMatchSnapshot();
  });
  it("should call Step.validate when click on Suivant", () => {
    const { getByText } = render(
      <Wizard
        title="test"
        stepReducer={stepReducer}
        initialState={initialState}
      />
    );
    const button = getByText(/suivant/i);
    button.click();
    expect(FirstStep.validate).toHaveBeenCalled();
  });
  it("should handle initialState.stepIndex", () => {
    const state = { stepIndex: 1, steps: steps };
    const { container } = render(
      <Wizard title="test" stepReducer={stepReducer} initialState={state} />
    );
    expect(container).toMatchSnapshot();
  });
  it("should call navigate the previous step when click on précédent", () => {
    const state = { stepIndex: 1, steps: steps };
    const { container, getByText } = render(
      <Wizard title="test" stepReducer={stepReducer} initialState={state} />
    );
    const button = getByText(/précédent/i);
    button.click();
    expect(container).toMatchSnapshot();
    expect(matopush).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      "click_previous_test",
      "first_step",
    ]);
  });
  it("should handle initialValues", () => {
    const state = { stepIndex: 0, steps: steps.concat(optionnalStep) };
    const { container } = render(
      <Wizard
        title="test"
        stepReducer={stepReducer}
        initialState={state}
        initialValues={{ firstName: "lionel" }}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it("should inject rules component", () => {
    const Rule = () => <p>Rule</p>;
    const { container } = render(
      <Wizard
        title="test"
        stepReducer={stepReducer}
        initialState={initialState}
        Rules={() => <Rule key="key" />}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("should skip step forward", () => {
    const [step1, step2] = steps;
    const state = {
      stepIndex: 0,
      steps: [step1, skipableStep, step2],
    };

    const { getByText } = render(
      <Wizard title="test" stepReducer={stepReducer} initialState={state} />
    );
    const button = getByText(/suivant/i);
    button.click();
    expect(getByText("Deuxieme Etape")).toBeTruthy();
  });

  it("should skip step backward", () => {
    const [step1, step2] = steps;

    const state = {
      stepIndex: 2,
      steps: [step1, skipableStep, step2],
    };

    const { getByText } = render(
      <Wizard title="test" stepReducer={stepReducer} initialState={state} />
    );
    const button = getByText(/précédent/i);
    button.click();
    expect(getByText("Premiere Etape")).toBeTruthy();
  });

  it("should navigate to a dynamic step ", () => {
    const RulesAdditionalStep = ({ dispatch }) => (
      <OnChange key="foo-rules" name="fooStep">
        {(value) => {
          if (value === true) {
            dispatch({
              type: "add_step",
              payload: { insertAfter: "second_step", step: optionnalStep },
            });
          }
        }}
      </OnChange>
    );

    const { getByText, getByLabelText } = render(
      <Wizard
        title="test"
        stepReducer={stepReducer}
        initialState={initialState}
        Rules={RulesAdditionalStep}
      />
    );
    getByText(/suivant/i).click(); // step 2
    getByLabelText("etape facultative").click();
    getByText(/suivant/i).click(); // additionalStep
    expect(getByText("etape optionnelle")).toBeTruthy();
  });
});
