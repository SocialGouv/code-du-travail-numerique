import { renderForm } from "../../../../../test/renderForm";
import { StepIntro } from "../Introduction";

describe("<StepIntro />", () => {
  it("should render", () => {
    const { container } = renderForm(StepIntro);
    expect(container).toMatchSnapshot();
  });
});
