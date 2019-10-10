import React from "react";
import { render } from "@testing-library/react";
import { Wizard } from "../Wizard";
import { stepReducer } from "../../IndemniteLicenciement/stepReducer";
import { Field } from "react-final-form";

const FirstStep = () => <p>Premiere Etape</p>;
FirstStep.validate = jest.fn();

const SecondStep = () => (
  <p>
    Deuxieme Etape <button>Submit</button>
  </p>
);
const steps = [
  {
    name: "first_step",
    label: "First Step",
    component: FirstStep
  },
  {
    name: "second_step",
    label: "Second Step",
    component: SecondStep
  }
];

const AdditionalStep = () => <Field name="firstName" component="input" />;
const additionalStep = {
  label: "Name",
  name: "additional_step",
  component: AdditionalStep
};

describe("<Wizard />", () => {
  it("should render a step", () => {
    const { container } = render(
      <Wizard stepReducer={stepReducer} initialSteps={steps} />
    );
    expect(container).toMatchSnapshot();
  });
  it("should navigate to the second step when click on Suivant", () => {
    const { container, getByText } = render(
      <Wizard stepReducer={stepReducer} initialSteps={steps} />
    );
    const button = getByText(/suivant/i);
    button.click();
    expect(container).toMatchSnapshot();
  });
  it("should call Step.validate when click on Suivant", () => {
    const { getByText } = render(
      <Wizard stepReducer={stepReducer} initialSteps={steps} />
    );
    const button = getByText(/suivant/i);
    button.click();
    expect(FirstStep.validate).toHaveBeenCalled();
  });
  it("should handle initialStepIndex", () => {
    const { container } = render(
      <Wizard
        stepReducer={stepReducer}
        initialSteps={steps}
        initialStepIndex={1}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it("should call navigate the previous step when click on précédent", () => {
    const { container, getByText } = render(
      <Wizard
        stepReducer={stepReducer}
        initialSteps={steps}
        initialStepIndex={1}
      />
    );
    const button = getByText(/précédent/i);
    button.click();
    expect(container).toMatchSnapshot();
  });
  it("should handle initialValues", () => {
    const { container } = render(
      <Wizard
        stepReducer={stepReducer}
        initialSteps={[...steps, additionalStep]}
        initialValues={{ firstName: "lionel" }}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it("should inject rules component", () => {
    const Rule = () => <p>Rule</p>;
    const { container } = render(
      <Wizard
        stepReducer={stepReducer}
        initialSteps={steps}
        Rules={() => <Rule key="key" />}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
