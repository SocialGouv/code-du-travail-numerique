import { renderForm } from "../../../../../test/renderForm";
import { StepInformations } from "../Informations";

describe("<StepInformations />", () => {
  it("should render", () => {
    const { container } = renderForm(StepInformations);
    expect(container).toMatchSnapshot();
  });
  it("should render période d'essai", () => {
    const { container } = renderForm(StepInformations, {
      ccn: { num: 44 },
    });
    expect(container).toMatchSnapshot();
  });
  it("should render catégorie", () => {
    const { container } = renderForm(StepInformations, {
      ccn: { num: 44 },
      criteria: { "période essai": "1| oui" },
    });
    expect(container).toMatchSnapshot();
  });
  it("should render duree preavis", () => {
    const { container } = renderForm(StepInformations, {
      ccn: { num: 44 },
      criteria: {
        "catégorie socio-professionnelle": "28| Techniciens",
        "période essai": "1| oui",
      },
    });
    expect(container).toMatchSnapshot();
  });
  it("should render groupe", () => {
    const { container } = renderForm(StepInformations, {
      ccn: { num: 44 },
      criteria: {
        "catégorie socio-professionnelle": "28| Techniciens",
        "durée du préavis": "2| 6 jours",
        "période essai": "1| oui",
      },
    });
    expect(container).toMatchSnapshot();
  });
});
