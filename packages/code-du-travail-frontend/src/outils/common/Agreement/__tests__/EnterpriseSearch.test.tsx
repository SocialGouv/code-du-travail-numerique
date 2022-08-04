import { render } from "@testing-library/react";
import React from "react";

import { EmbeddedForm } from "../../../../../test/TestForm";
import { Enterprise } from "../../../../conventions/Search/api/enterprises.service";
import { Agreement } from "../../../../conventions/Search/api/type";
import type { Props } from "../EnterpriseSearch/EnterpriseSearch";
import EnterpriseSearch from "../EnterpriseSearch/EnterpriseSearch";

const callback: (
  agreement: Agreement | null,
  enterprise?: Enterprise
) => void = () => {
  /* nothing to do */
};
const onSelectAgreement = jest.fn(callback);
const onUserAction = () => {
  /* dummy */
};

const agreement1: Agreement = {
  id: "KALICONT000005635093",
  url: "hello.com",
  num: 2156,
  shortTitle: "Grands magasins et magasins populaires",
  slug: "2156-grands-magasins-et-magasins-populaires",
  title:
    "Convention collective nationale des grand magasins et des magasins populaires du 30 juin 2000.  Etendue par arrêté du 20 décembre 2001 JORF 19 janvier 2002.",
};

const agreement2: Agreement = {
  id: "KALICONT000005635085",
  num: 2216,
  shortTitle: "Commerce de détail et de gros à prédominance alimentaire",
  slug: "2216-commerce-de-detail-et-de-gros-a-predominance-alimentaire",
  title:
    "Convention collective nationale du commerce de détail et de gros à prédominance alimentaire du 12 juillet 2001.  Etendue par arrêté du 26 juillet 2002 JORF 6 août 2002.",
};

const selectedEnterpriseOneAgreement: Enterprise = {
  activitePrincipale:
    "Commerce de détail en magasin non spécialisé à prédominance alimentaire",
  conventions: [agreement1],
  etablissements: 335,
  highlightLabel: "<b><u>MONOPRIX</u></b> EXPLOITATION, PAR ABREVIATION MPX",
  label: "MONOPRIX EXPLOITATION, PAR ABREVIATION MPX",
  matching: 272,
  simpleLabel: "MONOPRIX EXPLOITATION",
  siren: "552083297",
};

const selectedEnterpriseTwoAgreements: Enterprise = {
  activitePrincipale:
    "Commerce de détail en magasin non spécialisé à prédominance alimentaire",
  conventions: [agreement1, agreement2],
  etablissements: 335,
  highlightLabel: "<b><u>MONOPRIX</u></b> EXPLOITATION, PAR ABREVIATION MPX",
  label: "MONOPRIX EXPLOITATION, PAR ABREVIATION MPX",
  matching: 272,
  simpleLabel: "MONOPRIX EXPLOITATION",
  siren: "552083297",
};

