import { StepStatus } from "../Status";
import { renderForm } from "../../../../../test/renderForm";

describe("<StepStatus />", () => {
  it("should render", () => {
    const { container } = renderForm(StepStatus);
    expect(container).toMatchSnapshot();
  });
  it("should render seriousMisconduct", () => {
    const { container } = renderForm(StepStatus, {
      seriousMisconduct: false
    });
    expect(container).toMatchSnapshot();
  });
  it("should render coefficient", () => {
    const { container } = renderForm(StepStatus, {
      seriousMisconduct: false,
      disabledWorker: true
    });
    expect(container).toMatchSnapshot();
  });
});
