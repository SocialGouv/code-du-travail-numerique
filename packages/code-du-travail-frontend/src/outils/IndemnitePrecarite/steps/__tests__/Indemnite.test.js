import { renderForm } from "../../../../../test/renderForm";
import { CONTRACT_TYPE } from "../../components/TypeContrat";
import { StepIndemnite } from "../Indemnite";

const unhandledCC = {
  selected: {
    num: 1561,
    shortTitle: "Cordonnerie multiservice",
    title:
      "Convention collective nationale de la cordonnerie multiservice du 7 août 1989. Elargie au secteur des cordonniers industriels ",
  },
};
const ccWithoutConventionalProvition = {
  selected: {
    num: 1517,
    shortTitle:
      "Commerces de détail non alimentaires : antiquités, brocante, galeries d'art (œuvres d'art), arts de la table, coutellerie, droguerie, équipement du foyer, bazars, commerces ménagers, modélisme, jeux, jouets, puérinatalité, maroquinerie, presse et jeux de hasard ou pronostics, produits de la vape",
    title:
      "Commerces de détail non alimentaires : antiquités, brocante, galeries d'art (œuvres d'art), arts de la table, coutellerie, droguerie, équipement du foyer, bazars, commerces ménagers, modélisme, jeux, jouets, puérinatalité, maroquinerie, presse et jeux de hasard ou pronostics, produits de la vape",
  },
};

const ccWitConventionalProvition = {
  selected: {
    num: 1486,
    shortTitle:
      "Bureaux d'études techniques, cabinets d'ingénieurs-conseils et sociétés de conseils",
    title:
      "Convention collective nationale des bureaux d'études techniques, des cabinets d'ingénieurs-conseils et des sociétés de conseils du 15 décembre 1987. ",
  },
};

describe("<StepIndemnite />", () => {
  it("should render ctt indemnite", () => {
    const data = {
      contractType: CONTRACT_TYPE.CTT,
      salaire: 3000,
      typeRemuneration: "total",
    };
    const { container } = renderForm(StepIndemnite, data);
    expect(container).toMatchSnapshot();
  });
  it("should render cdd indemnite with no ccn message", () => {
    const data = {
      contractType: CONTRACT_TYPE.CDD,
      criteria: {
        cddType: "Autres",
      },
      salaire: 3000,
      typeRemuneration: "total",
    };
    const { container } = renderForm(StepIndemnite, data);
    expect(container).toMatchSnapshot();
  });
  it("should render cdd indemnite with unhandled cc message", () => {
    const data = {
      ccn: unhandledCC,
      contractType: CONTRACT_TYPE.CDD,
      criteria: {
        cddType: "Autres",
      },
      salaire: 3000,
      typeRemuneration: "total",
    };
    const { container } = renderForm(StepIndemnite, data);
    expect(container).toMatchSnapshot();
  });
  it("should render cdd indemnite with no conventional provision message", () => {
    const data = {
      ccn: ccWithoutConventionalProvition,
      contractType: CONTRACT_TYPE.CDD,
      criteria: {
        cddType: "Autres",
      },
      salaire: 3000,
      typeRemuneration: "total",
    };
    const { container } = renderForm(StepIndemnite, data);
    expect(container).toMatchSnapshot();
  });
  it("should render cdd indemnite with conventional provision message", () => {
    const data = {
      ccn: ccWitConventionalProvition,
      contractType: CONTRACT_TYPE.CDD,
      criteria: {
        cddType:
          "Contrat d'intervention dans le secteur d'activité d'organisation des foires, salons et congrès",
        hasCdiProposal: "non",
      },
      salaire: 3000,
      typeRemuneration: "total",
    };
    const { container } = renderForm(StepIndemnite, data);
    expect(container).toMatchSnapshot();
  });
});
