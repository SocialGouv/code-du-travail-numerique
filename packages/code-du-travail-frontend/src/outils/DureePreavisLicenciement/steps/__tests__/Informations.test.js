import { StepInformations } from "../Informations";
import { renderForm } from "../../../../../test/renderForm";

describe("<StepInformations />", () => {
  it("should render", () => {
    const { container } = renderForm(StepInformations);
    expect(container).toMatchSnapshot();
  });
  it("should render catégorie", () => {
    const { container } = renderForm(StepInformations, {
      ccn: { convention: { num: 44 } }
    });
    expect(container).toMatchSnapshot();
  });
  it("should render groupe", () => {
    const { container } = renderForm(StepInformations, {
      ccn: { convention: { num: 44 } },
      criteria: { "catégorie socio-professionnelle": "23| Agents de maîtrise" }
    });
    expect(container).toMatchSnapshot();
  });
});
