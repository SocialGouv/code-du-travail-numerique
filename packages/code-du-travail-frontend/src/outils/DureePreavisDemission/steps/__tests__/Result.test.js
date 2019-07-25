import { StepResult } from "../Result";
import { renderForm } from "../../../../../test/renderForm";

describe("<StepResult />", () => {
  it("should render", () => {
    const { container } = renderForm(StepResult);
    expect(container).toMatchSnapshot();
  });
});
