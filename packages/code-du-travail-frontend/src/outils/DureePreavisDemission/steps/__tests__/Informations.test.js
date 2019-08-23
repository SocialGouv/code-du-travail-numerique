import { StepInformations } from "../Informations";
import { renderForm } from "../../../../../test/renderForm";

describe("<StepInformations />", () => {
  it("should render", () => {
    const { container } = renderForm(StepInformations);
    expect(container).toMatchSnapshot();
  });
  it("should render catégorie", () => {
    const { container } = renderForm(StepInformations, {
      branche: "0044"
    });
    expect(container).toMatchSnapshot();
  });
  it("should render coefficient", () => {
    const { container } = renderForm(StepInformations, {
      branche: "0044",
      catégorie: "1 Employés"
    });
    expect(container).toMatchSnapshot();
  });
});
