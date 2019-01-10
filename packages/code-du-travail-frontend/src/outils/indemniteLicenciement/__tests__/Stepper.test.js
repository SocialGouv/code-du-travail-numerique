import React from "react";
import { render } from "react-testing-library";
import { Stepper } from "../Stepper";

const Step1 = ({ value }) => <span>step1 name {value}</span>;
const Step2 = ({ value }) => <span>step2 name {value}</span>;

const steps = [
  { component: Step1, key: "step1", type: "base" },
  { component: Step2, key: "step2", type: "base" }
];
const model = {
  step1: "foo",
  step2: "bar"
};

function stepRender({ key, Component, onPrevious, onNext }) {
  return (
    <div>
      {onPrevious && <button onClick={onPrevious}>prev</button>}
      <Component value={model[key]} />
      {onNext && <button onClick={onNext}>next</button>}
    </div>
  );
}
describe("<Stepper />", () => {
  it("should render", () => {
    const { container } = render(<Stepper steps={steps} render={stepRender} />);
    expect(container).toMatchSnapshot();
  });

  it("should navigate to nex step", () => {
    const { container, getByText } = render(
      <Stepper steps={steps} render={stepRender} />
    );
    const nextButton = getByText(/next/);
    nextButton.click();
    expect(container).toMatchSnapshot();
  });

  it("should restart stepper", () => {
    const renderRestart = ({ restart }) => (
      <button onClick={restart}>restart</button>
    );
    const { container, getByText } = render(
      <Stepper
        steps={steps}
        render={stepRender}
        renderRestart={renderRestart}
      />
    );
    const nextButton = getByText(/next/);
    nextButton.click();
    nextButton.click();
    const restartButton = getByText(/restart/);
    restartButton.click();
    expect(container).toMatchSnapshot();
  });
  it("should display a restart button", () => {
    const renderRestart = ({ restart }) => (
      <button onClick={restart}>restart</button>
    );
    const { container, getByText } = render(
      <Stepper
        steps={steps}
        render={stepRender}
        renderRestart={renderRestart}
      />
    );
    const nextButton = getByText(/next/);
    nextButton.click();
    nextButton.click();
    expect(container).toMatchSnapshot();
  });
});