describe("EnterpriseSearch", () => {
  describe("no selected enterprise", () => {
    const dataWithoutSelectedEnterprise: Props = {
      onSelectAgreement,
      onUserAction,
      supportedAgreements: [],
    };

    it("should render the mandatory question 'Nom de votre entreprise ou numéro Siret' and not mandatory 'Code postal ou ville'", () => {
      const { getByText } = render(
        <EmbeddedForm<Props>
          Step={EnterpriseSearch}
          props={dataWithoutSelectedEnterprise}
        />
      );
      expect(
        getByText(/Nom de votre entreprise ou numéro Siret/)
      ).toBeInTheDocument();
      expect(getByText(/\(obligatoire\)/)).toBeInTheDocument();
      expect(getByText(/Code postal ou ville/)).toBeInTheDocument();
    });

    it("should show inputs to search the enterprise", () => {
      const { getByPlaceholderText } = render(
        <EmbeddedForm<Props>
          Step={EnterpriseSearch}
          props={dataWithoutSelectedEnterprise}
        />
      );
      expect(
        getByPlaceholderText("Ex : Café de la gare ou 40123778000127")
      ).toBeInTheDocument();
      expect(
        getByPlaceholderText("Ex : 31000 ou Toulouse")
      ).toBeInTheDocument();
    });

    it("should show an error when submit", () => {
      const { getByText, queryByText } = render(
        <EmbeddedForm<Props>
          Step={EnterpriseSearch}
          props={dataWithoutSelectedEnterprise}
        />
      );
      getByText("Submit").click();
      expect(
        queryByText(/Vous devez sélectionner une entreprise/)
      ).toBeInTheDocument();
    });
  });

  describe("selected enterprise with one agreement", () => {
    const dataWithSelectedEnterpriseWithOneAgreement: Props = {
      onSelectAgreement,
      onUserAction,
      selectedEnterprise: selectedEnterpriseOneAgreement,
      supportedAgreements: [],
    };

    it("should show the default agreement", () => {
      const { getByText } = render(
        <EmbeddedForm<Props>
          Step={EnterpriseSearch}
          props={dataWithSelectedEnterpriseWithOneAgreement}
        />
      );
      expect(
        getByText(
          /Une convention collective a été trouvée pour cette entreprise/
        )
      ).toBeInTheDocument();
      expect(getByText(new RegExp(agreement1.shortTitle))).toBeInTheDocument();
    });

    it("should show the enterprise title", () => {
      const { getByText } = render(
        <EmbeddedForm<Props>
          Step={EnterpriseSearch}
          props={dataWithSelectedEnterpriseWithOneAgreement}
        />
      );
      expect(
        getByText(new RegExp(selectedEnterpriseOneAgreement.simpleLabel))
      ).toBeInTheDocument();
    });

    it("should show a button to remove the selection", () => {
      const { getByRole } = render(
        <EmbeddedForm<Props>
          Step={EnterpriseSearch}
          props={dataWithSelectedEnterpriseWithOneAgreement}
        />
      );
      const button = getByRole("button", { name: "Fermer" });
      expect(button).toBeInTheDocument();
    });

    it("should invite the user to click on next to continue the simulation", () => {
      const { getByText } = render(
        <EmbeddedForm<Props>
          Step={EnterpriseSearch}
          props={dataWithSelectedEnterpriseWithOneAgreement}
        />
      );
      expect(
        getByText("Cliquez sur Suivant pour poursuivre la simulation.")
      ).toBeInTheDocument();
    });

    it("should not show an error when submit", () => {
      const { getByText, queryByText } = render(
        <EmbeddedForm<Props>
          Step={EnterpriseSearch}
          props={dataWithSelectedEnterpriseWithOneAgreement}
        />
      );
      getByText("Submit").click();
      expect(
        queryByText(/Vous devez répondre à cette question/)
      ).not.toBeInTheDocument();
    });

    it("should callback when user remove the selected enterprise", () => {
      onSelectAgreement.mockClear();
      const { getByRole } = render(
        <EmbeddedForm<Props>
          Step={EnterpriseSearch}
          props={dataWithSelectedEnterpriseWithOneAgreement}
        />
      );
      const button = getByRole("button", { name: "Fermer" });
      button.click();
      expect(onSelectAgreement.mock.calls).toHaveLength(1);
      expect(onSelectAgreement.mock.calls[0][0]).toBeNull();
    });
  });

  describe("selected enterprise with two agreements", () => {
    const dataWithSelectedEnterpriseWithTwoAgreements: Props = {
      onSelectAgreement,
      onUserAction,
      selectedEnterprise: selectedEnterpriseTwoAgreements,
      supportedAgreements: [],
    };
    it("should show the agreements selection", () => {
      const { getByText, queryByText } = render(
        <EmbeddedForm<Props>
          Step={EnterpriseSearch}
          props={dataWithSelectedEnterpriseWithTwoAgreements}
        />
      );
      expect(
        getByText(
          /2 conventions collectives ont été trouvées pour cette entreprise, sélectionnez la vôtre/
        )
      ).toBeInTheDocument();
      expect(getByText(new RegExp(agreement1.shortTitle))).toBeInTheDocument();
      expect(getByText(new RegExp(agreement2.shortTitle))).toBeInTheDocument();
      expect(
        queryByText(/Cliquez sur Suivant pour poursuivre la simulation/)
      ).not.toBeInTheDocument();
    });

    it("should show the enterprise title", () => {
      const { getByText } = render(
        <EmbeddedForm<Props>
          Step={EnterpriseSearch}
          props={dataWithSelectedEnterpriseWithTwoAgreements}
        />
      );
      expect(
        getByText(new RegExp(selectedEnterpriseOneAgreement.simpleLabel))
      ).toBeInTheDocument();
    });

    it("should show a button to remove the selection", () => {
      const { getByRole } = render(
        <EmbeddedForm<Props>
          Step={EnterpriseSearch}
          props={dataWithSelectedEnterpriseWithTwoAgreements}
        />
      );
      const button = getByRole("button", { name: "Fermer" });
      expect(button).toBeInTheDocument();
    });

    it("should show an error when submit", () => {
      const { getByText, queryByText } = render(
        <EmbeddedForm<Props>
          Step={EnterpriseSearch}
          props={dataWithSelectedEnterpriseWithTwoAgreements}
        />
      );
      getByText("Submit").click();
      expect(
        queryByText(/Vous devez répondre à cette question/)
      ).toBeInTheDocument();
    });

    it("should callback when user remove the selected enterprise", () => {
      onSelectAgreement.mockClear();
      const { getByRole } = render(
        <EmbeddedForm<Props>
          Step={EnterpriseSearch}
          props={dataWithSelectedEnterpriseWithTwoAgreements}
        />
      );
      const button = getByRole("button", { name: "Fermer" });
      button.click();
      expect(onSelectAgreement.mock.calls).toHaveLength(1);
      expect(onSelectAgreement.mock.calls[0][0]).toBeNull();
    });

    it("should show the message to continue the simulation when select the agreement", () => {
      const { getByText, queryByText } = render(
        <EmbeddedForm<Props>
          Step={EnterpriseSearch}
          props={dataWithSelectedEnterpriseWithTwoAgreements}
        />
      );
      getByText(/Grands magasins et magasins populaires/).click();
      expect(
        queryByText(/Cliquez sur Suivant pour poursuivre la simulation/)
      ).toBeInTheDocument();
    });
  });

  describe("selected agreement not supported / not fully supported", () => {
    it("should render a warning about the not supported agreement", () => {
      const data: Props = {
        onSelectAgreement,
        onUserAction,
        selectedEnterprise: selectedEnterpriseOneAgreement,
        supportedAgreements: [],
      };
      const { getByText } = render(
        <EmbeddedForm<Props> Step={EnterpriseSearch} props={data} />
      );
      expect(
        getByText(/Convention collective non traitée/)
      ).toBeInTheDocument();
    });

    it("should render a warning about the not supported agreement (multiple agreements)", () => {
      const data: Props = {
        onSelectAgreement,
        onUserAction,
        selectedEnterprise: selectedEnterpriseTwoAgreements,
        supportedAgreements: [],
      };
      const { getByText } = render(
        <EmbeddedForm<Props> Step={EnterpriseSearch} props={data} />
      );
      getByText(/Grands magasins et magasins populaires/).click();
      expect(
        getByText(/Convention collective non traitée/)
      ).toBeInTheDocument();
    });

    it("should not render a warning about the supported agreement", () => {
      const data: Props = {
        onSelectAgreement,
        onUserAction,
        selectedEnterprise: selectedEnterpriseOneAgreement,
        supportedAgreements: [
          {
            fullySupported: true,
            idcc: selectedEnterpriseOneAgreement.conventions[0].num,
          },
        ],
      };
      const { queryByText } = render(
        <EmbeddedForm<Props> Step={EnterpriseSearch} props={data} />
      );
      expect(
        queryByText(/Convention collective non traitée/)
      ).not.toBeInTheDocument();
    });

    it("should not render a warning when agreement is supported (multiple agreements)", () => {
      const data: Props = {
        onSelectAgreement,
        onUserAction,
        selectedEnterprise: selectedEnterpriseTwoAgreements,
        supportedAgreements: [
          {
            fullySupported: true,
            idcc: selectedEnterpriseTwoAgreements.conventions[0].num,
          },
        ],
      };
      const { getByText, queryByText } = render(
        <EmbeddedForm<Props> Step={EnterpriseSearch} props={data} />
      );
      getByText(/Grands magasins et magasins populaires/).click();
      expect(
        queryByText(/Convention collective non traitée/)
      ).not.toBeInTheDocument();
    });

    it("should render the alert with custom content provided", () => {
      const data: Props = {
        onSelectAgreement,
        onUserAction,
        selectedEnterprise: selectedEnterpriseOneAgreement,
        supportedAgreements: [],
        alertAgreementNotSupported: (agreementUrl: string) => (
          <p>This is my custom text with the url: {agreementUrl}</p>
        ),
      };
      const { getByText } = render(
        <EmbeddedForm<Props> Step={EnterpriseSearch} props={data} />
      );
      expect(
        getByText(/This is my custom text with the url: hello.com/)
      ).toBeInTheDocument();
    });
  });
});
