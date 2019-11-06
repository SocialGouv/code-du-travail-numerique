import { StepStatus } from "../Status";
import { renderForm } from "../../../../../test/renderForm";

describe("<StepStatus />", () => {
  it("should render", () => {
    const { container } = renderForm(StepStatus);
    expect(container).toMatchSnapshot();
  });
});
