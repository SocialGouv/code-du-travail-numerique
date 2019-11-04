import { StepRenseignements } from "../Renseignements";
import { renderForm } from "../../../../../test/renderForm";

describe("<StepRenseignements />", () => {
  it("should render", () => {
    const { container } = renderForm(StepRenseignements);
    expect(container).toMatchSnapshot();
  });
});
