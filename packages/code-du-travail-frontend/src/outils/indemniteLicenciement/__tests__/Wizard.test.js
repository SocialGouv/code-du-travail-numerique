import React from "react";
import { render } from "react-testing-library";
import { Wizard } from "../Wizard";
import { Field } from "react-final-form";

const FirstStep = () => <p>Premiere Etape</p>;
FirstStep.validate = jest.fn();

const SecondStep = () => (
  <p>
    Deuxieme Etape <button>Submit</button>
  </p>
);
const FormStep = () => <Field name="firstName" component="input" />;

const FinalFormStep = {
  label: "final form",
  name: "final-form",
  component: FormStep
};
const steps = [
  {
    name: "firstStep",
    label: "First Step",
    component: FirstStep
  },
  {
    name: "secondStep",
    label: "Second Step",
    component: SecondStep
  }
];
describe("<Wizard />", () => {
  it("should render a step", () => {
    const onSubmit = jest.fn();
    const { container } = render(<Wizard steps={steps} onSubmit={onSubmit} />);
    expect(container).toMatchSnapshot();
  });
  it("should call onSubmit once finish", () => {
    const onSubmit = jest.fn();
    const { getByText } = render(
      <Wizard steps={steps} onSubmit={onSubmit} initialStepIndex={1} />
    );
    const button = getByText(/submit/i);
    button.click();
    expect(onSubmit).toHaveBeenCalled();
  });
  it("should call navigate to the second step when click on Suivant", () => {
    const onSubmit = jest.fn();
    const onUpdate = jest.fn();
    const { container, getByText } = render(
      <Wizard steps={steps} onSubmit={onSubmit} onUpdate={onUpdate} />
    );
    const button = getByText(/suivant/i);
    button.click();
    expect(onUpdate).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });
  it("should call Step.validate when click on Suivant", () => {
    const onSubmit = jest.fn();
    const { getByText } = render(<Wizard steps={steps} onSubmit={onSubmit} />);
    const button = getByText(/suivant/i);
    button.click();
    expect(FirstStep.validate).toHaveBeenCalled();
  });
  it("should call navigate the previous step when click on précédent", () => {
    const onSubmit = jest.fn();
    const { container, getByText } = render(
      <Wizard steps={steps} onSubmit={onSubmit} initialStepIndex={1} />
    );
    const button = getByText(/précédent/i);
    button.click();
    expect(container).toMatchSnapshot();
  });
  it("should handle initialData", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Wizard
        steps={[FinalFormStep]}
        onSubmit={onSubmit}
        initialData={{ firstName: "lionel" }}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it("should inject rules component", () => {
    const onSubmit = jest.fn();
    const Rule = () => <p>Rule</p>;
    const { container } = render(
      <Wizard
        steps={[FinalFormStep]}
        onSubmit={onSubmit}
        initialData={{ firstName: "lionel" }}
        rules={[<Rule key="key" />]}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
