import { renderForm } from "../../../../../test/renderForm";
import { StepStatus } from "../Status";

describe("<StepStatus />", () => {
  it("should render", () => {
    const { container } = renderForm(StepStatus);
    expect(container).toMatchSnapshot();
  });
  it("should render seriousMisconduct", () => {
    const { container } = renderForm(StepStatus, {
      seriousMisconduct: false,
    });
    expect(container).toMatchSnapshot();
  });
  it("should render coefficient", () => {
    const { container } = renderForm(StepStatus, {
      disabledWorker: true,
      seriousMisconduct: false,
    });
    expect(container).toMatchSnapshot();
  });
});
