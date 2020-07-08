import { renderForm } from "../../../../../test/renderForm";
import { StepInformations } from "../Informations";

describe("<StepInformations />", () => {
  it("should render", () => {
    const { container } = renderForm(StepInformations);
    expect(container).toMatchSnapshot();
  });
  it("should render catégorie", () => {
    const { container } = renderForm(StepInformations, {
      ccn: { num: 292 },
    });
    expect(container).toMatchSnapshot();
  });
  it("should render coefficient", () => {
    const { container } = renderForm(StepInformations, {
      ccn: { num: 292 },
      criteria: { "catégorie professionnelle": "42| Collaborateurs" },
    });
    expect(container).toMatchSnapshot();
  });
});
