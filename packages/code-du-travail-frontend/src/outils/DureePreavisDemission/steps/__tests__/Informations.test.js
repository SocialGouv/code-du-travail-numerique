import { StepInformations } from "../Informations";
import { renderForm } from "../../../../../test/renderForm";

describe("<StepInformations />", () => {
  it("should render", () => {
    const { container } = renderForm(StepInformations);
    expect(container).toMatchSnapshot();
  });
  it("should render catégorie", () => {
    const { container } = renderForm(StepInformations, {
      ccn: { convention: { num: "292" } }
    });
    expect(container).toMatchSnapshot();
  });
  it("should render coefficient", () => {
    const { container } = renderForm(StepInformations, {
      ccn: { convention: { num: "292" } },
      criteria: { "catégorie socio-professionnelle": "42| Collaborateurs" }
    });
    expect(container).toMatchSnapshot();
  });
});
