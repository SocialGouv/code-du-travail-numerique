import { renderForm } from "../../../../../test/renderForm";
import { StepInformations } from "../Informations";

describe("<StepInformations />", () => {
  it("should render catégorie", () => {
    const { container } = renderForm(StepInformations, {
      ccn: { selected: { num: 44 } },
    });
    expect(container).toMatchSnapshot();
  });
  it("should render groupe", () => {
    const { container } = renderForm(StepInformations, {
      ccn: { selected: { num: 44 } },
      criteria: { "catégorie professionnelle": "23| Agents de maîtrise" },
    });
    expect(container).toMatchSnapshot();
  });
});
