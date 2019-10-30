import { StepInformations } from "../Informations";
import { renderForm } from "../../../../../test/renderForm";

describe("<StepInformations />", () => {
  it("should render", () => {
    const { container } = renderForm(StepInformations);
    expect(container).toMatchSnapshot();
  });
  it("should render catégorie", () => {
    const { container } = renderForm(StepInformations, {
      ccn: { num: "0292" }
    });
    expect(container).toMatchSnapshot();
  });
  it("should render coefficient", () => {
    const { container } = renderForm(StepInformations, {
      ccn: { num: "0292" },
      criteria: { "catégorie socio-professionnelle": "38| Collaborateurs" }
    });
    expect(container).toMatchSnapshot();
  });
});
