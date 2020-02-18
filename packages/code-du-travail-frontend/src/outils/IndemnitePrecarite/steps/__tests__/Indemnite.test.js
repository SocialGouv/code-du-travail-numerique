import { StepIndemnite } from "../Indemnite";
import { CONTRACT_TYPE } from "../../components/TypeContrat";
import { renderForm } from "../../../../../test/renderForm";

const unhandledCC = {
  convention: {
    title:
      "Convention collective nationale de la cordonnerie multiservice du 7 août 1989. Elargie au secteur des cordonniers industriels ",
    shortTitle: "Cordonnerie multiservice",
    num: 1561
  }
};
const ccWithoutConventionalProvition = {
  convention: {
    title:
      "Convention collective nationale des etablissements privés d'hospitalisation, de soins, de cure et de garde à but non lucratif du 31 octobre 1951.",
    shortTitle:
      "Hospitalisation privée : établissements privés d'hospitalisation, de soins, de cure et de garde à but non lucratif (FEHAP)",
    num: 29
  }
};

const ccWitConventionalProvition = {
  convention: {
    title:
      "Convention collective nationale des bureaux d'études techniques, des cabinets d'ingénieurs-conseils et des sociétés de conseils du 15 décembre 1987. ",
    shortTitle:
      "Bureaux d'études techniques, cabinets d'ingénieurs-conseils et sociétés de conseils",
    num: 1486
  }
};

describe("<StepIndemnite />", () => {
  it("should render ctt indemnite", () => {
    const data = {
      contractType: CONTRACT_TYPE.CTT,
      typeRemuneration: "total",
      salaire: 3000
    };
    const { container } = renderForm(StepIndemnite, data);
    expect(container).toMatchSnapshot();
  });
  it("should render cdd indemnite with no ccn message", () => {
    const data = {
      typeRemuneration: "total",
      contractType: CONTRACT_TYPE.CDD,
      criteria: {
        cddType: "Autres"
      },
      salaire: 3000
    };
    const { container } = renderForm(StepIndemnite, data);
    expect(container).toMatchSnapshot();
  });
  it("should render cdd indemnite with unhandled cc message", () => {
    const data = {
      typeRemuneration: "total",
      contractType: CONTRACT_TYPE.CDD,
      ccn: unhandledCC,
      criteria: {
        cddType: "Autres"
      },
      salaire: 3000
    };
    const { container } = renderForm(StepIndemnite, data);
    expect(container).toMatchSnapshot();
  });
  it("should render cdd indemnite with no conventional provision message", () => {
    const data = {
      typeRemuneration: "total",
      contractType: CONTRACT_TYPE.CDD,
      ccn: ccWithoutConventionalProvition,
      criteria: {
        cddType: "Autres"
      },
      salaire: 3000
    };
    const { container } = renderForm(StepIndemnite, data);
    expect(container).toMatchSnapshot();
  });
  it("should render cdd indemnite with conventional provision message", () => {
    const data = {
      typeRemuneration: "total",
      contractType: CONTRACT_TYPE.CDD,
      ccn: ccWitConventionalProvition,
      criteria: {
        cddType: "Autres"
      },
      salaire: 3000
    };
    const { container } = renderForm(StepIndemnite, data);
    expect(container).toMatchSnapshot();
  });
});
