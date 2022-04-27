import { push as matopush } from "@socialgouv/matomo-next";
import { render } from "@testing-library/react";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";

import { stepReducer } from "../../IndemniteLicenciement/stepReducer";
import { Wizard } from "../Wizard";

const FirstStep = () => <p>Premiere Etape</p>;
FirstStep.validate = jest.fn();

jest.mock("@socialgouv/matomo-next", () => {
  return {
    push: jest.fn(),
  };
});

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
    component: FirstStep,
    label: "First Step",
    name: "first_step",
  },
  {
    component: SecondStep,
    label: "Second Step",
    name: "second_step",
  },
];

const initialState = { stepIndex: 0, steps };

const OptionnalStep = () => <p>etape optionnelle</p>;
const optionnalStep = {
  component: OptionnalStep,
  label: "Optional Step",
  name: "additional_step",
};
const skipableStep = {
  component: function Skipable() {
    return <p>skipable component</p>;
  },
  label: "Skippable Step",
  name: "skippable",
  skip: () => true,
};

describe("<Wizard />", () => {
  it("should render a step", () => {
    const { container } = render(
      <Wizard
        title="test"
        titleH1="test H1"
        stepReducer={stepReducer}
        initialState={initialState}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it("should navigate to the second step when click on Commencer", () => {
    const { container, getByText } = render(
      <Wizard
        title="test"
        titleH1="test H1"
        stepReducer={stepReducer}
        initialState={initialState}
      />
    );
    const button = getByText(/commencer/i);
    button.click();
    expect(matopush).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      "view_step_test",
      "second_step",
    ]);
    expect(container).toMatchSnapshot();
  });
  it("should call Step.validate when click on Commencer", () => {
    const { getByText } = render(
      <Wizard
        title="test"
        titleH1="test H1"
        stepReducer={stepReducer}
        initialState={initialState}
      />
    );
    const button = getByText(/Commencer/i);
    button.click();
    expect(FirstStep.validate).toHaveBeenCalled();
  });
  it("should handle initialState.stepIndex", () => {
    const state = { stepIndex: 1, steps: steps };
    const { container } = render(
      <Wizard
        title="test"
        titleH1="test H1"
        stepReducer={stepReducer}
        initialState={state}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it("should call navigate the previous step when click on précédent", () => {
    const state = { stepIndex: 1, steps: steps };
    const { container, getByText } = render(
      <Wizard
        title="test"
        titleH1="test H1"
        stepReducer={stepReducer}
        initialState={state}
      />
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
        titleH1="test H1"
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
        titleH1="test H1"
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
      <Wizard
        title="test"
        titleH1="test H1"
        stepReducer={stepReducer}
        initialState={state}
      />
    );
    const button = getByText(/Commencer/i);
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
      <Wizard
        title="test"
        titleH1="test H1"
        stepReducer={stepReducer}
        initialState={state}
      />
    );
    const button = getByText(/précédent/i);
    button.click();
    expect(getByText("Premiere Etape")).toBeTruthy();
  });

  it("should navigate to a dynamic step", () => {
    const RulesAdditionalStep = ({ dispatch }) => (
      <OnChange key="foo-rules" name="fooStep">
        {(value) => {
          if (value === true) {
            dispatch({
              payload: { insertAfter: "second_step", step: optionnalStep },
              type: "add_step",
            });
          }
        }}
      </OnChange>
    );

    const { getByText, getByLabelText } = render(
      <Wizard
        title="test"
        titleH1="test H1"
        stepReducer={stepReducer}
        initialState={initialState}
        Rules={RulesAdditionalStep}
      />
    );
    getByText(/Commencer/i).click(); // step 2
    getByLabelText("etape facultative").click();
    getByText(/suivant/i).click(); // additionalStep
    expect(getByText("etape optionnelle")).toBeTruthy();
  });
});
