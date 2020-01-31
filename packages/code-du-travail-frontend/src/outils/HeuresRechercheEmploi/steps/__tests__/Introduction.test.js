import { StepIntro } from "../Introduction";
import { renderForm } from "../../../../../test/renderForm";

describe("<StepIntro />", () => {
  it("should render", () => {
    const { container } = renderForm(StepIntro);
    expect(container).toMatchSnapshot();
  });
});
